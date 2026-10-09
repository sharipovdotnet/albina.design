# Подготовка фотографий проекта: из папки с исходниками — в public/images/projects/<slug>.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools/prepare-photos.ps1 `
#     -Source "D:\Проекты\ЖК UNO" -Slug zhk-uno -Cover "2final (1).jpg"
#
# Обложка — кадр 3:4 под вертикальную ячейку сетки, серия — кадры с длинной стороной
# SeriesLongSide для окна галереи. Качество подбирается так, чтобы уложиться в вес:
# CoverMaxKB и SeriesMaxKB. Скрипт печатает блок photos для src/ts/data/projects.ts.
#
# Почему System.Drawing: в проекте нет зависимостей, а .NET есть на Windows из коробки.
# Порядок кадров серии — «естественный»: по первому числу в имени файла, затем по имени,
# поэтому нумерация автора (1final, 2final, 10final) сохраняется.

param(
  [Parameter(Mandatory = $true)][string]$Source,
  [Parameter(Mandatory = $true)][string]$Slug,
  [string]$Cover = "",
  [string]$Target = "public\images\projects",
  [int]$CoverWidth = 1200,
  [int]$CoverMaxKB = 300,
  [int]$SeriesLongSide = 1800,
  [int]$SeriesMaxKB = 500
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $Source)) { throw "Нет папки с исходниками: $Source" }
if ($Slug -notmatch '^[a-z0-9-]+$') { throw "Слаг должен быть из латиницы, цифр и дефисов: $Slug" }

$root = Split-Path -Parent $PSScriptRoot
$dest = Join-Path (Join-Path $root $Target) $Slug
$urlBase = "/images/projects/$Slug"

# --- вспомогательное -------------------------------------------------------

function Get-SortedFiles($folder) {
  Get-ChildItem $folder -File | Where-Object { $_.Extension -match '^\.(jpe?g|png)$' } | Sort-Object `
    @{ Expression = { if ($_.Name -match '(\d+)') { [int]$Matches[1] } else { [int]::MaxValue } } }, Name
}

function Get-JpegCodec {
  [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
}

# EXIF Orientation: без разворота кадры с телефона лягут на бок. У большинства файлов
# ориентация 1, то есть разворот не нужен, но проверить дешевле, чем потом ловить боком.
function Reset-Orientation($image) {
  if ($image.PropertyIdList -notcontains 0x0112) { return }
  $value = [System.BitConverter]::ToUInt16($image.GetPropertyItem(0x0112).Value, 0)
  switch ($value) {
    3 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
    6 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
    8 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
  }
}

# Рисуем исходник в новый битмап нужного размера. WrapMode.TileFlipXY гасит светлую
# кромку, которую DrawImage иначе оставляет по краям уменьшённого кадра.
function Write-Jpeg($image, [int]$width, [int]$height, [int]$cropX, [int]$cropY, [int]$cropW, [int]$cropH, [string]$path, [int]$maxKB, [int]$startQuality) {
  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $attributes = [System.Drawing.Imaging.ImageAttributes]::new()
      try {
        $attributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
        $rect = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
        $graphics.DrawImage($image, $rect, $cropX, $cropY, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
      } finally { $attributes.Dispose() }
    } finally { $graphics.Dispose() }

    $codec = Get-JpegCodec
    $quality = $startQuality
    while ($true) {
      $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
      try {
        $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [int64]$quality)
        $bitmap.Save($path, $codec, $parameters)
      } finally { $parameters.Dispose() }

      $kb = (Get-Item $path).Length / 1KB
      if ($kb -le $maxKB -or $quality -le 60) { break }
      $quality -= 5
    }
    return @{ Quality = $quality; KB = [int]$kb }
  } finally { $bitmap.Dispose() }
}

# --- подготовка ------------------------------------------------------------

$files = @(Get-SortedFiles $Source)
if ($files.Count -eq 0) { throw "В папке нет картинок: $Source" }

# Обложка: указанный файл или первый вертикальный кадр — ячейка сетки вертикальная.
$coverFile = $null
if ($Cover -ne "") {
  $coverFile = $files | Where-Object { $_.Name -eq $Cover } | Select-Object -First 1
  if ($null -eq $coverFile) { throw "В папке нет файла обложки: $Cover" }
} else {
  foreach ($file in $files) {
    $probe = [System.Drawing.Image]::FromFile($file.FullName)
    try { if ($probe.Height -gt $probe.Width) { $coverFile = $file; break } } finally { $probe.Dispose() }
  }
  if ($null -eq $coverFile) { $coverFile = $files[0] }
}

if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Force -Path $dest | Out-Null }
Get-ChildItem $dest -File | Where-Object { $_.Extension -match '^\.(jpe?g|png)$' } | Remove-Item -Force

# Обложка: центральный кадр 3:4, ровно под пропорции ячейки.
# Имена переменных не пересекаются с параметрами: в PowerShell $Source и $source — одно и то же.
$coverImage = [System.Drawing.Image]::FromFile($coverFile.FullName)
try {
  Reset-Orientation $coverImage
  $coverHeight = [int]($CoverWidth * 4 / 3)
  $coverAspect = 3 / 4
  if ($coverImage.Width / $coverImage.Height -gt $coverAspect) { $cropH = $coverImage.Height; $cropW = [int]($coverImage.Height * $coverAspect) }
  else { $cropW = $coverImage.Width; $cropH = [int]($coverImage.Width / $coverAspect) }
  $coverResult = Write-Jpeg $coverImage $CoverWidth $coverHeight ([int](($coverImage.Width - $cropW) / 2)) ([int](($coverImage.Height - $cropH) / 2)) $cropW $cropH `
    (Join-Path $dest 'cover.jpg') $CoverMaxKB 82
} finally { $coverImage.Dispose() }

# Серия: обложечный кадр идёт первым, дальше — порядок автора.
$ordered = @($coverFile) + @($files | Where-Object { $_.Name -ne $coverFile.Name })
$photos = @()
$index = 0
$totalBytes = (Get-Item (Join-Path $dest 'cover.jpg')).Length

foreach ($file in $ordered) {
  $index += 1
  $name = "{0:d2}.jpg" -f $index
  $path = Join-Path $dest $name
  $image = [System.Drawing.Image]::FromFile($file.FullName)
  try {
    Reset-Orientation $image
    $longSide = [Math]::Max($image.Width, $image.Height)
    # Приводим к double: [Math]::Min(1, 0.9) в PowerShell выбирает перегрузку для int
    # и округляет 0.9 до единицы — тогда кадр остался бы необработанным.
    $scale = [Math]::Min([double]1, [double]$SeriesLongSide / [double]$longSide)
    $width = [int][Math]::Round($image.Width * $scale)
    $height = [int][Math]::Round($image.Height * $scale)
    $result = Write-Jpeg $image $width $height 0 0 $image.Width $image.Height $path $SeriesMaxKB 80
  } finally { $image.Dispose() }

  $bytes = (Get-Item $path).Length
  $totalBytes += $bytes
  $photos += "$urlBase/$name"
  if ($scale -lt 1) { $note = "" } else { $note = "  (мельче $SeriesLongSide px — не растягивал)" }
  "  {0}  <-  {1}  {2}x{3}  q{4}  {5:N0} KB{6}" -f $name, $file.Name, $width, $height, $result.Quality, ($bytes / 1KB), $note
}

""
"Обложка: $($coverFile.Name) -> cover.jpg  $($CoverWidth)x$coverHeight  $([int]((Get-Item (Join-Path $dest 'cover.jpg')).Length / 1KB)) KB"
"Кадров серии: $($photos.Count), всего $([int]($totalBytes / 1MB)) МБ в $dest"
""
"Блок для src/ts/data/projects.ts:"
"    cover: '$urlBase/cover.jpg',"
"    photos: ["
foreach ($photo in $photos) { "      '$photo'," }
"    ],"
