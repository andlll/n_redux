import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin, Reader
from _paths import EXTRACT, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

ROOT = EXTRACT
DW = DataWin(os.path.join(ROOT, "cab", "data.win")); DW.load_strings()
d = DW.d

code_off, code_len = DW.chunks["CODE"]
ptrs = DW.ptr_list("CODE")
print("CODE chunk 0x%X..0x%X  entries=%d" % (code_off, code_off + code_len, len(ptrs)))
for p in ptrs[:6]:
    rd = Reader(d, p)
    name = DW.s(rd.u32())
    ln = rd.u32()
    locals_count = rd.u16()
    args = rd.u16()
    relpos = rd.p
    rel = rd.i32()
    off = rd.u32()
    absaddr = relpos + rel
    print("  %-34s len=%-7d locals=%-3d args=%-5d rel=%-10d off=%-8d abs=0x%X" %
          (name, ln, locals_count, args, rel, off, absaddr))
    print("      first words:", [hex(x) for x in struct.unpack_from("<8I", d, absaddr)])

print()
vari_off, vari_len = DW.chunks["VARI"]
rd = Reader(d, vari_off)
a, b, c = rd.u32(), rd.u32(), rd.u32()
print("VARI header:", a, b, c, " chunk 0x%X len=%d" % (vari_off, vari_len))
for i in range(8):
    nm = DW.s(rd.u32()); it = rd.i32(); vid = rd.i32(); occ = rd.u32(); first = rd.i32()
    print("   var %-24s inst=%-4d id=%-6d occ=%-5d first=0x%X" % (nm, it, vid, occ, first))

print()
func_off, func_len = DW.chunks["FUNC"]
rd = Reader(d, func_off)
n = rd.u32()
print("FUNC count=%d chunk 0x%X len=%d" % (n, func_off, func_len))
for i in range(8):
    nm = DW.s(rd.u32()); occ = rd.u32(); first = rd.i32()
    print("   fn %-30s occ=%-5d first=0x%X" % (nm, occ, first))
