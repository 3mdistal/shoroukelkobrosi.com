'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './hero-section.module.css'
import Reel from '@/components/homepage/hero/reel/reel'
import SiteTitle from './site-title/site-title'

interface HomeClientProps {
  reel: string
  mobileReel: string
}

export default function HomeClient({ reel, mobileReel }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Calculate the scroll range for the animation
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 0 })
  const [scales, setScales] = useState({ outer: 0, inner: 0 })

  useEffect(() => {
    const updateScrollRange = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollPosition = window.scrollY
        const containerTop = rect.top + scrollPosition

        // Get the computed styles to read the CSS variables
        const computedStyle = getComputedStyle(containerRef.current)
        const initialOuterScale = parseFloat(
          computedStyle.getPropertyValue('--initial-outer-scale'),
        )
        const initialInnerScale = parseFloat(
          computedStyle.getPropertyValue('--initial-inner-scale'),
        )

        setScales({
          outer: initialOuterScale,
          inner: initialInnerScale,
        })

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
    [scales.outer, 1],
    { clamp: true },
  )

  const innerScale = useTransform(
    scrollY,
    [scrollRange.start, scrollRange.end],
    [scales.inner, 1],
    { clamp: true },
  )

  return (
    <div ref={containerRef} className={styles.homeClientContainer}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <SiteTitle />
      </motion.div>
      <motion.div
        className={styles.reelContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
      >
        <motion.div className={styles.reelContent} style={{ scale: outerScale }}>
          <motion.div className={styles.reelInner} style={{ scale: innerScale }}>
            <Reel desktopReel={reel} mobileReel={mobileReel} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
