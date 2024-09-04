import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Payload } from 'payload'
import { unstable_cache as nextCache } from 'next/cache'
import { cache as reactCache } from 'react'
import configPromise from '@payload-config'
import type { Film } from '@/payload-types'
import { getURL } from '@/utilities/get-url'

const getCachedFilmInner = reactCache(async (slug: string): Promise<Film> => {
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
})

export const getCachedFilm = (slug: string): Promise<Film> =>
  nextCache(() => getCachedFilmInner(slug), ['film-cache', slug], {
    tags: [`film-${slug}`],
  })()

const getAllFilmsInner = reactCache(async () => {
  const response = await fetch(`${getURL()}/fetch/films-list`, {
    next: { tags: ['films'] },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch films')
  }
  return response.json() as Promise<Array<Pick<Film, 'title' | 'slug'>>>
})

export const getAllFilms = nextCache(getAllFilmsInner, ['all-films'], {
  tags: ['films'],
})
