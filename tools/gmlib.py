"""Minimal GameMaker Studio data.win (IFF/FORM) reader."""
import struct, io, os, json

class Reader:
    def __init__(self, data, pos=0):
        self.d = data
        self.p = pos

    def u8(self):
        v = self.d[self.p]; self.p += 1; return v
    def u16(self):
        v = struct.unpack_from("<H", self.d, self.p)[0]; self.p += 2; return v
    def i16(self):
        v = struct.unpack_from("<h", self.d, self.p)[0]; self.p += 2; return v
    def u32(self):
        v = struct.unpack_from("<I", self.d, self.p)[0]; self.p += 4; return v
    def i32(self):
        v = struct.unpack_from("<i", self.d, self.p)[0]; self.p += 4; return v
    def i64(self):
        v = struct.unpack_from("<q", self.d, self.p)[0]; self.p += 8; return v
    def f32(self):
        v = struct.unpack_from("<f", self.d, self.p)[0]; self.p += 4; return v
    def f64(self):
        v = struct.unpack_from("<d", self.d, self.p)[0]; self.p += 8; return v
    def bytes(self, n):
        v = self.d[self.p:self.p + n]; self.p += n; return v
    def tag(self):
        return self.bytes(4).decode("latin1")


class DataWin:
    def __init__(self, path):
        self.d = open(path, "rb").read()
        assert self.d[:4] == b"FORM", "not a FORM archive"
        self.form_len = struct.unpack_from("<I", self.d, 4)[0]
        self.chunks = {}
        self.order = []
        p = 8
        end = 8 + self.form_len
        while p < end - 8:
            name = self.d[p:p + 4].decode("latin1")
            ln = struct.unpack_from("<I", self.d, p + 4)[0]
            self.chunks[name] = (p + 8, ln)
            self.order.append(name)
            p += 8 + ln
        self.strings = {}   # absolute offset of string char data -> str
        self.string_list = []

    def r(self, name):
        off, ln = self.chunks[name]
        return Reader(self.d, off), off, ln

    # ---- pointer lists ------------------------------------------------
    def ptr_list(self, name):
        rd, off, ln = self.r(name)
        n = rd.u32()
        return [rd.u32() for _ in range(n)]

    # ---- STRG ---------------------------------------------------------
    def load_strings(self):
        ptrs = self.ptr_list("STRG")
        for p in ptrs:
            ln = struct.unpack_from("<I", self.d, p)[0]
            s = self.d[p + 4:p + 4 + ln].decode("utf-8", "replace")
            self.strings[p + 4] = s
            self.string_list.append(s)
        return self.string_list

    def s(self, ptr):
        """resolve a pointer-to-string (points at the char data)"""
        if ptr == 0:
            return None
        if ptr in self.strings:
            return self.strings[ptr]
        # tolerate off-by: read inline
        try:
            ln = struct.unpack_from("<I", self.d, ptr - 4)[0]
            return self.d[ptr:ptr + ln].decode("utf-8", "replace")
        except Exception:
            return "<str@%d>" % ptr

    # ---- GEN8 ---------------------------------------------------------
    def gen8(self):
        rd, off, ln = self.r("GEN8")
        g = {}
        g["debug"] = rd.u8()
        g["bytecode_version"] = rd.u8()
        g["unknown"] = rd.u16()
        g["filename"] = self.s(rd.u32())
        g["config"] = self.s(rd.u32())
        g["last_obj_id"] = rd.u32()
        g["last_tile_id"] = rd.u32()
        g["game_id"] = rd.u32()
        rd.bytes(16)
        g["name"] = self.s(rd.u32())
        g["major"] = rd.u32(); g["minor"] = rd.u32()
        g["release"] = rd.u32(); g["build"] = rd.u32()
        g["default_window_width"] = rd.u32()
        g["default_window_height"] = rd.u32()
        g["info_flags"] = rd.u32()
        g["license_md5"] = rd.bytes(16).hex()
        g["license_crc32"] = rd.u32()
        g["timestamp"] = rd.i64()
        g["display_name"] = self.s(rd.u32())
        return g
