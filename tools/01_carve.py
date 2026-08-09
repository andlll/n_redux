"""Carve the appended GameMaker data.win (FORM archive) out of NIMBUS.exe."""
import struct, sys, os

EXE = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\NIMBUS.exe"
OUT = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\_extract\data.win"

data = open(EXE, "rb").read()
size = len(data)
print("exe size:", size)

candidates = []
pos = 0
while True:
    pos = data.find(b"FORM", pos)
    if pos < 0:
        break
    if pos + 8 <= size:
        (ln,) = struct.unpack_from("<I", data, pos + 4)
        # a valid FORM must span exactly to some plausible end and start with a chunk name
        if 1000 < ln <= size - pos - 8 + 16:
            nxt = data[pos + 8: pos + 12]
            if nxt.isalnum() or nxt in (b"GEN8", b"FORM"):
                candidates.append((pos, ln, nxt, size - (pos + 8 + ln)))
    pos += 1

for c in candidates[:20]:
    print("FORM at 0x%08X len=%d next=%r trailing=%d" % c)

if not candidates:
    sys.exit("no FORM found")

# prefer the one that ends exactly at EOF (or near it)
best = min(candidates, key=lambda c: (abs(c[3]), -c[1]))
off, ln = best[0], best[1]
print("chosen: offset=0x%08X len=%d trailing=%d" % (off, ln, best[3]))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "wb") as f:
    f.write(data[off: off + 8 + ln])
print("wrote", OUT, os.path.getsize(OUT))
