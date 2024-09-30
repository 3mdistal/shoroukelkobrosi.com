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
    const handleScroll = () => {
      if (reelRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const reelStartThreshold = windowHeight * 0.1 // Start earlier at 10% of viewport height
        const reelEndThreshold = windowHeight * 0.6 // End expansion at 60% of viewport height

        if (scrollPosition > reelStartThreshold && scrollPosition < reelEndThreshold) {
          const progress =
            (scrollPosition - reelStartThreshold) / (reelEndThreshold - reelStartThreshold)
          const scale = 1 + progress * 0.5 // Adjust the 0.5 to control the maximum scale
          reelRef.current.style.transform = `scale(${scale})`
        } else if (scrollPosition >= reelEndThreshold) {
          reelRef.current.style.transform = 'scale(1.5)' // Maximum scale
        } else {
          reelRef.current.style.transform = 'scale(1)' // Initial scale
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
