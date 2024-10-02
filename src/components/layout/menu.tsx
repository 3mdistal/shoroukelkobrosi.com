'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './menu.module.css'

interface MenuProps {
  title: string
}

export default function Menu({ title }: MenuProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuButtonVisible, setIsMenuButtonVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [titleOpacity, setTitleOpacity] = useState(1)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    const handleScroll = () => {
      if (navRef.current) {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight
        const reelHeight = viewportHeight // Assuming the reel takes up the full viewport height

        if (scrollPosition > reelHeight) {
          // User has scrolled past the reel
          setIsScrolled(true)
          const progress = Math.min((scrollPosition - reelHeight) / (viewportHeight / 3), 1)
          const newFontSize = isMobile ? 1.5 - (1.5 - 0.875) * progress : 3 - (3 - 1.25) * progress

          navRef.current.style.setProperty('--title-font-size', `${newFontSize}rem`)
          navRef.current.style.setProperty('--background-opacity', (progress * 0.5).toString())

          setIsMenuButtonVisible(progress === 1)
          setTitleOpacity(isMobile ? 1 - progress : 1)
        } else {
          // User hasn't scrolled past the reel yet
          setIsScrolled(false)
          setIsMenuButtonVisible(false)
          setTitleOpacity(1)
          navRef.current.style.setProperty('--title-font-size', isMobile ? '1.5rem' : '3rem')
          navRef.current.style.setProperty('--background-opacity', '0')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    handleResize()
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.logo} ${isMenuButtonVisible || isMobile ? styles.visible : ''}`}>
          Logo
        </div>
        <h1 className={styles.title} style={{ opacity: isMobile ? titleOpacity : 1 }}>
          {title}
        </h1>
        <button
          className={`${styles.menuButton} ${isMenuButtonVisible || isMobile ? styles.visible : ''} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          Menu
        </button>
      </nav>
      <dialog className={styles.fullPageMenu} open={isMenuOpen}>
        <button className={styles.closeButton} onClick={toggleMenu}>
          ×
        </button>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </dialog>
    </>
  )
}
