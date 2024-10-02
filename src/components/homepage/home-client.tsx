'use client'

import { useEffect, useRef } from 'react'
import styles from './home-client.module.css'
import Reel from '@/components/homepage/reel'

interface HomeClientProps {
  reel: string
  mobileReel: string
}

export default function HomeClient({ reel, mobileReel }: HomeClientProps) {
  const reelContentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (reelContentRef.current && containerRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerTop = containerRect.top + scrollPosition

        const reelStartThreshold = containerTop
        const reelEndThreshold = containerTop + windowHeight * 0.5

        if (scrollPosition < reelStartThreshold) {
          // Initial state
          reelContentRef.current.style.transform = 'scale(0.6)'
        } else if (scrollPosition >= reelStartThreshold && scrollPosition < reelEndThreshold) {
          // Scaling up
          const progress =
            (scrollPosition - reelStartThreshold) / (reelEndThreshold - reelStartThreshold)
          const scale = 0.6 + progress * 0.4
          reelContentRef.current.style.transform = `scale(${scale})`
        } else {
          // Full size
          reelContentRef.current.style.transform = 'scale(1)'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className={styles.homeClientContainer}>
      <div className={styles.reelContainer}>
        <div ref={reelContentRef} className={styles.reelContent}>
          <Reel reel={reel} mobileReel={mobileReel} />
        </div>
      </div>
    </div>
  )
}
