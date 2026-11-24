Add-Type -AssemblyName System.Drawing

$srcImgPath = "public\assets\imgs\logo\iconic technologies logo.png"
if (-not (Test-Path $srcImgPath)) {
    Write-Error "Source emblem not found at $srcImgPath"
    exit 1
}

$badge = [System.Drawing.Image]::FromFile($srcImgPath)

function Generate-Brand-Logo([string]$outPath, [bool]$isLightText) {
    # Ultra-sharp 3x canvas: 600 x 200 (aspect ratio 3:1)
    $width = 600
    $height = 200
    $bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # 1. Draw Circular Emblem Badge (centered vertically, maximal size)
    $badgeMargin = 6
    $badgeSize = $height - ($badgeMargin * 2) # 188px
    $badgeX = $badgeMargin
    $badgeY = $badgeMargin
    
    $g.DrawImage($badge, $badgeX, $badgeY, $badgeSize, $badgeSize)

    # 2. Typography
    # Color definition
    $textColor = if ($isLightText) { 
        [System.Drawing.Color]::FromArgb(255, 255, 255, 255) 
    } else { 
        [System.Drawing.Color]::FromArgb(255, 15, 23, 42) # Slate-900 #0f172a
    }
    # Bright energetic royal blue accent for TECHNOLOGIES
    $accentColor = [System.Drawing.Color]::FromArgb(255, 37, 99, 235) # #2563eb

    # Modern clean bold fonts
    $fontTitleName = "Segoe UI"
    $fontTitle = New-Object System.Drawing.Font($fontTitleName, 72, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $fontSub = New-Object System.Drawing.Font($fontTitleName, 28, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

    $brushText = New-Object System.Drawing.SolidBrush($textColor)
    $brushAccent = New-Object System.Drawing.SolidBrush($accentColor)

    # Text Position: tight spacing next to badge
    $textX = $badgeX + $badgeSize + 18
    
    # Draw "ICONIC"
    $g.DrawString("ICONIC", $fontTitle, $brushText, $textX, 18)
    
    # Draw "TECHNOLOGIES" with letter spacing simulation for elegance & prominence
    $subY = 112
    $subText = "TECHNOLOGIES"
    $charX = $textX + 2
    
    # Measure and space letters
    $sf = New-Object System.Drawing.StringFormat
    for ($i = 0; $i -lt $subText.Length; $i++) {
        $ch = $subText[$i].ToString()
        $g.DrawString($ch, $fontSub, $brushAccent, $charX, $subY)
        $charSize = $g.MeasureString($ch, $fontSub, [System.Drawing.PointF]::Empty, $sf)
        $charX += ($charSize.Width - 4) + 6.5 # Extra kerning
    }

    # Save PNG
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    # Clean up
    $sf.Dispose()
    $fontTitle.Dispose()
    $fontSub.Dispose()
    $brushText.Dispose()
    $brushAccent.Dispose()
    $g.Dispose()
    $bmp.Dispose()
}

# Generate both versions
Generate-Brand-Logo "public\assets\imgs\logo\logo.png" $false
Generate-Brand-Logo "public\assets\imgs\logo\logo-light.png" $true

# Also copy to public\logo\ and dist\assets\imgs\logo\
Copy-Item "public\assets\imgs\logo\logo.png" "public\logo\logo.png" -Force
Copy-Item "public\assets\imgs\logo\logo-light.png" "public\logo\logo-light.png" -Force
if (Test-Path "dist\assets\imgs\logo") {
    Copy-Item "public\assets\imgs\logo\logo.png" "dist\assets\imgs\logo\logo.png" -Force
    Copy-Item "public\assets\imgs\logo\logo-light.png" "dist\assets\imgs\logo\logo-light.png" -Force
}

$badge.Dispose()
Write-Host "Brand logos generated successfully!"
