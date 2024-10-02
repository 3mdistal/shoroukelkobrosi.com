'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'next-view-transitions'
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
        <div className={`${styles.logo} ${isScrolled ? styles.visible : ''}`}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 164 144"
            preserveAspectRatio="xMidYMid meet"
            style={{
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            <path
              d="M61.275,106.579c6.303,6.723 12.684,13.377 18.827,20.243c0.949,1.061 1.739,2.561 2.106,4.311c0.709,3.387 -0.132,4.742 3.734,4.649c8.213,-0.195 13.474,0.3 20.567,0c4.019,-0.169 7.983,1.697 11.672,0.682c-0.872,-9.508 1.33,-18.849 -1.517,-27.97c-0.991,-3.174 1.62,-5.243 1.467,-8.224c-0.389,-7.544 0.001,-15.124 -0.167,-22.684c-0.16,-7.19 -4.714,-11.898 -11.938,-11.926c-31.094,-0.118 -62.19,-0.055 -93.284,-0.024c-0.841,0.001 -1.681,0.394 -2.684,0.645c-0.151,1.207 -0.662,2.549 -0.412,3.729c1.919,9.056 -0.599,18.064 -0.151,27.119c0.437,8.803 0.114,17.644 0.084,26.468c-0.009,2.895 0.213,5.587 1.819,8.245c1.911,3.163 8.087,4.787 10.066,1.773c5.661,-8.625 14.78,-12.654 22.748,-18.275c5.205,-3.672 11.174,-6.324 16.082,-9.875c4.924,-3.563 10.971,-6.938 14.142,-12.793c0.548,-1.013 1.047,-2.256 1.978,-2.411c12.169,-2.04 20.286,-11.187 30.237,-17.097c1.301,-0.773 6.096,-3.976 7.357,-4.816"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M154.559,71.282c-1.035,3.932 -3.059,6.037 -7.497,7.188c-6.051,1.571 -11.209,5.669 -16.461,9.19c-1.449,0.971 -1.285,2.363 -1.265,3.792c0.039,2.731 -0.103,5.468 0.036,8.193c0.266,5.251 -2.18,11.721 0.935,15.486c4.733,5.721 12.423,8.311 19.236,11.564c0.431,0.206 1.234,-0.366 1.865,-0.576"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M74.511,90.191c-3.718,-3.553 -8.291,-3.964 -13.214,-4.587c-14.349,-1.817 -37.55,-3.505 -51.856,-5.692"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M22.196,134.943c3.615,0.703 7.906,0.852 12.607,0.838c12.184,-0.034 24.372,-0.034 36.556,0.001c4.377,0.012 8.394,-0.131 11.976,-0.701"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M152.038,77.585c1.694,3.163 1.95,6.566 1.919,10.085c-0.082,9.244 -0.018,18.489 -0.034,27.733c-0.005,2.996 0.45,6.065 -1.254,8.825c-1.95,3.163 1.5,4.982 1.89,7.563"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M115.481,107.21c-13.003,3.551 -26.148,6.751 -37.188,15.127"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M27.869,27.792c-4.831,2.382 -9.294,4.979 -9.484,11.344c-0.229,7.652 4.982,14.038 12.003,13.802c8.512,-0.285 12.69,-4.463 13.151,-12.545c0.415,-7.269 -5.41,-12.524 -13.149,-12.6c-0.63,-0.007 -1.261,-0.001 -1.891,-0.001"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
            <path
              d="M88.378,5.101c-11.662,1.276 -19.041,7.595 -22.046,18.913c-2.614,9.85 2.65,21.959 15.146,27.016c10.644,4.307 23.603,-1.588 28.96,-12.523c6.293,-12.849 -0.499,-28.148 -15.771,-32.731c-1.792,-0.538 -3.768,-0.465 -5.659,-0.675"
              style={{ fill: 'none', fillRule: 'nonzero', stroke: '#000', strokeWidth: '5px' }}
            />
          </svg>
        </div>
        <FadeIn duration={500}>
          <h1 className={`${styles.title} ${isScrolled ? styles.titleSmall : ''}`}>
            Anthropotpourri
            {isScrolled && ': '}
            {isScrolled ? (
              'The Cinema of Shorouk Elkobrsi'
            ) : (
              <span className={styles.subtitle}>The Cinema of Shorouk Elkobrosi</span>
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
