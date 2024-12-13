import { createImageUrl } from '@/utilities/media'
import styles from './reel.module.css'
import { Suspense } from 'react'
import FadeIn from '../ui/fade-in'
import VimeoEmbed from '../ui/vimeo-embed'

interface ReelProps {
  reel: string
  mobileReel: string
}

export default function Reel({ reel, mobileReel }: ReelProps): React.ReactElement {
  return (
    <div className={styles.reelContainer}>
      <Suspense>
        <FadeIn duration={2000}>
          <div className={styles.vimeoWrapper}>
            <VimeoEmbed url={reel} filmTitle={'Reel'} autoplay background />
          </div>
          {/* <video className={styles.reel} autoPlay muted loop playsInline>
            <source src={createImageUrl(reel)} type="video/mp4" media="(min-width: 901px)" />
            <source src={createImageUrl(mobileReel)} type="video/mp4" media="(max-width: 900px)" />
          </video> */}
        </FadeIn>
      </Suspense>
    </div>
  )
}
