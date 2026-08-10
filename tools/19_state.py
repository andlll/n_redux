import os, re, json, collections
from _paths import REPO_DIR

REPO = REPO_DIR
gml = os.path.join(REPO, "raw", "gml")

reads = collections.Counter()
writes = collections.Counter()
writers = collections.defaultdict(set)
for fn in os.listdir(gml):
    t = open(os.path.join(gml, fn), encoding="utf-8").read()
    obj = fn.replace("gml_Object_", "").rsplit("_", 2)[0]
    for m in re.finditer(r"global\.(\w+)", t):
        reads[m.group(1)] += 1
    for m in re.finditer(r"^\s*global\.(\w+)(\[[^\]]*\])?\s*=", t, re.M):
        writes[m.group(1)] += 1
        writers[m.group(1)].add(obj)

print("VARIABILI GLOBALI (%d)" % len(reads))
print("%-22s %6s %6s  %s" % ("nome", "usi", "scritt", "scritta da"))
for k, v in reads.most_common():
    w = sorted(writers[k])
    print("%-22s %6d %6d  %s" % (k, v, writes[k],
          ", ".join(w[:5]) + (" ..." if len(w) > 5 else "")))
