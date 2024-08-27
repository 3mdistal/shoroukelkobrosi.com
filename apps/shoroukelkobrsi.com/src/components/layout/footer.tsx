import { Link } from 'next-view-transitions'
import styles from './footer.module.css'

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p>&copy; 2024 Shorouk Elkobrosi. All rights reserved.</p>
        </div>
        <nav className={styles.footerNav}>
          <Link href="/legal">Legal</Link>
          <Link href="/about">About</Link>
          <Link href="/stills">Stills</Link>
        </nav>
        <div className={styles.footerRight}>
          <a
            href="https://www.instagram.com/anthropotpourri"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="https://vimeo.com/shoroukelkobrsi" target="_blank" rel="noopener noreferrer">
            Vimeo
          </a>
        </div>
      </div>
    </footer>
  )
}
