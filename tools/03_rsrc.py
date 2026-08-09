import struct

EXE = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\NIMBUS.exe"
d = open(EXE, "rb").read()

pe = struct.unpack_from("<I", d, 0x3C)[0]
nsec = struct.unpack_from("<H", d, pe + 6)[0]
optsz = struct.unpack_from("<H", d, pe + 20)[0]
sect = pe + 24 + optsz
secs = []
for i in range(nsec):
    o = sect + i * 40
    nm = d[o:o+8].rstrip(b"\0").decode("latin1")
    vsz, va, rsz, ra = struct.unpack_from("<IIII", d, o + 8)
    secs.append((nm, va, vsz, ra, rsz))

def rva2off(rva):
    for nm, va, vsz, ra, rsz in secs:
        if va <= rva < va + max(vsz, rsz):
            return ra + (rva - va)
    return None

RSRC = [s for s in secs if s[0] == ".rsrc"][0]
base = RSRC[3]
rsrc_rva = RSRC[1]

TYPES = {1:"CURSOR",2:"BITMAP",3:"ICON",4:"MENU",5:"DIALOG",6:"STRING",7:"FONTDIR",8:"FONT",
         9:"ACCELERATOR",10:"RCDATA",11:"MESSAGETABLE",12:"GROUP_CURSOR",14:"GROUP_ICON",
         16:"VERSION",24:"MANIFEST"}

def name_at(off):
    (ln,) = struct.unpack_from("<H", d, off)
    return d[off+2: off+2+ln*2].decode("utf-16-le", "replace")

def walk(off, level=0, path=()):
    chars, ids = struct.unpack_from("<HH", d, off + 12)
    entries = off + 16
    for i in range(chars + ids):
        nameoff, dataoff = struct.unpack_from("<II", d, entries + i * 8)
        if nameoff & 0x80000000:
            nm = name_at(base + (nameoff & 0x7FFFFFFF))
        else:
            nm = TYPES.get(nameoff, str(nameoff)) if level == 0 else str(nameoff)
        if dataoff & 0x80000000:
            walk(base + (dataoff & 0x7FFFFFFF), level + 1, path + (nm,))
        else:
            rva, size, cp, _ = struct.unpack_from("<IIII", d, base + dataoff)
            fo = rva2off(rva)
            print("RES %-40s size=%10d fileoff=0x%08X first=%r" %
                  ("/".join(path + (nm,)), size, fo, d[fo:fo+16]))

walk(base)

print()
print("--- around 'data.win' at 0x34b29 ---")
p = 0x34b29
print(repr(d[p-256:p+512]))
