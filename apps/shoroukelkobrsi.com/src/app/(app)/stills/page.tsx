import type { Metadata } from 'next'
import type { Payload } from 'payload'
import type { StillsPage } from '@/payload-types'
import { unstable_cache as cache } from 'next/cache'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import StillImageFrame from '@/components/still/still-image-frame'
import { baseMetadata } from '@/components/base-metadata'
import { shuffleArray } from '@/utilities/shuffle'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import styles from './stills.module.css'

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Stills - Anthropotpourri',
  description: 'Photography by Shorouk Elkobrosi.',
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'About - Anthropotpourri',
    description: 'Learn about Shorouk Elkobrosi and her cinematic work.',
    url: 'https://shoroukelkobrosi.com/about',
  },
}

const getCachedStills = cache(
  async (): Promise<StillsPage> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    })

    const stills = await payload.findGlobal({
      slug: 'stills-page',
    })

    return stills
  },
  ['stills-cache'],
  {
    tags: ['stills'],
  },
)

export default async function StillsPage(): Promise<React.ReactElement> {
  const stillsPage = await getCachedStills()
  const stills = stillsPage.stills
  const shuffledStills = shuffleArray(stills)

  // Define the sizes based on the masonry grid layout
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <div className={styles.stillsPage}>
      <h1>Stills</h1>
      <div className={styles.masonryGrid}>
        {shuffledStills.map((still) => {
          const { width, height } = getImageDimensions(still.still)
          return (
            <div key={still.id} className={styles.gridItem}>
              <StillImageFrame
                imageUrl={createImageUrl(still.still)}
                location={still.location ? still.location : ''}
                width={width}
                height={height}
                sizes={sizes}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
