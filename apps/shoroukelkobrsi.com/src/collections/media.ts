import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    components: {
      views: {
        list: {
          Component: '/custom-components/media-upload',
        },
      },
    },
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
    mimeTypes: ['image/*', 'video/*'],
  },
}
