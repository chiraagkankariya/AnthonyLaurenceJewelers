export default {
  name: 'customInquiry',
  title: 'Custom Jewelry Inquiry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'pieceType',
      title: 'Jewelry Type',
      type: 'string',
      options: {
        list: [
          'Engagement Ring',
          'Wedding Band',
          'Necklace',
          'Earrings',
          'Bracelet',
          'Other',
        ],
      },
    },
    {
      name: 'description',
      title: 'Description / Vision',
      type: 'text',
    },
    {
      name: 'budgetRange',
      title: 'Budget Range',
      type: 'string',
      options: {
        list: [
          'Under $1,000',
          '$1,000–$2,500',
          '$2,500–$5,000',
          '$5,000–$10,000',
          '$10,000+',
        ],
      },
    },
    {
      name: 'referenceImage',
      title: 'Reference Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'referenceWebsiteUrl',
      title: 'Reference Website URL',
      type: 'url',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
}
