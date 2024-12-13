'use client'

import React, { useState, useEffect } from 'react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import FadeIn from '../ui/fade-in'
import styles from './site-title.module.css'

export default function SiteTitle() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(!isHomepage)

  useEffect(() => {
    if (!isHomepage) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const menuReappearHeight = viewportHeight

      if (scrollPosition < menuReappearHeight - 100) {
        setIsScrolled(false)
      } else {
        setIsScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomepage])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.logo} ${isScrolled ? styles.visible : ''}`}>
        <Link href="/">
          <Image src="/logo2.webp" alt="Anthropotpourri" width={80} height={80} />
        </Link>
      </div>
      {/* <FadeIn duration={500}> */}
      {!isScrolled && (
        <div className={styles.logoBig}>
          <Image src="/logo2.webp" alt="Anthropotpourri" width={800} height={800} />
        </div>
      )}
      <h1 className={`${styles.title} ${isScrolled ? styles.titleSmall : ''}`}>
        Anthropotpourri
        {isScrolled && ': '}
        {isScrolled ? (
          'The Cinematography of Shorouk Elkobrosi'
        ) : (
          <span className={styles.subtitle}>The Cinematography of Shorouk Elkobrosi</span>
        )}
      </h1>
      {/* </FadeIn> */}
    </header>
  )
}
