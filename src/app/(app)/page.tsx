import FilmShowcase from '@/components/homepage/showcase/film-showcase'
import styles from './page.module.css'
import { generateMetadata } from './page-metadata'
import HomeClient from '@/components/homepage/hero/hero-section'
import { getCachedHomepage } from '@/components/homepage/utils/get-cached-homepage'

export { generateMetadata }

export default async function Home() {
  const homepage = await getCachedHomepage()

  return (
    <main className={styles.main}>
      <HomeClient reel={homepage.reel as string} mobileReel={homepage.mobileReel as string} />
      <section className={styles.showcaseSection}>
        <FilmShowcase />
      </section>
    </main>
  )
}
