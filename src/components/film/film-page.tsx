import Image from 'next/image'
import { Link } from 'next-view-transitions'
import type { Media } from '@/payload-types'
import AspectRatio from '@/components/ui/aspect-ratio'
import VimeoEmbed from '../ui/vimeo-embed'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import { getCachedFilm, getAllFilms } from '@/components/film/film-fetches'
import styles from './film-page.module.css'
import { formatSeasonYear } from '@/utilities/date-utils'

export default async function FilmPage({ slug }: { slug: string }): Promise<React.ReactElement> {
  const film = await getCachedFilm(slug)
  const films = await getAllFilms()
  const currentIndex = films.findIndex((film) => film.slug === slug)
  const prevFilm = currentIndex > 0 ? films[currentIndex - 1] : null
  const nextFilm = currentIndex < films.length - 1 ? films[currentIndex + 1] : null

  const adjacentFilms = {
    prev: prevFilm ? { title: prevFilm.title, slug: prevFilm.slug } : null,
    next: nextFilm ? { title: nextFilm.title, slug: nextFilm.slug } : null,
  }

  // Define sizes based on the grid layout
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <div className={styles.filmPageContainer}>
      <article className={styles.filmArticle}>
        {film.trailer && (
          <section className={styles.trailerSection} aria-labelledby="trailer-heading">
            <h2 id="trailer-heading" className="sr-only">
              Trailer
            </h2>
            <div className={styles.trailerContainer}>
              <VimeoEmbed url={film.trailer} filmTitle={film.title} />
            </div>
          </section>
        )}

        <header className={styles.filmHeader}>
          <h1 className={styles.filmTitle} tabIndex={-1}>
            {film.title}
          </h1>
          <p className={styles.filmDate}>{formatSeasonYear(film.date)}</p>
        </header>

        <section className={styles.filmDetails} aria-labelledby="film-details-heading">
          <h2 id="film-details-heading" className="sr-only">
            Film Details
          </h2>
          <dl className={styles.filmMetadata}>
            {film.director && (
              <div className={styles.metadataItem}>
                <dt>Dir</dt>
                <dd>{film.director}</dd>
              </div>
            )}
            {film.producer && (
              <div className={styles.metadataItem}>
                <dt>Prod</dt>
                <dd>{film.producer}</dd>
              </div>
            )}
            {film.format && (
              <div className={styles.metadataItem}>
                <dt>Format</dt>
                <dd>{film.format}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className={styles.stillsSection} aria-labelledby="stills-heading">
          <h2 id="stills-heading" className="sr-only">
            Film Stills
          </h2>
          <div className={styles.stillsGrid}>
            {film.stills?.map((still, index) => {
              const { width, height } = getImageDimensions(still.image)
              return (
                <div key={still.id} className={styles.stillContainer}>
                  <AspectRatio ratio={16 / 9} className={styles.stillAspectRatio}>
                    <div className={styles.stillImageWrapper}>
                      <Image
                        className={styles.stillImage}
                        src={createImageUrl(still.image)}
                        alt={`Still ${index + 1} from ${film.title}: ${(still.image as Media).alt || ''}`}
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
        </section>

        <nav className={styles.filmNavigation} aria-label="Film navigation">
          {adjacentFilms.prev ? (
            <Link href={`/films/${adjacentFilms.prev.slug}`} className={styles.prevFilmLink}>
              <span aria-hidden="true">Previous</span>
              <span className="sr-only">Previous film:</span>
              <span>{adjacentFilms.prev.title}</span>
            </Link>
          ) : null}
          {adjacentFilms.next ? (
            <Link href={`/films/${adjacentFilms.next.slug}`} className={styles.nextFilmLink}>
              <span aria-hidden="true">Next</span>
              <span className="sr-only">Next film:</span>
              <span>{adjacentFilms.next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </div>
  )
}
