/**
 * Bulk product import script.
 * Usage: npx ts-node scripts/importProducts.ts <path-to-spreadsheet.xlsx>
 *
 * Reads the Excel file, validates each row, and upserts products into Sanity.
 * Skips rows with missing required fields and logs a warning.
 * Re-running is safe — uses slug as the unique key (createOrReplace).
 */

import * as XLSX from 'xlsx'
import { createClient } from '@sanity/client'
import path from 'path'
import * as fs from 'fs'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const VALID_CATEGORIES = ['rings', 'necklaces', 'earrings', 'bracelets']
const VALID_METALS = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver', 'Platinum']
const VALID_PURITIES = ['10k', '14k', '18k', '22k', '24k']

interface SpreadsheetRow {
  name: string
  category: string
  subcategory: string
  price: string | number
  salePrice?: string | number
  description: string
  stoneType?: string
  stoneShape?: string
  caratSize?: string | number
  metalTypes: string
  purities?: string
  inStock: string
  featured: string
  labGrown: string
  ringSizes: string
  necklaceLengths: string
  braceletLengths: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function parseBool(val: string | boolean | undefined): boolean {
  if (typeof val === 'boolean') return val
  return String(val).trim().toUpperCase() === 'TRUE'
}

function parseList(val: string | undefined): string[] {
  if (!val) return []
  return val.split(',').map((s) => s.trim()).filter(Boolean)
}

function validateRow(row: SpreadsheetRow, index: number): boolean {
  const errors: string[] = []

  if (!row.name?.toString().trim()) errors.push('missing name')
  if (!row.category?.toString().trim()) errors.push('missing category')
  else if (!VALID_CATEGORIES.includes(row.category.toString().trim()))
    errors.push(`invalid category "${row.category}" — must be one of: ${VALID_CATEGORIES.join(', ')}`)
  if (!row.description?.toString().trim()) errors.push('missing description')
  if (!row.price && row.price !== 0) errors.push('missing price')
  if (isNaN(Number(row.price))) errors.push('price must be a number')
  if (!row.metalTypes?.toString().trim()) errors.push('missing metalTypes')

  const metals = parseList(row.metalTypes?.toString())
  const invalidMetals = metals.filter((m) => !VALID_METALS.includes(m))
  if (invalidMetals.length > 0)
    errors.push(`invalid metal type(s): ${invalidMetals.join(', ')}`)

  const purities = parseList(row.purities?.toString())
  const invalidPurities = purities.filter((p) => !VALID_PURITIES.includes(p))
  if (invalidPurities.length > 0)
    errors.push(`invalid purity value(s): ${invalidPurities.join(', ')}`)

  if (errors.length > 0) {
    console.warn(`⚠️  Row ${index + 2} skipped (${row.name || 'unnamed'}): ${errors.join('; ')}`)
    return false
  }
  return true
}

async function importProducts(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment')
    process.exit(1)
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN — create a write token in your Sanity project settings')
    process.exit(1)
  }

  const workbook = XLSX.readFile(filePath)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json<SpreadsheetRow>(sheet)

  console.log(`\nFound ${rows.length} rows in ${path.basename(filePath)}\n`)

  let imported = 0
  let skipped = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    if (!validateRow(row, i)) {
      skipped++
      continue
    }

    const slug = slugify(row.name.toString())
    const metals = parseList(row.metalTypes.toString())
    const purities = parseList(row.purities?.toString())

    const doc = {
      _type: 'product',
      _id: `product-${slug}`,
      name: row.name.toString().trim(),
      slug: { _type: 'slug', current: slug },
      category: row.category.toString().trim(),
      subcategory: row.subcategory?.toString().trim() || '',
      description: row.description.toString().trim(),
      price: Number(row.price),
      ...(row.salePrice ? { salePrice: Number(row.salePrice) } : {}),
      inStock: parseBool(row.inStock as string),
      featured: parseBool(row.featured as string),
      labGrown: parseBool(row.labGrown as string),
      ...(row.stoneType ? { stoneType: row.stoneType.toString().trim() } : {}),
      ...(row.stoneShape ? { stoneShape: row.stoneShape.toString().trim() } : {}),
      ...(row.caratSize ? { caratSize: Number(row.caratSize) } : {}),
      metalTypes: metals,
      ...(purities.length > 0 ? { purities } : {}),
      ringSizes: parseBool(row.ringSizes as string),
      necklaceLengths: parseBool(row.necklaceLengths as string),
      braceletLengths: parseBool(row.braceletLengths as string),
    }

    try {
      await client.createOrReplace(doc)
      console.log(`✅ Imported: ${row.name}`)
      imported++
    } catch (err) {
      console.error(`❌ Failed to import "${row.name}":`, err)
      skipped++
    }
  }

  console.log(`\nDone. ${imported} imported, ${skipped} skipped.\n`)
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npx ts-node scripts/importProducts.ts <path-to-spreadsheet.xlsx>')
  process.exit(1)
}

importProducts(path.resolve(filePath))
