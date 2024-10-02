'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './menu.module.css'

interface MenuProps {
  title: string
}

export default function Menu({ title }: MenuProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const reelHeight = viewportHeight // Assuming the reel takes up the full viewport height

      if (scrollPosition > reelHeight) {
        // User has scrolled past the reel
        setIsScrolled(true)
      } else {
        // User hasn't scrolled past the reel yet
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.logo} ${isScrolled ? styles.visible : ''}`}>Logo</div>
        <h1 className={`${styles.title} ${isScrolled ? styles.titleSmall : ''}`}>{title}</h1>
        <button
          className={`${styles.menuButton} ${isScrolled ? styles.visible : ''} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          Menu
        </button>
      </nav>
      <dialog className={styles.fullPageMenu} open={isMenuOpen}>
        {/* ... existing dialog content ... */}
      </dialog>
    </>
  )
}
