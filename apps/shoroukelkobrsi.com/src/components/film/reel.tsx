import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache as cache } from 'next/cache'
import configPromise from '@payload-config'
import type { Homepage } from '@/payload-types'
import type { Payload } from 'payload'
import { createImageUrl } from '@/utilities/media'
import styles from './reel.module.css'

const getCachedHomepage = cache(
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

export default async function Reel(): Promise<React.ReactElement> {
  const homepage = await getCachedHomepage()
  const reel = homepage.reel

  return (
    <div className={styles.reelContainer}>
      <video className={styles.reel} autoPlay muted loop>
        <source src={createImageUrl(reel)} type="video/mp4" />
      </video>
    </div>
  )
}
