import Image from 'next/image'
import { Link } from 'next-view-transitions'
import type { Film } from '@/payload-types'
import AspectRatio from '@/components/ui/aspect-ratio'
import { formatSeasonYear } from '@/utilities/date-utils'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import styles from './film-showcase.module.css'
import { getCachedHomepage } from './get-cached-homepage'
import FadeIn from '@/components/ui/fade-in'

export default async function FilmShowcase(): Promise<React.ReactElement> {
  const homepage = await getCachedHomepage()

  if (!homepage.featuredFilms) {
    return <div />
  }

  const featuredFilms = homepage.featuredFilms as Film[]

  // Define sizes based on the grid layout
  const sizes = '(max-width: 768px) 100vw, 33vw'

  return (
    <div className={styles.showcase}>
      {featuredFilms.map((film) => (
        <FadeIn key={film.id} useIntersectionObserver intersectionMargin={'late'}>
          <Link href={`/films/${film.slug}`} className={styles.film}>
            <div className={styles.filmInfo}>
              <h2>{film.title}</h2>
              <div className={styles.filmMeta}>
                {film.date ? (
                  <span className={styles.filmDate}>{formatSeasonYear(film.date)}</span>
                ) : null}
                {film.producer ? (
                  <span className={styles.filmProducer}>{film.producer}</span>
                ) : null}
              </div>
            </div>
            <div className={styles.stillsGrid}>
              {film.stills
                ?.filter((still) => still.featured)
                .map((still) => {
                  const { width, height } = getImageDimensions(still.image)
                  return (
                    <div className={styles.gridCell} key={still.id}>
                      <AspectRatio ratio={16 / 9} className={styles.aspectRatioWrapper}>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={createImageUrl(still.image)}
                            alt={`Still from ${film.title}`}
                            width={width}
                            height={height}
                            sizes={sizes}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      </AspectRatio>
                    </div>
                  )
                })}
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  )
}
