'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from 'next-view-transitions'
import Dialog from '../ui/dialog'
import styles from './menu.module.css'

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const titleElement = document.querySelector('h1')
      if (titleElement) {
        const titleRect = titleElement.getBoundingClientRect()
        setIsMenuVisible(titleRect.top <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setTimeout(() => {
      handleCloseMenu()
      router.push(href)
    }, 0)
  }

  const handleOpenMenu = (): void => {
    setIsMenuOpen(true)
  }

  const handleCloseMenu = (): void => {
    setIsMenuOpen(false)
  }

  const menuItems = [
    { href: '/', label: 'Films' },
    { href: '/stills', label: 'Stills' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className={`${styles.menu} ${isMenuVisible ? styles.menuVisible : ''}`}>
      <button
        type="button"
        onClick={handleOpenMenu}
        className={styles.menuButton}
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
      >
        Menu
      </button>
      <Dialog isOpen={isMenuOpen} className={styles.fullPageMenu} onClose={handleCloseMenu}>
        <nav id="main-menu">
          <button
            type="button"
            onClick={handleCloseMenu}
            className={styles.closeButton}
            aria-label="Close menu"
          >
            &#x2715;
          </button>
          <ul>
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={handleLinkClick(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Dialog>
    </header>
  )
}

export default Menu
