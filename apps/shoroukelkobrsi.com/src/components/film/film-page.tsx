import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Payload } from 'payload'
import { unstable_cache as cache } from 'next/cache'
import Image from 'next/image'
import configPromise from '@payload-config'
import type { Film } from '@/payload-types'
import AspectRatio from '@/components/ui/aspect-ratio'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import type { FilmsList } from '@/app/api/films/route'
import { getURL } from '@/utilities/get-url'
import styles from './film-page.module.css'

const getCachedFilm = (slug: string): Promise<Film> =>
  cache(
    async () => {
      const payload: Payload = await getPayloadHMR({
        config: configPromise,
      })

      const response = await payload.find({
        collection: 'films',
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      return response.docs[0]
    },
    ['film-cache', slug],
    {
      tags: [`film-${slug}`],
    },
  )()

const getAllFilms = cache(
  async (): Promise<FilmsList> => {
    const response = await fetch(`${getURL()}/api/films`, {
      next: { tags: ['films'] },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch films')
    }
    return response.json()
  },
  ['all-films'],
  {
    tags: ['films'],
  },
)

export default async function FilmPage({ slug }: { slug: string }): Promise<React.ReactElement> {
  const film = await getCachedFilm(slug)
  const films = await getAllFilms()
  console.log(films)

  // Define sizes based on the grid layout
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <div className={styles.filmPage}>
      <h1>{film.title}</h1>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Date: {new Date(film.date).toLocaleDateString()}</p>
      {film.trailer ? (
        <div className={styles.trailerEmbed}>
          <iframe src={film.trailer} title={`${film.title} trailer`} />
        </div>
      ) : null}
      <div className={styles.stillsGrid}>
        {film.stills?.map((still) => {
          const { width, height } = getImageDimensions(still.image)
          return (
            <div key={still.id} className={styles.gridCell}>
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
    </div>
  )
}
