import Image from 'next/image'
import getAboutPage from '@/components/about/get-about-page'
import type { Media } from '@/payload-types'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import styles from './about-professional-logos.module.css'

export default async function AboutProfessionalLogos(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage()
  const logos = aboutPage['professional-logos']

  return (
    <div className={styles.container}>
      {logos.map((logoItem) => {
        const logo = logoItem.logo as Media
        const { width, height } = getImageDimensions(logo)
        return (
          <div key={logo.id}>
            <Image src={createImageUrl(logo)} alt={logo.alt} width={width} height={height} />
          </div>
        )
      })}
    </div>
  )
}
