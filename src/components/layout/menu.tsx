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
  const [isFullyScrolled, setIsFullyScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [titleOpacity, setTitleOpacity] = useState(1)
  const navRef = useRef<HTMLElement>(null)

  // Adjust this value to control the scroll animation speed (lower = faster)
  const SCROLL_ANIMATION_DURATION = 0 // in milliseconds

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    const handleScroll = () => {
      if (navRef.current) {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight
        const maxScroll = viewportHeight / 3

        const newIsScrolled = scrollPosition > 0
        setIsScrolled(newIsScrolled)

        // Smooth transition for intermediate scroll positions
        const progress = Math.min(scrollPosition / maxScroll, 1)
        const startHeight = 33.33
        const endHeight = (60 / viewportHeight) * 100
        const newHeight = startHeight - (startHeight - endHeight) * progress
        const newFontSize = isMobile
          ? 1.5 - (1.5 - 0.875) * progress // Start at 1.5rem and shrink to 0.875rem on mobile
          : 3 - (3 - 1.25) * progress // Keep existing behavior for non-mobile

        navRef.current.style.setProperty('--nav-height', `${newHeight}vh`)
        navRef.current.style.setProperty('--title-font-size', `${newFontSize}rem`)
        navRef.current.style.setProperty('--background-opacity', (progress * 0.5).toString())
        navRef.current.style.setProperty('transition', `all ${SCROLL_ANIMATION_DURATION}ms ease`)

        // Fade out title on mobile
        if (isMobile) {
          setTitleOpacity(1 - progress)
        }

        // Show logo and menu button when nav is at its smallest size
        const isFullyScrolled = progress === 1
        setIsMenuButtonVisible(isFullyScrolled)
        setIsFullyScrolled(isFullyScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Initial checks
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
      <nav
        ref={navRef}
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} ${isFullyScrolled ? styles.fullyScrolled : ''}`}
      >
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
