import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { getURL } from '@/utilities/get-url'
import { OGInfo } from '@/blocks/og-info'
import { validateVimeoLink } from '@/components/utils/validate-vimeo-link'

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
      type: 'text',
      label: 'Desktop reel embed URL (Vimeo only)',
      validate: validateVimeoLink,
    },
    {
      name: 'mobileReel',
      type: 'text',
      label: 'Mobile reel embed URL (Vimeo only)',
      validate: validateVimeoLink,
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
