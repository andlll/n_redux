"""Extract strings, texture pages, TPAG regions, sprites, backgrounds, fonts metadata."""
import sys, os, json, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin, Reader

ROOT = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\_extract"
OUT = os.path.join(ROOT, "out")
DW = DataWin(os.path.join(ROOT, "cab", "data.win"))
DW.load_strings()
d = DW.d

def mk(*p):
    q = os.path.join(OUT, *p)
    os.makedirs(q, exist_ok=True)
    return q

def dump(obj, *p):
    path = os.path.join(OUT, *p)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=1, ensure_ascii=False)

# ---------------------------------------------------------------- strings
mk()
with open(os.path.join(OUT, "strings.txt"), "w", encoding="utf-8") as f:
    for i, s in enumerate(DW.string_list):
        f.write("[%04d] %s\n" % (i, s.replace("\n", "\\n")))
print("strings ->", len(DW.string_list))

# ---------------------------------------------------------------- TXTR
tex_dir = mk("textures")
txtr_ptrs = DW.ptr_list("TXTR")
tex_offsets = []
for i, p in enumerate(txtr_ptrs):
    rd = Reader(d, p)
    scaled = rd.u32()
    blob = rd.u32()          # pointer to PNG data
    tex_offsets.append(blob)
# PNG length = until IEND
def png_len(off):
    assert d[off:off+8] == b"\x89PNG\r\n\x1a\n", "not png at %d" % off
    p = off + 8
    while True:
        ln = struct.unpack_from(">I", d, p)[0]
        typ = d[p+4:p+8]
        p += 12 + ln
        if typ == b"IEND":
            return p - off

tex_info = []
for i, off in enumerate(tex_offsets):
    n = png_len(off)
    w, h = struct.unpack_from(">II", d, off + 16)
    fn = "page_%03d.png" % i
    open(os.path.join(tex_dir, fn), "wb").write(d[off:off+n])
    tex_info.append({"id": i, "file": fn, "w": w, "h": h, "bytes": n})
dump(tex_info, "textures", "_index.json")
print("textures ->", len(tex_info))

# ---------------------------------------------------------------- TPAG
tpag_ptrs = DW.ptr_list("TPAG")
tpag = {}
for p in tpag_ptrs:
    rd = Reader(d, p)
    e = {}
    e["x"] = rd.u16(); e["y"] = rd.u16()
    e["w"] = rd.u16(); e["h"] = rd.u16()
    e["render_x"] = rd.i16(); e["render_y"] = rd.i16()
    e["bbox_x"] = rd.i16(); e["bbox_y"] = rd.i16()
    e["bbox_w"] = rd.i16(); e["bbox_h"] = rd.i16()
    e["tex"] = rd.u16()
    tpag[p] = e
print("tpag ->", len(tpag))

# ---------------------------------------------------------------- SPRT
sprt_ptrs = DW.ptr_list("SPRT")
sprites = []
for idx, p in enumerate(sprt_ptrs):
    rd = Reader(d, p)
    s = {"index": idx}
    s["name"] = DW.s(rd.u32())
    s["width"] = rd.i32(); s["height"] = rd.i32()
    s["margin_left"] = rd.i32(); s["margin_right"] = rd.i32()
    s["margin_bottom"] = rd.i32(); s["margin_top"] = rd.i32()
    s["transparent"] = rd.i32(); s["smooth"] = rd.i32(); s["preload"] = rd.i32()
    s["bbox_mode"] = rd.u32(); s["sep_masks"] = rd.u32()
    s["origin_x"] = rd.i32(); s["origin_y"] = rd.i32()
    n = rd.u32()
    fr = [rd.u32() for _ in range(n)]
    s["frames"] = [tpag.get(x, {"missing": x}) for x in fr]
    s["frame_count"] = n
    try:
        mask_count = rd.u32()
        s["mask_count"] = mask_count
    except Exception:
        s["mask_count"] = None
    sprites.append(s)
dump(sprites, "sprites", "_index.json")
print("sprites ->", len(sprites))

# ---------------------------------------------------------------- BGND
bg_ptrs = DW.ptr_list("BGND")
bgs = []
for idx, p in enumerate(bg_ptrs):
    rd = Reader(d, p)
    b = {"index": idx, "name": DW.s(rd.u32()),
         "transparent": rd.i32(), "smooth": rd.i32(), "preload": rd.i32()}
    b["texture"] = tpag.get(rd.u32())
    bgs.append(b)
dump(bgs, "backgrounds.json")
print("backgrounds ->", len(bgs))

# ---------------------------------------------------------------- FONT
fnt_ptrs = DW.ptr_list("FONT")
fonts = []
for idx, p in enumerate(fnt_ptrs):
    rd = Reader(d, p)
    f = {"index": idx, "name": DW.s(rd.u32()), "display_name": DW.s(rd.u32()),
         "em_size": rd.u32(), "bold": rd.u32(), "italic": rd.u32(),
         "range_start": rd.u16(), "charset": rd.u8(), "antialias": rd.u8(),
         "range_end": rd.u32()}
    f["texture"] = tpag.get(rd.u32())
    f["scale_x"] = rd.f32(); f["scale_y"] = rd.f32()
    gn = rd.u32()
    gptrs = [rd.u32() for _ in range(gn)]
    glyphs = []
    for gp in gptrs:
        g = Reader(d, gp)
        glyphs.append({"char": g.u16(), "x": g.u16(), "y": g.u16(),
                       "w": g.u16(), "h": g.u16(), "shift": g.i16(), "offset": g.i16()})
    f["glyphs"] = glyphs
    fonts.append(f)
dump(fonts, "fonts.json")
print("fonts ->", len(fonts))

# ---------------------------------------------------------------- SHDR / SCPT
try:
    sc = DW.ptr_list("SCPT")
    scripts = []
    for p in sc:
        rd = Reader(d, p)
        scripts.append({"name": DW.s(rd.u32()), "code_id": rd.i32()})
    dump(scripts, "scripts.json")
    print("scripts ->", scripts)
except Exception as e:
    print("scpt fail", e)

json.dump({p: e for p, e in tpag.items()}, open(os.path.join(OUT, "tpag.json"), "w"), indent=1)
print("done")
