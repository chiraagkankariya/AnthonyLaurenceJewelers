/**
 * Generates a sample products.xlsx file for testing the import script.
 * Usage: npx ts-node scripts/createSampleSpreadsheet.ts
 */

import * as XLSX from 'xlsx'
import path from 'path'

const sampleProducts = [
  {
    name: 'Round Solitaire Engagement Ring',
    category: 'rings',
    subcategory: 'engagement',
    price: 3200,
    salePrice: '',
    description: 'Classic round solitaire engagement ring featuring a lab grown diamond set in a four-prong setting. Timeless elegance for the modern couple.',
    stoneType: 'Diamond',
    stoneShape: 'Round',
    caratSize: 1.5,
    metalTypes: 'Yellow Gold, White Gold, Platinum',
    purities: '14k, 18k',
    inStock: 'TRUE',
    featured: 'TRUE',
    labGrown: 'TRUE',
    ringSizes: 'TRUE',
    necklaceLengths: 'FALSE',
    braceletLengths: 'FALSE',
  },
  {
    name: 'Diamond Tennis Bracelet',
    category: 'bracelets',
    subcategory: 'tennis',
    price: 2800,
    salePrice: 2400,
    description: 'Stunning tennis bracelet set with round lab grown diamonds in a classic channel setting. The perfect everyday luxury piece.',
    stoneType: 'Diamond',
    stoneShape: 'Round',
    caratSize: 3,
    metalTypes: 'White Gold, Yellow Gold',
    purities: '14k, 18k',
    inStock: 'TRUE',
    featured: 'TRUE',
    labGrown: 'TRUE',
    ringSizes: 'FALSE',
    necklaceLengths: 'FALSE',
    braceletLengths: 'TRUE',
  },
  {
    name: 'Oval Diamond Pendant Necklace',
    category: 'necklaces',
    subcategory: 'pendant',
    price: 1850,
    salePrice: '',
    description: 'Delicate oval lab grown diamond pendant suspended on a fine chain. A versatile piece that elevates any outfit.',
    stoneType: 'Diamond',
    stoneShape: 'Oval',
    caratSize: 1,
    metalTypes: 'Yellow Gold, White Gold, Rose Gold',
    purities: '14k, 18k',
    inStock: 'TRUE',
    featured: 'FALSE',
    labGrown: 'TRUE',
    ringSizes: 'FALSE',
    necklaceLengths: 'TRUE',
    braceletLengths: 'FALSE',
  },
  {
    name: 'Diamond Stud Earrings',
    category: 'earrings',
    subcategory: 'studs',
    price: 950,
    salePrice: '',
    description: 'Classic round lab grown diamond stud earrings in a four-prong basket setting. A wardrobe essential for every occasion.',
    stoneType: 'Diamond',
    stoneShape: 'Round',
    caratSize: '',
    metalTypes: 'White Gold, Yellow Gold',
    purities: '14k',
    inStock: 'TRUE',
    featured: 'TRUE',
    labGrown: 'TRUE',
    ringSizes: 'FALSE',
    necklaceLengths: 'FALSE',
    braceletLengths: 'FALSE',
  },
  {
    name: 'Cushion Cut Sapphire Fashion Ring',
    category: 'rings',
    subcategory: 'fashion',
    price: 1400,
    salePrice: '',
    description: 'Bold cushion cut blue sapphire set in a halo of pavé diamonds. Statement jewelry with timeless appeal.',
    stoneType: 'Sapphire',
    stoneShape: 'Cushion',
    caratSize: '',
    metalTypes: 'Yellow Gold, White Gold',
    purities: '14k, 18k',
    inStock: 'TRUE',
    featured: 'FALSE',
    labGrown: 'FALSE',
    ringSizes: 'TRUE',
    necklaceLengths: 'FALSE',
    braceletLengths: 'FALSE',
  },
]

const ws = XLSX.utils.json_to_sheet(sampleProducts)
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, 'Products')

const outPath = path.resolve('scripts/sample-products.xlsx')
XLSX.writeFile(wb, outPath)
console.log(`Sample spreadsheet created: ${outPath}`)
