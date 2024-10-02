'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Dialog from '@/components/ui/dialog'
import FadeIn from '../ui/fade-in'
import styles from './menu.module.css'

export default function Menu() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)

  const isHomepage = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(!isHomepage)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Films' },
    { href: '/stills', label: 'Stills' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setIsMenuOpen(false)
      router.push(href)
    }, 0)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}
      >
        {!isScrolled && (
          <div className={styles.navBackground}>
            <Image
              src="/heroimage.webp"
              alt="Navigation background"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className={`${styles.logo} ${isScrolled ? styles.visible : ''}`}>
          <Link href="/">
            <Image src="/logo2.webp" alt="Anthropotpourri" width={80} height={80} />
          </Link>
        </div>
        <FadeIn duration={500}>
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
        </FadeIn>
        <button
          className={`${styles.menuButton} ${isScrolled ? styles.visible : ''} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
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
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>
      <Dialog className={styles.fullPageMenu} isOpen={isMenuOpen}>
        <nav id="main-menu">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className={styles.closeButton}
            aria-label="Close menu"
          >
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
    </>
  )
}
