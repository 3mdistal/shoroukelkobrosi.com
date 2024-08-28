import FilmShowcase from '@/components/homepage/film-showcase'
import Reel from '@/components/homepage/reel'
import styles from './page.module.css'

export default function Home(): React.ReactElement {
  return (
    <div className={styles.homepage}>
      <section className={styles.reelSection}>
        <Reel />
      </section>
      <section className={styles.showcaseSection}>
        <FilmShowcase />
      </section>
    </div>
  )
}
