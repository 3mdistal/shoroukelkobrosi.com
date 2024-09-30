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
  const navRef = useRef<HTMLElement>(null)

  // Adjust this value to control the scroll animation speed (lower = faster)
  const SCROLL_ANIMATION_DURATION = 0 // in milliseconds

  useEffect(() => {
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
        const newFontSize = 3 - (3 - 1.25) * progress

        navRef.current.style.setProperty('--nav-height', `${newHeight}vh`)
        navRef.current.style.setProperty('--title-font-size', `${newFontSize}rem`)
        navRef.current.style.setProperty('transition', `all ${SCROLL_ANIMATION_DURATION}ms ease`)

        // Only show menu button when nav is at its smallest size
        setIsMenuButtonVisible(progress === 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <h1 className={styles.title}>{title}</h1>
        <button
          className={`${styles.menuButton} ${isMenuButtonVisible ? styles.menuButtonVisible : ''} ${isMenuOpen ? styles.open : ''}`}
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
