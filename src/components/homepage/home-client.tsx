'use client'

import { useEffect, useRef } from 'react'
import styles from './home-client.module.css'
import Reel from '@/components/homepage/reel'

interface HomeClientProps {
  reel: string
  mobileReel: string
  initialOuterScale?: number
  initialInnerScale?: number
}

export default function HomeClient({
  reel,
  mobileReel,
  initialOuterScale = 0.6,
  initialInnerScale = 1.5,
}: HomeClientProps) {
  const reelContentRef = useRef<HTMLDivElement>(null)
  const reelInnerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--initial-outer-scale', initialOuterScale.toString())
      containerRef.current.style.setProperty('--initial-inner-scale', initialInnerScale.toString())
    }
  }, [initialOuterScale, initialInnerScale])

  useEffect(() => {
    const handleScroll = () => {
      if (reelContentRef.current && reelInnerRef.current && containerRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerTop = containerRect.top + scrollPosition

        const reelStartThreshold = containerTop
        const reelEndThreshold = containerTop + windowHeight * 0.5

        if (scrollPosition < reelStartThreshold) {
          // Initial state
          reelContentRef.current.style.transform = `scale(${initialOuterScale})`
          reelInnerRef.current.style.transform = `scale(${initialInnerScale})`
        } else if (scrollPosition >= reelStartThreshold && scrollPosition < reelEndThreshold) {
          // Scaling up and uncropping
          const progress =
            (scrollPosition - reelStartThreshold) / (reelEndThreshold - reelStartThreshold)
          const scale = initialOuterScale + progress * (1 - initialOuterScale)
          const innerScale = initialInnerScale - progress * (initialInnerScale - 1)
          reelContentRef.current.style.transform = `scale(${scale})`
          reelInnerRef.current.style.transform = `scale(${innerScale})`
        } else {
          // Full size
          reelContentRef.current.style.transform = 'scale(1)'
          reelInnerRef.current.style.transform = 'scale(1)'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [initialOuterScale, initialInnerScale])

  return (
    <div ref={containerRef} className={styles.homeClientContainer}>
      <div className={styles.reelContainer}>
        <div ref={reelContentRef} className={styles.reelContent}>
          <div ref={reelInnerRef} className={styles.reelInner}>
            <Reel reel={reel} mobileReel={mobileReel} />
          </div>
        </div>
      </div>
    </div>
  )
}
