import { createImageUrl } from '@/utilities/media'
import styles from './reel.module.css'
import { getCachedHomepage } from './get-cached-homepage'

export default async function Reel(): Promise<React.ReactElement> {
  const homepage = await getCachedHomepage()
  const reel = homepage.reel

  return (
    <div className={styles.reelContainer}>
      <video className={styles.reel} autoPlay muted loop>
        <source src={createImageUrl(reel)} type="video/mp4" />
      </video>
    </div>
  )
}
