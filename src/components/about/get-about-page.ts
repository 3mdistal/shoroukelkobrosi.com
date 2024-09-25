import { unstable_cache as nextCache } from 'next/cache'
import { cache as reactCache } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Payload } from 'payload'
import configPromise from '@payload-config'
import type { AboutPage } from '@/payload-types'

const getAboutPageInner = reactCache(async (): Promise<AboutPage> => {
  const payload: Payload = await getPayloadHMR({
    config: configPromise,
  })

  const aboutPage = await payload.findGlobal({
    slug: 'about-page',
  })

  return aboutPage
})

const getAboutPage = nextCache(getAboutPageInner, ['about-page-cache'], {
  tags: ['about-page'],
})

export default getAboutPage
