$shell = New-Object -COMObject Shell.Application
$folder = $shell.Namespace('F:\panit frontend\src\assets')
$file = $folder.ParseName('WhatsApp Video 2026-10-27 at 10.06.40 AM.mp4')
0..310 | ForEach-Object {
    $prop = $folder.GetDetailsOf($null, $_)
    $val = $folder.GetDetailsOf($file, $_)
    if ($val -and ($prop -match 'width|height|dimensions|rate|frame')) {
        Write-Host "$prop : $val"
    }
}
