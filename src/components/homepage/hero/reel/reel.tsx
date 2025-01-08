'use client'

import styles from './reel.module.css'
import { Suspense, useEffect, useState } from 'react'
import FadeIn from '@/components/ui/fade-in'
import VimeoEmbed from '@/components/ui/vimeo-embed'

interface ReelProps {
  desktopReel: string | null
  mobileReel: string | null
}

export default function Reel({ desktopReel, mobileReel }: ReelProps): React.ReactElement {
  const [currentVideo, setCurrentVideo] = useState(desktopReel)

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768
      setCurrentVideo(isMobile ? mobileReel : desktopReel)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [desktopReel, mobileReel])

  return (
    <Suspense>
      <FadeIn duration={1000} delay={1000}>
        <div className={styles.vimeoWrapper}>
          <VimeoEmbed url={currentVideo ?? ''} filmTitle="Reel" autoplay background />
        </div>
      </FadeIn>
    </Suspense>
  )
}
