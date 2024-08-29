import FilmShowcase from '@/components/homepage/film-showcase'
import Reel from '@/components/homepage/reel'
import { Suspense } from 'react'
import { baseMetadata } from '@/components/base-metadata'
import type { Metadata } from 'next'
import { getCachedHomepage } from '@/components/homepage/get-cached-homepage'
import { createImageUrl } from '@/utilities/media'
import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getCachedHomepage()

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
}

export default function Home(): React.ReactElement {
  return (
    <div className={styles.homepage}>
      <section className={styles.reelSection}>
        <Reel />
      </section>
      <section className={styles.showcaseSection}>
        <Suspense fallback={<div>Loading...</div>}>
          <FilmShowcase />
        </Suspense>
      </section>
    </div>
  )
}
