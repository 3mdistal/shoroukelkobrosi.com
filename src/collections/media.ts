import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    description: 'Warning: Images must be under 4.5MB in size.',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      defaultValue: 'Media',
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const fileSize = data.fileSize
        const maxSize = 4.5 * 1024 * 1024
        if (fileSize > maxSize) {
          throw new Error('File size exceeds 4.5MB limit. Please upload a smaller file.')
        }
        return data
      },
    ],
  },
}
