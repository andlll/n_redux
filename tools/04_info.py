import os
import sys, json
from gmlib import DataWin
from _paths import EXTRACT, TOOLS, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

DW = DataWin(os.path.join(EXTRACT, "cab", "data.win"))
print("FORM len", DW.form_len)
print()
for n in DW.order:
    off, ln = DW.chunks[n]
    print("  %-6s off=0x%08X len=%12d" % (n, off, ln))
print()
DW.load_strings()
print("strings:", len(DW.string_list))
print()
print(json.dumps(DW.gen8(), indent=2, ensure_ascii=False))
print()
for n in ("SPRT", "SOND", "BGND", "SCPT", "OBJT", "ROOM", "CODE", "FONT", "TXTR", "AUDO", "PATH", "TMLN", "SHDR", "EXTN", "AGRP"):
    if n in DW.chunks:
        try:
            print("%-5s count=%d" % (n, len(DW.ptr_list(n))))
        except Exception as e:
            print("%-5s ??? %s" % (n, e))
