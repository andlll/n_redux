"""Assemble the extracted data into a git-ready source tree."""
import sys, os, json, re, shutil
from _paths import EXTRACT, WORK, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

ROOT = WORK
OUT = os.path.join(ROOT, "_extract", "out")
REPO = os.path.join(ROOT, "NIMBUS-source")

MOUSE = {0: "LeftButton", 1: "RightButton", 2: "MiddleButton", 3: "NoButton",
         4: "LeftPressed", 5: "RightPressed", 6: "MiddlePressed",
         7: "LeftReleased", 8: "RightReleased", 9: "MiddleReleased",
         10: "MouseEnter", 11: "MouseLeave",
         50: "GlobalLeftButton", 51: "GlobalRightButton", 52: "GlobalMiddleButton",
         53: "GlobalLeftPressed", 54: "GlobalRightPressed", 55: "GlobalMiddlePressed",
         56: "GlobalLeftReleased", 57: "GlobalRightReleased", 58: "GlobalMiddleReleased",
         60: "MouseWheelUp", 61: "MouseWheelDown"}
OTHER = {0: "OutsideRoom", 1: "IntersectBoundary", 2: "GameStart", 3: "GameEnd",
         4: "RoomStart", 5: "RoomEnd", 6: "NoMoreLives", 7: "AnimationEnd",
         8: "EndOfPath", 9: "NoMoreHealth", 30: "CloseButton",
         60: "AsyncImageLoaded", 61: "AsyncSoundLoaded", 62: "AsyncHTTP",
         63: "AsyncDialog", 66: "AsyncIAP", 67: "AsyncCloud", 68: "AsyncNetworking",
         69: "AsyncSteam", 70: "AsyncSocial", 71: "AsyncPush", 72: "AsyncSaveLoad",
         73: "AsyncAudioRecording", 74: "AsyncAudioPlayback", 75: "AsyncSystem"}
for i in range(10, 26):
    OTHER[i] = "UserEvent%d" % (i - 10)
for i in range(40, 48):
    OTHER[i] = "OutsideView%d" % (i - 40)
for i in range(50, 58):
    OTHER[i] = "BoundaryView%d" % (i - 50)
DRAW = {0: "Draw", 64: "DrawGUI", 65: "Resize", 72: "DrawBegin", 73: "DrawEnd",
        74: "DrawGUIBegin", 75: "DrawGUIEnd", 76: "PreDraw", 77: "PostDraw"}
STEP = {0: "Step", 1: "BeginStep", 2: "EndStep"}
VK = {8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "control", 18: "alt",
      19: "pause", 27: "escape", 32: "space", 33: "pageup", 34: "pagedown",
      35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down",
      45: "insert", 46: "delete", 0: "nokey", 1: "anykey"}
for c in range(48, 58):
    VK[c] = "num%d" % (c - 48)
for c in range(65, 91):
    VK[c] = chr(c)
for c in range(112, 124):
    VK[c] = "F%d" % (c - 111)


def safe(n):
    return re.sub(r'[^A-Za-z0-9_.\-]', "_", str(n))


def event_filename(ev, objnames):
    t, s = ev["type"], ev["subtype"]
    if t == 0:
        return "Create"
    if t == 1:
        return "Destroy"
    if t == 2:
        return "Alarm_%d" % s
    if t == 3:
        return STEP.get(s, "Step_%d" % s)
    if t == 4:
        return "Collision_" + safe(objnames.get(s, s))
    if t == 5:
        return "Key_" + safe(VK.get(s, s))
    if t == 6:
        return "Mouse_" + safe(MOUSE.get(s, s))
    if t == 7:
        return "Other_" + safe(OTHER.get(s, s))
    if t == 8:
        return DRAW.get(s, "Draw_%d" % s)
    if t == 9:
        return "KeyPress_" + safe(VK.get(s, s))
    if t == 10:
        return "KeyRelease_" + safe(VK.get(s, s))
    return "Event%d_%d" % (t, s)


objects = json.load(open(os.path.join(OUT, "objects.json"), encoding="utf-8"))
objnames = {int(k): v for k, v in json.load(open(os.path.join(OUT, "object_names.json"), encoding="utf-8")).items()}
rooms = json.load(open(os.path.join(OUT, "rooms.json"), encoding="utf-8"))
_sp = os.path.join(OUT, "sprites", "_index.json")
if not os.path.exists(_sp):
    _sp = os.path.join(REPO, "data", "sprites.json")
sprites = json.load(open(_sp, encoding="utf-8"))
code_index = json.load(open(os.path.join(OUT, "code_index.json"), encoding="utf-8"))
code_by_id = {i: e for i, e in enumerate(code_index)}
gml_dir = os.path.join(OUT, "gml")
if not os.path.isdir(gml_dir):                 # gia' spostato dentro il repo
    gml_dir = os.path.join(REPO, "raw", "gml")

if os.path.isdir(os.path.join(REPO, "src")):
    shutil.rmtree(os.path.join(REPO, "src"))
os.makedirs(REPO, exist_ok=True)

# ------------------------------------------------------------ src/objects
n_ev = n_missing = 0
for o in objects:
    od = os.path.join(REPO, "src", "objects", safe(o["name"]))
    os.makedirs(od, exist_ok=True)
    meta = {k: o[k] for k in ("index", "name", "sprite", "mask_sprite", "parent",
                              "visible", "solid", "depth", "persistent")}
    meta["physics"] = o["physics"]
    meta["events"] = []
    for ev in o["events"]:
        fn = event_filename(ev, objnames)
        parts = []
        for cid in ev["code_ids"]:
            e = code_by_id.get(cid)
            if not e:
                n_missing += 1
                continue
            p = os.path.join(gml_dir, e["gml"])
            if os.path.exists(p):
                parts.append(open(p, encoding="utf-8").read())
            else:
                n_missing += 1
        if parts:
            open(os.path.join(od, fn + ".gml"), "w", encoding="utf-8").write("\n".join(parts))
            n_ev += 1
        meta["events"].append({"file": fn + ".gml", "type": ev["type_name"],
                               "subtype": ev["subtype"], "code_ids": ev["code_ids"],
                               "action_count": len(ev["actions"])})
    json.dump(meta, open(os.path.join(od, "_object.json"), "w", encoding="utf-8"),
              indent=1, ensure_ascii=False)
print("event gml files:", n_ev, " missing code refs:", n_missing)

# ------------------------------------------------------------ src/scripts
os.makedirs(os.path.join(REPO, "src", "scripts"), exist_ok=True)
scripts = json.load(open(os.path.join(OUT, "scripts.json"), encoding="utf-8"))
for s in scripts:
    e = code_by_id.get(s["code_id"])
    if e:
        shutil.copy(os.path.join(gml_dir, e["gml"]),
                    os.path.join(REPO, "src", "scripts", safe(s["name"]) + ".gml"))

# ------------------------------------------------------------ src/rooms
os.makedirs(os.path.join(REPO, "src", "rooms"), exist_ok=True)
for r in rooms:
    json.dump(r, open(os.path.join(REPO, "src", "rooms", safe(r["name"]) + ".json"),
                      "w", encoding="utf-8"), indent=1, ensure_ascii=False)

# ------------------------------------------------------------ data
dd = os.path.join(REPO, "data")
os.makedirs(dd, exist_ok=True)
for f in ("objects.json", "rooms.json", "fonts.json", "backgrounds.json",
          "strings.txt", "code_index.json", "functions.json", "scripts.json",
          "object_names.json"):
    p = os.path.join(OUT, f)
    if os.path.exists(p):
        shutil.copy(p, dd)
for src_rel, dst in ((("sprites", "_index.json"), "sprites.json"),
                     (("textures", "_index.json"), "textures.json")):
    p = os.path.join(OUT, *src_rel)
    if os.path.exists(p):
        shutil.copy(p, os.path.join(dd, dst))

print("repo assembled at", REPO)
