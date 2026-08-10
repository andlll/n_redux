Add-Type -AssemblyName System.Drawing

# Rigenera i singoli frame PNG dalle texture page del repo.
# Non serve alla build (gli atlas si fanno con 23_atlas.py + 24_blit.ps1):
# e' un export di comodo per sfogliare la grafica.
$root = Split-Path -Parent $PSScriptRoot
$texDir = Join-Path $root "assets\textures"
$outDir = Join-Path $root "assets\sprites"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force $outDir | Out-Null }

$sprites = Get-Content (Join-Path $root "data\sprites.json") -Raw -Encoding UTF8 | ConvertFrom-Json

# load all texture pages once
$pages = @{}
Get-ChildItem "$texDir\page_*.png" | ForEach-Object {
    $id = [int]($_.BaseName -replace 'page_', '')
    $pages[$id] = [System.Drawing.Bitmap]::FromFile($_.FullName)
}
Write-Host "loaded $($pages.Count) texture pages"

$fmt = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
$png = [System.Drawing.Imaging.ImageFormat]::Png
$total = 0
$skipped = 0
$i = 0

foreach ($s in $sprites) {
    $i++
    if ($i % 100 -eq 0) { Write-Host "  $i / $($sprites.Count)  ($total frames)" }
    if ($s.frame_count -lt 1) { continue }
    $name = ($s.name -replace '[^A-Za-z0-9_\-]', '_')
    $dir = Join-Path $outDir $name
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    $f = 0
    foreach ($fr in $s.frames) {
        if ($null -eq $fr.tex) { $skipped++; $f++; continue }
        $page = $pages[[int]$fr.tex]
        if ($null -eq $page) { $skipped++; $f++; continue }
        $w = [int]$s.width; $h = [int]$s.height
        if ($w -le 0 -or $h -le 0) { $w = [int]$fr.w; $h = [int]$fr.h }
        if ($w -le 0 -or $h -le 0) { $skipped++; $f++; continue }
        $canvas = New-Object System.Drawing.Bitmap($w, $h, $fmt)
        $g = [System.Drawing.Graphics]::FromImage($canvas)
        $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $src = New-Object System.Drawing.Rectangle([int]$fr.x, [int]$fr.y, [int]$fr.w, [int]$fr.h)
        $dst = New-Object System.Drawing.Rectangle([int]$fr.render_x, [int]$fr.render_y, [int]$fr.w, [int]$fr.h)
        $g.DrawImage($page, $dst, $src, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $canvas.Save((Join-Path $dir ("{0}_{1:d3}.png" -f $name, $f)), $png)
        $canvas.Dispose()
        $total++
        $f++
    }
}

foreach ($p in $pages.Values) { $p.Dispose() }
Write-Host "frames written: $total   skipped: $skipped"
