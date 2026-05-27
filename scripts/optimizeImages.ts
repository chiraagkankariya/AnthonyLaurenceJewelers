import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const INPUT_DIR = path.join(process.cwd(), 'public/repair-appraisal')

async function optimizeImages() {
  const files = fs.readdirSync(INPUT_DIR)
  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue
    const inputPath = path.join(INPUT_DIR, file)
    const outputName = path.basename(file, path.extname(file)) + '.webp'
    const outputPath = path.join(INPUT_DIR, outputName)
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath)
    console.log(`✓ ${file} → ${outputName}`)
  }
}

optimizeImages().catch(console.error)
