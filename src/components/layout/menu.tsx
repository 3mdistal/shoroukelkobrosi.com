'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Dialog from '@/components/ui/dialog'
import styles from './menu.module.css'
import FadeIn from '../ui/fade-in'

export default function Menu() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(!isHomepage)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isHomepage) {
      setIsScrolled(true)
      setIsHidden(false)
      return
    }

    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const menuReappearHeight = viewportHeight
      const movingUp = scrollPosition < lastScrollY

      if (scrollPosition < menuReappearHeight - 100) {
        setIsScrolled(false)
        setIsHidden(false)
      } else if (
        scrollPosition >= menuReappearHeight - 100 &&
        scrollPosition <= menuReappearHeight + 100
      ) {
        setIsHidden(true)
        setIsScrolled(movingUp)
      } else if (scrollPosition > menuReappearHeight + 100) {
        setIsScrolled(true)
        setIsHidden(false)
      }
      lastScrollY = scrollPosition
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomepage])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}
      >
        <div className={`${styles.logo} ${isScrolled ? styles.visible : ''}`}>Logo</div>
        <FadeIn duration={500}>
          <h1 className={`${styles.title} ${isScrolled ? styles.titleSmall : ''}`}>
            Anthropotpourri:
            {isScrolled ? ' ' : <br />}
            The Cinema of Shorouk Elkobrosi
          </h1>
        </FadeIn>
        <button
          className={`${styles.menuButton} ${isScrolled ? styles.visible : ''} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          Menu
        </button>
      </nav>
      <Dialog className={styles.fullPageMenu} isOpen={isMenuOpen}>
        <div className={styles.dialogContent}>
          <h2>
            <a href="/">Films</a>
          </h2>
          <h2>
            <a href="/stills">Stills</a>
          </h2>
          <h2>
            <a href="/blog">Blog</a>
          </h2>
          <h2>
            <a href="/about">About</a>
          </h2>
          <button className={styles.closeButton} onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </Dialog>
    </>
  )
}
