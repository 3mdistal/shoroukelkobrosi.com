import { baseMetadata } from '@/components/base-metadata'
import type { Metadata } from 'next'
import { getCachedHomepage } from '@/components/homepage/utils/get-cached-homepage'
import { createImageUrl } from '@/utilities/media'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getCachedHomepage()

  if (homepage['og-info'].length > 0) {
    return {
      ...baseMetadata,
      description: homepage['og-info'][0].ogDescription,
      openGraph: {
        ...baseMetadata.openGraph,
        description: homepage['og-info'][0].ogDescription,
        images: [
          {
            url: createImageUrl(homepage['og-info'][0].ogImage),
            width: 1200,
            height: 630,
            alt: 'Anthropotpourri',
          },
        ],
        url: `https://shoroukelkobrosi.com`,
      },
    }
  } else {
    return baseMetadata
  }
}
