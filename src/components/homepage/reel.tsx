'use client'

import styles from './reel.module.css'
import { Suspense, useEffect, useState } from 'react'
import FadeIn from '../ui/fade-in'
import VimeoEmbed from '../ui/vimeo-embed'

interface ReelProps {
  reel: string
  mobileReel: string
}

export default function Reel({ reel, mobileReel }: ReelProps): React.ReactElement {
  const [currentReel, setCurrentReel] = useState(reel)

  useEffect(() => {
    const handleResize = () => {
      setCurrentReel(window.innerWidth <= 768 ? mobileReel : reel)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [reel, mobileReel])

  return (
    <div className={styles.reelContainer}>
      <Suspense>
        <FadeIn duration={1000} delay={1000}>
          <div className={styles.vimeoWrapper}>
            <VimeoEmbed url={currentReel} filmTitle={'Reel'} autoplay background />
          </div>
        </FadeIn>
      </Suspense>
    </div>
  )
}
