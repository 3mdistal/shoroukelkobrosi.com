import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache as nextCache } from 'next/cache'
import { cache as reactCache } from 'react'
import configPromise from '@payload-config'
import type { Homepage } from '@/payload-types'
import type { Payload } from 'payload'

const getHomepageInner = reactCache(async (): Promise<Homepage> => {
  const payload: Payload = await getPayloadHMR({
    config: configPromise,
  })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  return homepage
})

export const getCachedHomepage = nextCache(
  async () => {
    const homepage = await getHomepageInner()
    console.log('Fetched homepage data:', homepage) // Remove in production
    return homepage
  },
  ['homepage-cache'],
  {
    tags: ['homepage'],
  },
)
