import type { CollectionConfig } from 'payload'

export const LargeImage: CollectionConfig = {
  slug: 'large-image',
  admin: {
    group: 'Media',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'upload',
      type: 'upload',
      required: true,
      relationTo: 'media',
      admin: {
        components: {
          Field: '/custom-components/media-upload.tsx',
        },
      },
    },
  ],
}
