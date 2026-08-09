"""GameMaker bytecode-15 parser: CODE / VARI / FUNC -> named instruction streams."""
import struct
from gmlib import Reader

# --------------------------------------------------------------- opcode table
OPS = {
    0x07: "conv", 0x08: "mul", 0x09: "div", 0x0A: "rem", 0x0B: "mod",
    0x0C: "add", 0x0D: "sub", 0x0E: "and", 0x0F: "or", 0x10: "xor",
    0x11: "neg", 0x12: "not", 0x13: "shl", 0x14: "shr", 0x15: "cmp",
    0x45: "pop", 0x84: "pushi", 0x86: "dup", 0x9C: "ret", 0x9D: "exit",
    0x9E: "popz", 0x99: "callv",
    0xB6: "b", 0xB7: "bt", 0xB8: "bf", 0xBA: "pushenv", 0xBB: "popenv",
    0xC0: "push", 0xC1: "pushloc", 0xC2: "pushglb", 0xC3: "pushbltn",
    0xD9: "call", 0xFF: "break",
}
GOTO = {0xB6, 0xB7, 0xB8, 0xBA, 0xBB}
PUSHES = {0xC0, 0xC1, 0xC2, 0xC3, 0x84}

DTYPE = {0: "d", 1: "f", 2: "i", 3: "l", 4: "b", 5: "v", 6: "s", 7: "e",
         8: "delete", 9: "undefined", 10: "u", 0x0f: "e"}
CMP = {1: "<", 2: "<=", 3: "==", 4: "!=", 5: ">=", 6: ">"}
INST = {-1: "self", -2: "other", -3: "all", -4: "noone", -5: "global",
        -6: "builtin", -7: "local", -9: "stacktop", -16: "static"}
VARTYPE = {0x00: "array", 0x80: "stacktop", 0xA0: "", 0xE0: "instance", 0x40: "arraypushaf"}


class Instr:
    __slots__ = ("addr", "op", "name", "size", "t1", "t2", "val", "ref",
                 "inst", "vartype", "argc", "jump", "cmp")

    def __repr__(self):
        return "<%s @%d>" % (self.name, self.addr)


class CodeDB:
    def __init__(self, dw):
        self.dw = dw
        self.d = dw.d
        self.varnames = {}   # instruction addr -> variable name
        self.varinfo = {}    # instruction addr -> (name, instance_type)
        self.funcnames = {}  # instruction addr -> function name
        self.variables = []
        self.functions = []
        self.code = []
        self.locals = {}
        self._load_vari()
        self._load_func()
        self._load_code()

    # ------------------------------------------------------------- VARI
    def _load_vari(self):
        off, ln = self.dw.chunks["VARI"]
        end = off + ln
        rd = Reader(self.d, off)
        rd.u32(); rd.u32(); rd.u32()      # header (bytecode >= 15)
        while rd.p + 20 <= end:
            name = self.dw.s(rd.u32())
            inst = rd.i32(); vid = rd.i32()
            occ = rd.u32(); first = rd.i32()
            self.variables.append({"name": name, "instance_type": inst,
                                   "id": vid, "occurrences": occ})
            self._walk(first, occ, name, self.varnames)
            for a in self._chain(first, occ):
                self.varinfo[a] = (name, inst)

    # ------------------------------------------------------------- FUNC
    def _load_func(self):
        off, ln = self.dw.chunks["FUNC"]
        rd = Reader(self.d, off)
        n = rd.u32()
        for _ in range(n):
            name = self.dw.s(rd.u32())
            occ = rd.u32(); first = rd.i32()
            self.functions.append({"name": name, "occurrences": occ})
            self._walk(first, occ, name, self.funcnames)
        # per-code local variable tables
        try:
            ncode = rd.u32()
            for _ in range(ncode):
                cnt = rd.u32()
                cname = self.dw.s(rd.u32())
                lst = []
                for _ in range(cnt):
                    idx = rd.u32()
                    lst.append(self.dw.s(rd.u32()))
                self.locals[cname] = lst
        except Exception:
            pass

    def _chain(self, first, occ):
        addr = first
        out = []
        for _ in range(occ):
            if addr < 0:
                break
            out.append(addr)
            try:
                w = struct.unpack_from("<I", self.d, addr + 4)[0]
            except Exception:
                break
            nxt = w & 0x00FFFFFF
            if nxt == 0:
                break
            addr += nxt
        return out

    def _walk(self, first, occ, name, table):
        for a in self._chain(first, occ):
            table[a] = name

    # ------------------------------------------------------------- CODE
    def _load_code(self):
        for p in self.dw.ptr_list("CODE"):
            rd = Reader(self.d, p)
            name = self.dw.s(rd.u32())
            length = rd.u32()
            nloc = rd.u16(); nargs = rd.u16()
            base = rd.p
            rel = rd.i32()
            off = rd.u32()
            self.code.append({"name": name, "addr": base + rel, "length": length,
                              "locals": nloc, "args": nargs & 0x1FFF, "offset": off})

    # ------------------------------------------------------------- decode
    def decode(self, start, length):
        d = self.d
        out = []
        p = start
        end = start + length
        while p < end:
            w = struct.unpack_from("<I", d, p)[0]
            op = (w >> 24) & 0xFF
            b2 = (w >> 16) & 0xFF
            b1 = (w >> 8) & 0xFF
            b0 = w & 0xFF
            i = Instr()
            i.addr = p
            i.op = op
            i.name = OPS.get(op, "op%02X" % op)
            i.t1 = b2 & 0x0F
            i.t2 = (b2 >> 4) & 0x0F
            i.val = None; i.ref = None; i.inst = None; i.vartype = None
            i.argc = None; i.jump = None; i.cmp = None
            i.size = 4
            if op in GOTO:
                j = w & 0x00FFFFFF
                if j & 0x00800000:
                    j -= 0x01000000
                i.jump = p + j * 4
            elif op == 0x15:                      # cmp
                i.cmp = CMP.get(b1, "?%d" % b1)
            elif op == 0x45:                      # pop
                i.inst = struct.unpack_from("<h", d, p)[0]
                rw = struct.unpack_from("<I", d, p + 4)[0]
                i.vartype = VARTYPE.get((rw >> 24) & 0xF8, "vt%02X" % ((rw >> 24) & 0xF8))
                i.ref = self.varnames.get(p, "?var@%X" % p)
                i.size = 8
            elif op in PUSHES:
                t = i.t1
                if op == 0x84:                    # pushi (int16 immediate)
                    i.val = struct.unpack_from("<h", d, p)[0]
                elif t == 0x0f:
                    i.val = struct.unpack_from("<h", d, p)[0]
                elif t == 0:                      # double
                    i.val = struct.unpack_from("<d", d, p + 4)[0]; i.size = 12
                elif t == 1:                      # float
                    i.val = struct.unpack_from("<f", d, p + 4)[0]; i.size = 8
                elif t == 2:                      # int32
                    i.val = struct.unpack_from("<i", d, p + 4)[0]; i.size = 8
                elif t == 3:                      # int64
                    i.val = struct.unpack_from("<q", d, p + 4)[0]; i.size = 12
                elif t == 4:                      # bool
                    i.val = bool(struct.unpack_from("<I", d, p + 4)[0]); i.size = 8
                elif t == 6:                      # string
                    sid = struct.unpack_from("<I", d, p + 4)[0]
                    i.val = self.dw.string_list[sid] if sid < len(self.dw.string_list) else "?str%d" % sid
                    i.size = 8
                elif t == 5:                      # variable
                    i.inst = struct.unpack_from("<h", d, p)[0]
                    rw = struct.unpack_from("<I", d, p + 4)[0]
                    i.vartype = VARTYPE.get((rw >> 24) & 0xF8, "vt%02X" % ((rw >> 24) & 0xF8))
                    i.ref = self.varnames.get(p, "?var@%X" % p)
                    i.size = 8
                else:
                    i.size = 8
            elif op == 0xD9:                      # call
                i.argc = struct.unpack_from("<H", d, p)[0]
                i.ref = self.funcnames.get(p, "?fn@%X" % p)
                i.size = 8
            elif op == 0x99:                      # callv
                i.argc = b0
            elif op == 0xFF:
                i.val = struct.unpack_from("<h", d, p)[0]
            elif op == 0x86:                      # dup
                i.val = b0
            out.append(i)
            p += i.size
        return out

    # ------------------------------------------------------------- render
    def fmt_var(self, i):
        pre = ""
        if i.inst is not None:
            if i.inst in INST:
                nm = INST[i.inst]
                pre = "" if nm == "self" else nm + "."
            elif i.inst >= 0:
                pre = "obj%d." % i.inst
        s = pre + str(i.ref)
        if i.vartype == "array":
            s += "[array]"
        elif i.vartype == "stacktop":
            s = "[stacktop]." + str(i.ref)
        elif i.vartype == "instance":
            s = "[inst]." + str(i.ref)
        return s

    def text(self, i):
        n = i.name
        ts = ""
        if i.op in (0x07,) or 0x08 <= i.op <= 0x15:
            ts = ".%s.%s" % (DTYPE.get(i.t1, i.t1), DTYPE.get(i.t2, i.t2))
        if i.op == 0x15:
            return "cmp%s %s" % (ts, i.cmp)
        if i.jump is not None:
            return "%s 0x%X" % (n, i.jump)
        if i.op == 0x45:
            return "pop.%s.%s %s" % (DTYPE.get(i.t1, i.t1), DTYPE.get(i.t2, i.t2), self.fmt_var(i))
        if i.op in PUSHES:
            suffix = {0xC1: ".local", 0xC2: ".global", 0xC3: ".builtin", 0x84: ".imm"}.get(i.op, "")
            if i.ref is not None:
                return "push%s.v %s" % (suffix, self.fmt_var(i))
            if isinstance(i.val, str):
                return 'push%s.s "%s"' % (suffix, i.val.replace("\n", "\\n"))
            return "push%s.%s %s" % (suffix, DTYPE.get(i.t1, i.t1), i.val)
        if i.op == 0xD9:
            return "call %s(argc=%d)" % (i.ref, i.argc)
        if i.op == 0x99:
            return "callv(argc=%d)" % i.argc
        if i.op == 0x86:
            return "dup %s" % i.val
        if i.op == 0xFF:
            return "break %s" % i.val
        return n + ts
