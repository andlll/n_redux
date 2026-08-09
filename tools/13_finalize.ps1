$root = "C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus"
$out  = "$root\_extract\out"
$repo = "$root\NIMBUS-source"

New-Item -ItemType Directory -Force "$repo\assets" | Out-Null
New-Item -ItemType Directory -Force "$repo\raw"    | Out-Null
New-Item -ItemType Directory -Force "$repo\tools"  | Out-Null

# sprite frames + texture pages (moved, not copied - they are large)
if (Test-Path "$out\sprites")  { Move-Item "$out\sprites"  "$repo\assets\sprites"  -Force }
if (Test-Path "$out\textures") { Move-Item "$out\textures" "$repo\assets\textures" -Force }
Copy-Item "$root\_extract\cab\splash.png"  "$repo\assets\splash.png" -Force
Copy-Item "$root\_extract\cab\options.ini" "$repo\assets\options.ini" -Force
if (Test-Path "$root\background n.jpg") { Copy-Item "$root\background n.jpg" "$repo\assets\background_n.jpg" -Force }

# raw decompiler output
if (Test-Path "$out\gml") { Move-Item "$out\gml" "$repo\raw\gml" -Force }
if (Test-Path "$out\asm") { Move-Item "$out\asm" "$repo\raw\asm" -Force }

# extraction toolchain
Copy-Item "$root\_tools\*.py"  "$repo\tools\" -Force
Copy-Item "$root\_tools\*.ps1" "$repo\tools\" -Force

Write-Host "assets:" (Get-ChildItem -Recurse "$repo\assets" -File).Count "files"
Write-Host "raw gml:" (Get-ChildItem "$repo\raw\gml" -File).Count "files"
$sz = (Get-ChildItem -Recurse $repo -File | Measure-Object Length -Sum).Sum / 1MB
Write-Host ("repo size: {0:N1} MB" -f $sz)
