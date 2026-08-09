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
