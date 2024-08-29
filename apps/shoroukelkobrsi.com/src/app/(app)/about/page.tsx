import { Metadata } from 'next'
import { baseMetadata } from '@/components/base-metadata'
import { createImageUrl } from '@/utilities/media'
import AboutHeading from '@/components/about/about-heading'
import AboutPersonalIntro from '@/components/about/about-personal-intro'
import AboutProfessionalIntro from '@/components/about/about-professional-intro'
import AboutProfessionalLogos from '@/components/about/about-professional-logos'
import AboutPersonalPhoto from '@/components/about/about-personal-photo'
import AboutProfessionalPhoto from '@/components/about/about-professional-photo'
import AboutContentToggle from '@/components/about/about-content-toggle'
import getAboutPage from '@/components/about/get-about-page'

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage()

  if (aboutPage['og-info'].length > 0) {
    return {
      ...baseMetadata,
      title: 'About - Anthropotpourri',
      description: aboutPage['og-info'][0].ogDescription,
      openGraph: {
        ...baseMetadata.openGraph,
        title: 'About - Anthropotpourri',
        description: aboutPage['og-info'][0].ogDescription,
        images: [
          {
            url: createImageUrl(aboutPage['og-info'][0].ogImage),
            width: 1200,
            height: 630,
            alt: 'Anthropotpourri',
          },
        ],
        url: `https://shoroukelkobrosi.com/about`,
      },
    }
  } else {
    return baseMetadata
  }
}

export default function AboutPage(): React.ReactElement {
  return (
    <AboutContentToggle
      aboutHeading={<AboutHeading />}
      personalIntro={<AboutPersonalIntro />}
      professionalIntro={<AboutProfessionalIntro />}
      personalPhoto={<AboutPersonalPhoto />}
      professionalPhoto={<AboutProfessionalPhoto />}
      professionalLogos={<AboutProfessionalLogos />}
    />
  )
}
