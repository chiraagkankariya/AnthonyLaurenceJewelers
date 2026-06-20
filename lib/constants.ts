export const METAL_TYPES = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver', 'Platinum']

export const PURITY_OPTIONS = ['10k', '14k', '18k', '22k', '24k']

export const STONE_TYPES = [
  'Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Moissanite',
  'Pearl', 'Opal', 'Amethyst', 'Topaz', 'Other',
]

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export const CATEGORY_LABELS: Record<string, string> = {
  rings: 'Rings',
  necklaces: 'Necklaces / Chains',
  earrings: 'Earrings',
  bracelets: 'Bracelets',
  chains: 'Chains',
}

export const SUBCATEGORY_OPTIONS: Record<string, { label: string; value: string }[]> = {
  rings: [
    { label: 'Engagement Rings', value: 'engagement' },
    { label: 'Wedding Bands', value: 'wedding' },
    { label: 'Eternity Bands', value: 'eternity' },
    { label: 'Fashion Rings', value: 'fashion' },
    { label: "Men's Rings", value: 'mens' },
  ],
  necklaces: [
    { label: 'Pendant Necklaces', value: 'pendant' },
    { label: 'Chain Necklaces', value: 'chain' },
    { label: 'Lockets', value: 'locket' },
    { label: 'Tennis Necklaces', value: 'tennis' },
    { label: "Men's Chains", value: 'mens-chain' },
  ],
  earrings: [
    { label: 'Studs', value: 'studs' },
    { label: 'Hoops', value: 'hoops' },
    { label: 'Drop / Dangle', value: 'drop-dangle' },
    { label: 'Fashion Earrings', value: 'fashion' },
  ],
  bracelets: [
    { label: 'Tennis Bracelets', value: 'tennis' },
    { label: "Men's Bracelets", value: 'mens' },
  ],
  chains: [
    { label: 'Cuban Link', value: 'cuban' },
    { label: 'Rope', value: 'rope' },
    { label: 'Box', value: 'box' },
    { label: 'Figaro', value: 'figaro' },
    { label: 'Plain Chains', value: 'chain' },
    { label: "Men's Chains", value: 'mens-chain' },
  ],
}
