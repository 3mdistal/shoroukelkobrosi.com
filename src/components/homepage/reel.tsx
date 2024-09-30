import { createImageUrl } from '@/utilities/media'
import styles from './reel.module.css'
import { getCachedHomepage } from './get-cached-homepage'
import { Suspense } from 'react'
import FadeIn from '../ui/fade-in'

export default async function Reel(): Promise<React.ReactElement> {
  const homepage = await getCachedHomepage()
  const reel = homepage.reel
  const mobileReel = homepage.mobileReel

  return (
    <div className={styles.reelContainer}>
      <Suspense>
        <FadeIn duration={3000}>
          <video className={styles.reel} autoPlay muted loop playsInline>
            <source src={createImageUrl(reel)} type="video/mp4" media="(min-width: 901px)" />
            <source src={createImageUrl(mobileReel)} type="video/mp4" media="(max-width: 900px)" />
          </video>
        </FadeIn>
      </Suspense>
    </div>
  )
}
