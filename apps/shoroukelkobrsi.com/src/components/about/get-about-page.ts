import { unstable_cache as cache } from 'next/cache'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Payload } from 'payload'
import configPromise from '@payload-config'
import type { About } from '@/payload-types'

const getAboutPage = cache(
  async (): Promise<About> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    })

    const aboutPage = await payload.findGlobal({
      slug: 'about',
    })

    return aboutPage
  },
  ['about-page-cache'],
  {
    tags: ['about-page'],
  },
)

export default getAboutPage
