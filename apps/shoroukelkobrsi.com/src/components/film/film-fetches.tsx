import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Payload } from 'payload'
import { unstable_cache as cache } from 'next/cache'
import configPromise from '@payload-config'
import type { Film } from '@/payload-types'
import { getURL } from '@/utilities/get-url'

export const getCachedFilm = (slug: string): Promise<Film> =>
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

export const getAllFilms = cache(
  async () => {
    const response = await fetch(`${getURL()}/fetch/films-list`, {
      next: { tags: ['films'] },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch films')
    }
    return response.json() as Promise<Array<Pick<Film, 'title' | 'slug'>>>
  },
  ['all-films'],
  {
    tags: ['films'],
  },
)
