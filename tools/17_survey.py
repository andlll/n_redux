"""Prima passata: chi controlla cosa, cosa c'e' in ogni room, quali sono le famiglie."""
import os, re, json, collections
from _paths import REPO_DIR

REPO = REPO_DIR
objs = json.load(open(os.path.join(REPO, "data", "objects.json"), encoding="utf-8"))
rooms = json.load(open(os.path.join(REPO, "data", "rooms.json"), encoding="utf-8"))
byidx = {o["index"]: o for o in objs}

print("=" * 78)
print("ROOM: composizione")
print("=" * 78)
for r in rooms:
    c = collections.Counter(i["object"] for i in r["instances"])
    print("\n%-12s %dx%d  speed=%d  istanze=%d  view=%s" %
          (r["name"], r["width"], r["height"], r["speed"], len(r["instances"]),
           "si" if any(v["enabled"] for v in r["views"]) else "no"))
    for v in r["views"]:
        if v["enabled"]:
            print("     view %dx%d @(%d,%d) port %dx%d segue=%s" %
                  (v["w"], v["h"], v["x"], v["y"], v["port_w"], v["port_h"],
                   byidx.get(v["follow_obj"], {}).get("name", v["follow_obj"])))
    print("     top:", ", ".join("%s x%d" % (n, k) for n, k in c.most_common(12)))

print()
print("=" * 78)
print("OGGETTI CON INPUT (chi e' comandato dal giocatore)")
print("=" * 78)
for o in objs:
    ev = [e["type_name"] + ":" + str(e["subtype"]) for e in o["events"]
          if e["type_name"] in ("Keyboard", "KeyPress", "KeyRelease", "Mouse")]
    if ev:
        rl = [r["name"] for r in rooms if any(i["object"] == o["name"] for i in r["instances"])]
        if rl:
            print("  %-22s %-40s room=%s" % (o["name"], ",".join(ev[:6]), ",".join(rl)))

print()
print("=" * 78)
print("GERARCHIA parent")
print("=" * 78)
kids = collections.defaultdict(list)
for o in objs:
    if o["parent"]:
        kids[o["parent"]].append(o["name"])
print("oggetti con parent: %d / %d" % (sum(len(v) for v in kids.values()), len(objs)))
for p, v in sorted(kids.items(), key=lambda kv: -len(kv[1]))[:15]:
    print("  %-22s <- %d figli: %s" % (p, len(v), ", ".join(sorted(v)[:8])))
