"""Esporta una room in un formato compatto per il nuovo motore.

Primo pezzo della pipeline asset: prende room + oggetti + sprite dall'estrazione
e produce un singolo JSON che il gioco carica con una fetch.
"""
import os, json, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
room_name = sys.argv[1] if len(sys.argv) > 1 else "match_easy"

room = json.load(open(os.path.join(ROOT, "src", "rooms", room_name + ".json"), encoding="utf-8"))
objects = json.load(open(os.path.join(ROOT, "data", "objects.json"), encoding="utf-8"))
sprites = json.load(open(os.path.join(ROOT, "data", "sprites.json"), encoding="utf-8"))

spr_by_name = {s["name"]: s for s in sprites}
obj_by_idx = {o["index"]: o for o in objects}

out = {
    "name": room["name"],
    "width": room["width"],
    "height": room["height"],
    "speed": room["speed"],
    "bgColor": room["bg_color"] & 0xFFFFFF,
    "views": [{"w": v["w"], "h": v["h"], "x": v["x"], "y": v["y"]}
              for v in room["views"] if v["enabled"]],
    "instances": [],
}

missing = 0
for inst in room["instances"]:
    o = obj_by_idx.get(inst["object_id"])
    if o is None:
        missing += 1
        continue
    s = spr_by_name.get(o["sprite"]) if o["sprite"] else None
    e = {
        "obj": o["name"],
        "x": inst["x"], "y": inst["y"],
        "depth": o["depth"],
    }
    if inst["scale_x"] != 1 or inst["scale_y"] != 1:
        e["sx"] = round(inst["scale_x"], 4)
        e["sy"] = round(inst["scale_y"], 4)
    if inst["rotation"]:
        e["rot"] = round(inst["rotation"], 3)
    if (inst["color"] & 0xFFFFFF) != 0xFFFFFF:
        e["tint"] = inst["color"] & 0xFFFFFF
    if s:
        e["spr"] = s["name"]
        e["w"] = s["width"]
        e["h"] = s["height"]
        e["ox"] = s["origin_x"]
        e["oy"] = s["origin_y"]
    out["instances"].append(e)

dst = os.path.join(ROOT, "game", "data")
os.makedirs(dst, exist_ok=True)
p = os.path.join(dst, room_name + ".scene.json")
json.dump(out, open(p, "w", encoding="utf-8"), separators=(",", ":"))

sized = sum(1 for i in out["instances"] if "spr" in i)
print("%s: %d istanze (%d con sprite, %d senza), %d oggetti mancanti"
      % (room_name, len(out["instances"]), sized, len(out["instances"]) - sized, missing))
print("scritto %s (%.1f KB)" % (p, os.path.getsize(p) / 1024))
