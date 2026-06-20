export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Basic Info
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Rings', value: 'rings' },
          { title: 'Necklaces & Pendants', value: 'necklaces' },
          { title: 'Chains', value: 'chains' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Bracelets', value: 'bracelets' },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          // Rings
          { title: 'Engagement Rings', value: 'engagement' },
          { title: 'Wedding Bands', value: 'wedding' },
          { title: 'Eternity Bands', value: 'eternity' },
          { title: 'Fashion Rings', value: 'fashion' },
          { title: "Men's Rings", value: 'mens' },
          // Necklaces & Pendants
          { title: 'Pendant Necklaces', value: 'pendant' },
          { title: 'Lockets', value: 'locket' },
          { title: 'Tennis Necklaces', value: 'tennis' },
          // Chains
          { title: 'Cuban Link', value: 'cuban' },
          { title: 'Rope Chain', value: 'rope' },
          { title: 'Box Chain', value: 'box' },
          { title: 'Figaro Chain', value: 'figaro' },
          { title: 'Plain Chains', value: 'chain' },
          { title: "Men's Chains", value: 'mens-chain' },
          // Earrings
          { title: 'Studs', value: 'studs' },
          { title: 'Hoops', value: 'hoops' },
          { title: 'Drop/Dangle', value: 'drop-dangle' },
          { title: 'Fashion Earrings', value: 'fashion' },
          // Bracelets
          { title: 'Tennis Bracelets', value: 'tennis' },
          { title: "Men's Bracelets", value: 'mens' },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Base Price (USD)',
      type: 'number',
      validation: (Rule: { required: () => { min: (n: number) => unknown } }) =>
        Rule.required().min(0),
    },
    {
      name: 'salePrice',
      title: 'Sale Price (USD)',
      type: 'number',
      description: 'Optional. If set, shows strikethrough on original price.',
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Featured products appear on the homepage.',
    },
    {
      name: 'labGrown',
      title: 'Lab Grown Diamond',
      type: 'boolean',
      initialValue: true,
    },
    // Media
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    // Stone Details
    {
      name: 'stoneType',
      title: 'Stone Type',
      type: 'string',
      options: {
        list: [
          'Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Moissanite',
          'Pearl', 'Opal', 'Amethyst', 'Topaz', 'Other',
        ],
      },
    },
    {
      name: 'stoneShape',
      title: 'Stone Shape',
      type: 'string',
      options: {
        list: [
          'Round', 'Princess', 'Oval', 'Cushion', 'Pear',
          'Marquise', 'Emerald Cut', 'Radiant', 'Asscher', 'Heart',
        ],
      },
    },
    {
      name: 'caratSize',
      title: 'Base Carat Size',
      type: 'number',
      description: 'If ≥ 1, carat selector will be shown on the product page.',
    },
    // Metal & Variants
    {
      name: 'metalTypes',
      title: 'Available Metal Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver', 'Platinum'],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'isTwoTone',
      title: 'Two-Tone Design',
      type: 'boolean',
      initialValue: false,
      description:
        'If true, replaces the metal selector with a fixed "Two-Tone (White Gold & Yellow Gold)" label on the product page. Still list both metals in Available Metal Types for shop filtering.',
    },
    {
      name: 'purities',
      title: 'Available Purities (Gold only)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['10k', '14k', '18k', '22k', '24k'],
      },
      description: 'Only applicable for Yellow Gold and White Gold.',
    },
    {
      name: 'ringSizes',
      title: 'Show Ring Size Selector',
      type: 'boolean',
      description: 'Enable ring size selector (sizes 3–13 in 0.25 increments). Rings only.',
    },
    {
      name: 'necklaceLengths',
      title: 'Show Necklace Length Selector',
      type: 'boolean',
      description: 'Enable length selector (14"–24"). Necklaces only.',
    },
    {
      name: 'braceletLengths',
      title: 'Show Bracelet Length Selector',
      type: 'boolean',
      description: 'Enable length selector (6.5"–8.5"). Bracelets only.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
}
