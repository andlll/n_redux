import os, sys, json
from _paths import REPO_DIR

REPO = REPO_DIR
objs = os.path.join(REPO, "src", "objects")
MAX = int(os.environ.get("MAXLINES", "26"))

for name in sys.argv[1:]:
    d = os.path.join(objs, name)
    if not os.path.isdir(d):
        print("### %s -- NON TROVATO" % name)
        continue
    meta = json.load(open(os.path.join(d, "_object.json"), encoding="utf-8"))
    print("=" * 70)
    print("### %s   sprite=%s parent=%s depth=%s" %
          (name, meta["sprite"], meta["parent"], meta["depth"]))
    for f in sorted(os.listdir(d)):
        if not f.endswith(".gml"):
            continue
        lines = [l for l in open(os.path.join(d, f), encoding="utf-8").read().splitlines()
                 if l.strip() and not l.startswith("///")]
        print("  --- %s (%d righe) ---" % (f, len(lines)))
        for l in lines[:MAX]:
            print("     " + l)
        if len(lines) > MAX:
            print("     ... (+%d righe)" % (len(lines) - MAX))
