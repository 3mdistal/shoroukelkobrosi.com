import FilmShowcase from '@/components/homepage/film-showcase'
import styles from './page.module.css'
import { generateMetadata } from './page-metadata'
import HomeClient from '@/components/homepage/home-client'
import { getCachedHomepage } from '@/components/homepage/get-cached-homepage'

export { generateMetadata }

export default async function Home() {
  const homepage = await getCachedHomepage()

  return (
    <main className={styles.main}>
      <HomeClient reel={homepage.reel as string} mobileReel={homepage.mobileReel as string} />
      <FilmShowcase />
    </main>
  )
}
