Add-Type -AssemblyName System.Drawing

$root = "C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\_extract\out"
$texDir = Join-Path $root "textures"
$outDir = Join-Path $root "sprites"

$sprites = Get-Content (Join-Path $outDir "_index.json") -Raw -Encoding UTF8 | ConvertFrom-Json

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
