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
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight

        if (scrollPosition > 0 && !isScrolled) {
          setIsScrolled(true)
        } else if (scrollPosition === 0 && isScrolled) {
          setIsScrolled(false)
        }

        // Smooth transition for intermediate scroll positions
        if (scrollPosition < viewportHeight / 3) {
          const progress = scrollPosition / (viewportHeight / 3)
          const newHeight = Math.max(60, navHeight - progress * (navHeight - 60))
          navRef.current.style.height = `${newHeight}px`
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <h1 className={`${styles.title} ${isScrolled ? styles.smallTitle : styles.largeTitle}`}>
          {title}
        </h1>
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
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
