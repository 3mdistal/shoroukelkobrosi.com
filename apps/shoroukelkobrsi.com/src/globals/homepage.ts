import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
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
