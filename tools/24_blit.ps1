param([string]$Room = "match_easy")

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$plan = Get-Content (Join-Path $root "game\data\$Room.blitplan.json") -Raw -Encoding UTF8 | ConvertFrom-Json

if (-not (Test-Path $plan.dstDir)) { New-Item -ItemType Directory -Force $plan.dstDir | Out-Null }

$fmt = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
$png = [System.Drawing.Imaging.ImageFormat]::Png

# pagine sorgente caricate una sola volta
$src = @{}
foreach ($b in $plan.blits) {
    if (-not $src.ContainsKey($b.src)) {
        $p = Join-Path $plan.srcDir $b.src
        if (-not (Test-Path $p)) { throw "pagina sorgente mancante: $p" }
        $src[$b.src] = [System.Drawing.Bitmap]::FromFile($p)
    }
}

# pagine di destinazione
$dst = @()
$gfx = @()
foreach ($p in $plan.pages) {
    $bmp = New-Object System.Drawing.Bitmap([int]$p.w, [int]$p.h, $fmt)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $dst += $bmp
    $gfx += $g
}

foreach ($b in $plan.blits) {
    $s = New-Object System.Drawing.Rectangle([int]$b.sx, [int]$b.sy, [int]$b.w, [int]$b.h)
    $d = New-Object System.Drawing.Rectangle([int]$b.dx, [int]$b.dy, [int]$b.w, [int]$b.h)
    $gfx[[int]$b.dst].DrawImage($src[$b.src], $d, $s, [System.Drawing.GraphicsUnit]::Pixel)
}

# GDI+ (System.Drawing) non ha un encoder WebP nativo: da quando
# 23_atlas.py/25_font.py/26_logo.py emettono "*.webp" in blitplan.json
# (24_blit.py, la versione Python usata da CI, salva davvero in WebP —
# vedi il commento li'), questo script scriverebbe comunque byte PNG dentro
# un file chiamato ".webp": un formato sbagliato spacciato per un altro,
# rotto in un modo silenzioso (nessun errore, il file esiste ed e' persino
# un'immagine valida — solo con l'estensione sbagliata). Meglio fermarsi
# subito con un errore chiaro: usa tools/24_blit.py (Python) per la build
# vera, questo resta solo per chi lavora su Windows senza Python a portata
# di mano e puo' accettare un PNG rinominato a mano.
foreach ($p in $plan.pages) {
    if ($p.file -like "*.webp") {
        throw "24_blit.ps1 non sa scrivere WebP (GDI+ non ha un encoder). Usa 'python3 tools/24_blit.py $Room' invece."
    }
}

$total = 0
for ($i = 0; $i -lt $dst.Count; $i++) {
    $gfx[$i].Dispose()
    $out = Join-Path $plan.dstDir $plan.pages[$i].file
    $dst[$i].Save($out, $png)
    $dst[$i].Dispose()
    $total += (Get-Item $out).Length
}
foreach ($b in $src.Values) { $b.Dispose() }

Write-Host ("$Room : {0} pagine scritte, {1:N1} MB su disco" -f $dst.Count, ($total / 1MB))
