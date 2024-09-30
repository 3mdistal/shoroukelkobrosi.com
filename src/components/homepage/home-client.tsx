'use client'

import { useEffect, useRef } from 'react'
import styles from './home-client.module.css'
import Reel from '@/components/homepage/reel'

interface HomeClientProps {
  reel: string
  mobileReel: string
}

export default function HomeClient({ reel, mobileReel }: HomeClientProps) {
  const reelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial scale
    if (reelRef.current) {
      reelRef.current.style.transform = 'scale(0.6)'
    }

    const handleScroll = () => {
      if (reelRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const reelStartThreshold = windowHeight * -0.2 // Start earlier at 10% of viewport height
        const reelEndThreshold = windowHeight * 0.3 // End expansion at 30% of viewport height

        if (scrollPosition > reelStartThreshold && scrollPosition < reelEndThreshold) {
          const progress =
            (scrollPosition - reelStartThreshold) / (reelEndThreshold - reelStartThreshold)
          const scale = 0.6 + progress * 0.4 // Scale from 0.6 to 1
          reelRef.current.style.transform = `scale(${scale})`
        } else if (scrollPosition >= reelEndThreshold) {
          reelRef.current.style.transform = 'scale(1)' // Maximum scale
        } else {
          reelRef.current.style.transform = 'scale(0.6)' // Initial scale
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.homeClientContainer}>
      <div ref={reelRef} className={styles.reelContainer}>
        <Reel reel={reel} mobileReel={mobileReel} />
      </div>
    </div>
  )
}
