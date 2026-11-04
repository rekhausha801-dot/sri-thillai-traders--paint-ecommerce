const fs = require('fs');
const { execSync } = require('child_process');

// Use powershell script via temp file
const psScript = `
$items = (Get-ChildItem -Path dist -Force).FullName
Compress-Archive -Path $items -DestinationPath dist.zip -Force
Write-Host "Compressed $($items.Count) items into dist.zip"
`;

fs.writeFileSync('temp_zip.ps1', psScript);
const output = execSync('powershell -ExecutionPolicy Bypass -File temp_zip.ps1').toString();
console.log(output);
fs.unlinkSync('temp_zip.ps1');

