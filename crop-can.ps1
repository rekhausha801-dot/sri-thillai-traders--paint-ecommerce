Add-Type -AssemblyName System.Drawing
$inputPath = "f:\panit frontend\src\assets\original-full-footer.png"
$outputPath = "f:\panit frontend\src\assets\footer-can-exact.png"

$img = [System.Drawing.Bitmap]::FromFile($inputPath)
# Reference: total 1024 x 414
# We crop the exact paint can, potted plant, and paintbrush:
# From x=0, y=190 down to y=350 (height 160), width 180
$rect = New-Object System.Drawing.Rectangle(0, 190, 180, 155)
$cropped = $img.Clone($rect, $img.PixelFormat)
$cropped.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$img.Dispose()
Write-Output "Cropped precise can saved to $outputPath"
