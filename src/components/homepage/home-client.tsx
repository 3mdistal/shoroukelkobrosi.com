'use client'

import { useEffect, useRef } from 'react'
import styles from '@/app/(app)/page.module.css'
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
        const reelExpansionThreshold = window.innerHeight * 0.3
        if (scrollPosition > reelExpansionThreshold) {
          reelRef.current.classList.add(styles.reelExpanded)
        } else {
          reelRef.current.classList.remove(styles.reelExpanded)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <h1 className={styles.title}>Anthropotpourri: The cinema of Shorouk Elkobrosi</h1>
      <div ref={reelRef} className={styles.reelContainer}>
        <Reel reel={reel} mobileReel={mobileReel} />
      </div>
    </>
  )
}
