import { Link } from 'next-view-transitions'
import styles from './footer.module.css'

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSubGrid}>
          <nav className={styles.footerNav}>
            <p style={{ fontWeight: 'bold' }}>Explore</p>
            <Link href="/">Films</Link>
            <Link href="/about">About</Link>
            <Link href="/stills">Stills</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className={styles.footerSocial}>
            <p style={{ fontWeight: 'bold' }}>Get in touch</p>
            <a
              href="https://www.instagram.com/anthropotpourri"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="https://vimeo.com/shoroukelkobrosi" target="_blank" rel="noopener noreferrer">
              Vimeo
            </a>
            <a
              href="https://www.imdb.com/name/nm15338675"
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDb
            </a>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <p style={{ fontWeight: 'bold' }}>Legal</p>
          <Link href="/legal">
            &copy; {currentYear} Shorouk Elkobrosi.
            <br />
            All rights reserved.
          </Link>
        </div>
      </div>
    </footer>
  )
}
