import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache as cache } from 'next/cache'
import configPromise from '@payload-config'
import type { Homepage } from '@/payload-types'
import type { Payload } from 'payload'

export const getCachedHomepage = cache(
  async (): Promise<Homepage> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    })

    const homepage = await payload.findGlobal({
      slug: 'homepage',
    })

    return homepage
  },
  ['homepage-cache'],
  {
    tags: ['homepage'],
  },
)
