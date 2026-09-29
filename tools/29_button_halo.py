"""Toglie l'alone bianco baked-in dai tre PNG dei bottoni del menu principale.

[Bug segnalato dall'autore: "i tre tasti nel menu principale hanno una sorta
di alone biancastro attorno alla pillola"] Verificato sui pixel: menu_newga,
menu_newgaeas e menu_tutoriae (assets/textures/, TITLE_BUTTON_OVERRIDES in
tools/23_atlas.py) sono 552x213 con una pillola a capsula (semicerchi di
raggio ~H/2, lati piatti tagliati dal bordo dell'immagine) — ma FUORI dal
bordo della capsula c'e' un alone bianco puro (RGB 255) con alpha che parte
da ~19-60 subito a ridosso del bordo e decade lentamente (max ~36 negli
angoli, ~9300 pixel per file, tutti e tre nella stessa forma). In piu' i
pixel dell'anello di antialiasing hanno l'RGB schiarito verso il bianco. Il
motore disegna con blend a alpha DIRETTO (non premoltiplicato) e filtro
LINEAR (game/src/gl.js): il bianco dei texel semitrasparenti sbava sul bordo
e resta come chiarore attorno alla pillola su sfondi scuri.

Correzione, sul solo canale di bordo e mai sul contenuto della pillola:
  1. alpha = copertura geometrica di una capsula (supercampionata 8x8), con
     raggio R adattato per ciascun file (i tre non hanno lo stesso: newga
     ~106.5, gli altri due ~107.3) — cosi' fuori dal bordo l'alpha e' 0;
  2. RGB dei pixel dell'anello di bordo e di tutto l'esterno = colore del
     pixel interno piu' vicino (dilatazione), cosi' nemmeno il filtro LINEAR
     puo' pescare bianco. Il contenuto interno (a piu' di 1.5px dal bordo) e'
     intoccato.

Idempotente: rilanciato su un file gia' pulito lo lascia com'e'.
Uso: python3 tools/29_button_halo.py [--check]   (--check: solo misura)
"""
import os, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ["menu_newga.png", "menu_newgaeas.png", "menu_tutoriae.png"]
SS = 8            # supercampionamento della copertura
SOLID_MARGIN = 1.5  # px dal bordo oltre i quali l'RGB originale e' affidabile
DILATE = 12       # quanti px oltre il bordo riempire con il colore interno


def coverage(w, h, r):
    """Copertura (0..1) di una capsula orizzontale alta h, raggio r, centri a x=r e x=w-r."""
    cov = np.zeros((h, w))
    o = (np.arange(SS) + 0.5) / SS
    for dy in o:
        for dx in o:
            x = np.arange(w)[None, :] + dx
            y = np.arange(h)[:, None] + dy
            cx = np.clip(x, r, w - r)
            cov += ((x - cx) ** 2 + (y - h / 2) ** 2 <= r * r)
    return cov / (SS * SS)


def dist_from_spine(w, h, r):
    y, x = np.mgrid[0:h, 0:w] + 0.5
    cx = np.clip(x, r, w - r)
    return np.sqrt((x - cx) ** 2 + (y - h / 2) ** 2)


def fit_radius(alpha, w, h):
    """R che meglio spiega l'alpha originale sull'anello di bordo (mediana: l'alone lo sposta di poco)."""
    best = None
    for r in np.arange(105.0, 109.01, 0.05):
        d = dist_from_spine(w, h, r)
        ring = (d > r - 3) & (d < r + 3) & (np.arange(w)[None, :] > 3) & (np.arange(w)[None, :] < w - 3)
        # un semicerchio di raggio r > h/2 esce dall'immagine: si tiene solo l'anello interno alle righe
        ring &= (np.arange(h)[:, None] > 2) & (np.arange(h)[:, None] < h - 3)
        err = ((alpha[ring] - coverage(w, h, r)[ring]) ** 2).mean()
        if best is None or err < best[0]:
            best = (err, r)
    return best[1]


def clean(path, check_only):
    im = Image.open(path).convert("RGBA")
    a = np.array(im)
    h, w = a.shape[:2]
    alpha0 = a[..., 3] / 255.0
    r = fit_radius(alpha0, w, h)
    cov = coverage(w, h, r)
    d = dist_from_spine(w, h, r)
    outside = cov < 0.001
    halo = alpha0[outside]
    print("%s: R=%.2f  alone: %d px con alpha>0 fuori dal bordo (max %d, media %.1f)" % (
        os.path.basename(path), r, int((halo > 0).sum()), int(halo.max() * 255), float(halo.mean() * 255)))
    if check_only:
        return
    # RGB: parte fidata = interno a piu' di SOLID_MARGIN dal bordo
    # i tratti piatti (righe di bordo dell'immagine, fra i due semicerchi)
    # non hanno antialiasing ne' alone: restano interi
    xs = np.arange(w)[None, :] + 0.5
    flat = (xs >= r) & (xs <= w - r) & (cov >= 0.999)
    solid = (d <= r - SOLID_MARGIN) | flat
    rgb = a[..., :3].astype(np.float64)
    known = solid.copy()
    for _ in range(DILATE):
        # media dei vicini (8-connessi) gia' noti per ogni pixel ancora ignoto
        pad_k = np.pad(known, 1).astype(np.float64)
        pad_c = np.pad(rgb * known[..., None], ((1, 1), (1, 1), (0, 0)))
        num = np.zeros_like(rgb); cnt = np.zeros((h, w))
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dy == 0 and dx == 0:
                    continue
                cnt += pad_k[1 + dy:1 + dy + h, 1 + dx:1 + dx + w]
                num += pad_c[1 + dy:1 + dy + h, 1 + dx:1 + dx + w]
        new = (~known) & (cnt > 0)
        rgb[new] = num[new] / cnt[new][:, None]
        known |= new
    out = np.zeros_like(a)
    out[..., :3] = np.where(known[..., None], np.round(rgb), 0).astype(np.uint8)
    out[..., 3] = np.round(cov * 255).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(path, optimize=True)


if __name__ == "__main__":
    check = "--check" in sys.argv
    for f in FILES:
        clean(os.path.join(ROOT, "assets", "textures", f), check)
