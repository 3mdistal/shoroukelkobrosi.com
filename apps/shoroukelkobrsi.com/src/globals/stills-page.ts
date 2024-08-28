import { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { getURL } from '../utilities/get-url'

export const StillsPage: GlobalConfig = {
  slug: 'stills-page',
  admin: {
    livePreview: {
      url: `${getURL()}/stills`,
    },
  },
  fields: [
    {
      name: 'stills',
      type: 'array',
      fields: [
        {
          name: 'still',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'date',
          type: 'date',
        },
      ],
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag('stills')
      },
    ],
  },
  versions: true,
}
