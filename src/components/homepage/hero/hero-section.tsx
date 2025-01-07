'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './hero-section.module.css'
import Reel from '@/components/homepage/hero/reel/reel'

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
  initialInnerScale = 1.6,
}: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Calculate the scroll range for the animation
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 0 })

  useEffect(() => {
    const updateScrollRange = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollPosition = window.scrollY
        const containerTop = rect.top + scrollPosition
        setScrollRange({
          start: containerTop,
          end: containerTop + window.innerHeight * 0.5,
        })
      }
    }

    updateScrollRange()
    window.addEventListener('resize', updateScrollRange)
    return () => window.removeEventListener('resize', updateScrollRange)
  }, [])

  const outerScale = useTransform(
    scrollY,
    [scrollRange.start, scrollRange.end],
    [initialOuterScale, 1],
    { clamp: true },
  )

  const innerScale = useTransform(
    scrollY,
    [scrollRange.start, scrollRange.end],
    [initialInnerScale, 1],
    { clamp: true },
  )

  return (
    <div ref={containerRef} className={styles.homeClientContainer}>
      <div className={styles.reelContainer}>
        <motion.div className={styles.reelContent} style={{ scale: outerScale }}>
          <motion.div className={styles.reelInner} style={{ scale: innerScale }}>
            <Reel reel={reel} mobileReel={mobileReel} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
