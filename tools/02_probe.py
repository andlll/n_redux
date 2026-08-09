import struct, os, collections

EXE = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\NIMBUS.exe"
d = open(EXE, "rb").read()
print("size", len(d))

for sig, name in [(b"FORM", "FORM"), (b"PK\x03\x04", "zip local"), (b"PK\x05\x06", "zip EOCD"),
                  (b"Nullsoft", "NSIS"), (b"GEN8", "GEN8"), (b"TXTR", "TXTR"),
                  (b"data.win", "data.win str"), (b"MZ", "MZ"), (b"UPX", "UPX"),
                  (b"7z\xbc\xaf\x27\x1c", "7z"), (b"Rar!", "rar"), (b".rdata", "rdata")]:
    idxs = []
    p = 0
    while len(idxs) < 6:
        p = d.find(sig, p)
        if p < 0:
            break
        idxs.append(hex(p))
        p += 1
    print("%-14s count<=6: %s" % (name, idxs))

# PE section table
pe = struct.unpack_from("<I", d, 0x3C)[0]
print("PE hdr at", hex(pe), d[pe:pe+4])
nsec = struct.unpack_from("<H", d, pe + 6)[0]
optsz = struct.unpack_from("<H", d, pe + 20)[0]
sect = pe + 24 + optsz
print("sections:", nsec)
end_of_pe = 0
for i in range(nsec):
    o = sect + i * 40
    nm = d[o:o+8].rstrip(b"\0").decode("latin1")
    vsz, va, rsz, ra = struct.unpack_from("<IIII", d, o + 8)
    print("  %-10s vsize=%9d vaddr=0x%08X rawsize=%9d rawoff=0x%08X end=0x%08X" % (nm, vsz, va, rsz, ra, ra+rsz))
    end_of_pe = max(end_of_pe, ra + rsz)
print("end of PE image:", hex(end_of_pe), "overlay bytes:", len(d) - end_of_pe)
print("overlay first 64:", d[end_of_pe:end_of_pe+64])
