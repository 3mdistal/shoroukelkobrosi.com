import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { getURL } from '@/utilities/get-url'
import { OGInfo } from '@/blocks/og-info'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    livePreview: {
      url: `${getURL()}`,
    },
    group: 'Pages',
  },
  fields: [
    {
      name: 'reel',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featuredFilms',
      type: 'relationship',
      relationTo: 'films',
      hasMany: true,
      index: true,
      admin: {
        isSortable: true,
      },
    },
    OGInfo,
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag('homepage')
      },
    ],
  },
  versions: true,
}
