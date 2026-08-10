import sys, os, json, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin, Reader
from _paths import EXTRACT, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

ROOT = EXTRACT
OUT = os.path.join(ROOT, "out")
DW = DataWin(os.path.join(ROOT, "cab", "data.win")); DW.load_strings()
d = DW.d

sprites = json.load(open(os.path.join(OUT, "sprites", "_index.json"), encoding="utf-8"))
sprite_names = {s["index"]: s["name"] for s in sprites}

EVTYPE = ["Create", "Destroy", "Alarm", "Step", "Collision", "Keyboard", "Mouse",
          "Other", "Draw", "KeyPress", "KeyRelease", "Trigger"]

def plist(p):
    n = struct.unpack_from("<I", d, p)[0]
    return [struct.unpack_from("<I", d, p + 4 + 4 * i)[0] for i in range(n)]

# ------------------------------------------------------------------ OBJT
obj_ptrs = DW.ptr_list("OBJT")
objects = []
for idx, p in enumerate(obj_ptrs):
    rd = Reader(d, p)
    o = {"index": idx, "name": DW.s(rd.u32())}
    o["sprite_id"] = rd.i32()
    o["visible"] = rd.i32(); o["solid"] = rd.i32(); o["depth"] = rd.i32()
    o["persistent"] = rd.i32(); o["parent_id"] = rd.i32(); o["mask_sprite_id"] = rd.i32()
    o["physics"] = {
        "enabled": rd.u32(), "sensor": rd.u32(), "shape": rd.u32(),
        "density": rd.f32(), "restitution": rd.f32(), "group": rd.u32(),
        "linear_damping": rd.f32(), "angular_damping": rd.f32(),
    }
    nvert = rd.i32()
    o["physics"]["friction"] = rd.f32()
    o["physics"]["awake"] = rd.u32()
    o["physics"]["kinematic"] = rd.u32()
    verts = []
    if 0 <= nvert < 64:
        for _ in range(nvert):
            verts.append([rd.f32(), rd.f32()])
    o["physics"]["vertices"] = verts
    nev = rd.u32()
    assert nev == 12, "object %s: unexpected event slot count %d" % (o["name"], nev)
    evlists = [rd.u32() for _ in range(nev)]
    events = []
    for ti, lp in enumerate(evlists):
        for ep in plist(lp):
            e = Reader(d, ep)
            sub = e.u32()
            acts = []
            for ap in plist(e.p):
                a = Reader(d, ap)
                act = {}
                act["lib_id"] = a.u32(); act["id"] = a.u32(); act["kind"] = a.u32()
                act["use_relative"] = a.u32(); act["is_question"] = a.u32()
                act["use_apply_to"] = a.u32(); act["exe_type"] = a.u32()
                act["name"] = DW.s(a.u32())
                act["code_id"] = a.i32()
                act["argument_count"] = a.u32()
                act["who"] = a.i32(); act["relative"] = a.u32()
                act["is_not"] = a.u32()
                acts.append(act)
            events.append({"type": ti, "type_name": EVTYPE[ti], "subtype": sub,
                           "code_ids": [a["code_id"] for a in acts if a["code_id"] >= 0],
                           "actions": acts})
    o["events"] = events
    objects.append(o)

byidx = {o["index"]: o["name"] for o in objects}
for o in objects:
    o["sprite"] = sprite_names.get(o["sprite_id"])
    o["mask_sprite"] = sprite_names.get(o["mask_sprite_id"])
    o["parent"] = byidx.get(o["parent_id"])
json.dump(objects, open(os.path.join(OUT, "objects.json"), "w", encoding="utf-8"),
          indent=1, ensure_ascii=False)
json.dump(byidx, open(os.path.join(OUT, "object_names.json"), "w", encoding="utf-8"),
          indent=1, ensure_ascii=False)
print("objects ->", len(objects))

# ------------------------------------------------------------------ ROOM
room_ptrs = DW.ptr_list("ROOM")
rooms = []
for idx, p in enumerate(room_ptrs):
    rd = Reader(d, p)
    r = {"index": idx, "name": DW.s(rd.u32()), "caption": DW.s(rd.u32())}
    r["width"] = rd.u32(); r["height"] = rd.u32(); r["speed"] = rd.u32()
    r["persistent"] = rd.u32(); r["bg_color"] = rd.u32(); r["draw_bg_color"] = rd.u32()
    r["creation_code_id"] = rd.i32(); r["flags"] = rd.u32()
    pbg, pvw, pobj, ptile = rd.u32(), rd.u32(), rd.u32(), rd.u32()
    r["world"] = rd.u32()
    r["top"] = rd.u32(); r["left"] = rd.u32(); r["right"] = rd.u32(); r["bottom"] = rd.u32()
    r["gravity_x"] = rd.f32(); r["gravity_y"] = rd.f32(); r["meters_per_pixel"] = rd.f32()

    bgs = []
    for bp in plist(pbg):
        b = Reader(d, bp)
        bgs.append({"enabled": b.u32(), "foreground": b.u32(), "bg_id": b.i32(),
                    "x": b.i32(), "y": b.i32(), "tile_x": b.i32(), "tile_y": b.i32(),
                    "speed_x": b.i32(), "speed_y": b.i32(), "stretch": b.u32()})
    r["backgrounds"] = bgs

    views = []
    for vp in plist(pvw):
        v = Reader(d, vp)
        views.append({"enabled": v.u32(), "x": v.i32(), "y": v.i32(), "w": v.i32(), "h": v.i32(),
                      "port_x": v.i32(), "port_y": v.i32(), "port_w": v.i32(), "port_h": v.i32(),
                      "border_x": v.u32(), "border_y": v.u32(),
                      "speed_x": v.i32(), "speed_y": v.i32(), "follow_obj": v.i32()})
    r["views"] = views

    insts = []
    for op in plist(pobj):
        g = Reader(d, op)
        oid = 0
        e = {"x": g.i32(), "y": g.i32()}
        e["object_id"] = g.i32()
        e["instance_id"] = g.u32()
        e["creation_code_id"] = g.i32()
        e["scale_x"] = g.f32(); e["scale_y"] = g.f32()
        e["color"] = g.u32(); e["rotation"] = g.f32()
        e["object"] = byidx.get(e["object_id"])
        insts.append(e)
    r["instances"] = insts

    tiles = []
    for tp in plist(ptile):
        t = Reader(d, tp)
        tiles.append({"x": t.i32(), "y": t.i32(), "bg_id": t.i32(),
                      "src_x": t.i32(), "src_y": t.i32(), "w": t.i32(), "h": t.i32(),
                      "depth": t.i32(), "instance_id": t.u32(),
                      "scale_x": t.f32(), "scale_y": t.f32(), "color": t.u32()})
    r["tiles"] = tiles
    rooms.append(r)

json.dump(rooms, open(os.path.join(OUT, "rooms.json"), "w", encoding="utf-8"),
          indent=1, ensure_ascii=False)
print("rooms ->", [(r["name"], r["width"], r["height"], len(r["instances"]), len(r["tiles"])) for r in rooms])
