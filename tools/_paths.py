"""Percorsi condivisi dai tool. Niente cartelle locali cablate nel codice.

Tre radici:

  REPO_DIR   la radice del repo (dedotta da questo file). Contiene data/,
             src/, raw/, assets/textures/, game/. Basta per tutto cio' che
             serve a far girare e studiare il gioco.

  EXTRACT    area di lavoro dell'estrazione da NIMBUS.exe: data.win, la CAB
             scompattata, l'output grezzo. NON e' nel repo, perche' e' un
             passaggio che si fa una volta sola e il cui risultato e' gia'
             versionato. Si sposta con la variabile NIMBUS_EXTRACT.

  SOURCE_EXE l'eseguibile originale, unico input dell'intera catena.
             Si sposta con NIMBUS_EXE.

Solo i tool 01-15 e 18 usano EXTRACT e SOURCE_EXE: sono archeologia, servono
per rifare l'estrazione da zero. Tutti gli altri lavorano dal solo repo.
"""
import os

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(REPO_DIR, "tools")

EXTRACT = os.environ.get("NIMBUS_EXTRACT", os.path.join(REPO_DIR, "_extract"))
WORK = os.path.dirname(EXTRACT)
SOURCE_EXE = os.environ.get("NIMBUS_EXE", os.path.join(WORK, "NIMBUS.exe"))


def need(path, what):
    """Errore chiaro invece di uno stack trace incomprensibile."""
    if not os.path.exists(path):
        raise SystemExit(
            "manca %s:\n  %s\n\n"
            "Questo tool rifa' l'estrazione da NIMBUS.exe e ha bisogno dei file\n"
            "originali, che non sono nel repo. Indica dove sono con:\n"
            "  set NIMBUS_EXE=<percorso di NIMBUS.exe>\n"
            "  set NIMBUS_EXTRACT=<cartella di lavoro>\n\n"
            "Per lavorare sul gioco non serve: data/, src/, raw/ e\n"
            "assets/textures/ sono gia' nel repo." % (what, path))
    return path
