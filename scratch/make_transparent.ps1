Add-Type -AssemblyName System.Drawing

$src = "C:\Users\ACER\.gemini\antigravity-ide\brain\cde7e757-9139-4295-bbeb-987e51aaaf3b\blue_yellow_a_icon_1780053379882.png"
$dest = "d:\iAonDev2026\src\app\icon.png"

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$newBmp = New-Object System.Drawing.Bitmap ($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Copy pixels and make white transparent
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # If the pixel is very close to white, make it transparent
        if ($pixel.R -gt 240 -and $pixel.G -gt 240 -and $pixel.B -gt 240) {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $newBmp.SetPixel($x, $y, $pixel)
        }
    }
}

$bmp.Dispose()
$newBmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Dispose()
Write-Host "Success: Converted background to transparent and saved to $dest"
