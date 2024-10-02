'use client'

import React, { useState, useEffect, useRef } from 'react'
import Dialog from '@/components/ui/dialog'
import styles from './menu.module.css'

export default function Menu() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
  }, [])

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
        <h1 className={`${styles.title} ${isScrolled ? styles.titleSmall : ''}`}>
          Anthropotpourri:
          {isScrolled ? ' ' : <br />}
          The Cinema of Shorouk Elkobrosi
        </h1>
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
            Close
          </button>
        </div>
      </Dialog>
    </>
  )
}
