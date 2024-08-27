import { Metadata } from 'next'
import { baseMetadata } from '@/components/base-metadata'
import AboutHeading from '@/components/about/about-heading'
import AboutPersonalIntro from '@/components/about/about-personal-intro'
import AboutProfessionalIntro from '@/components/about/about-professional-intro'
import AboutProfessionalLogos from '@/components/about/about-professional-logos'
import AboutPersonalPhoto from '@/components/about/about-personal-photo'
import AboutProfessionalPhoto from '@/components/about/about-professional-photo'
import AboutContentToggle from '@/components/about/about-content-toggle'

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'About - Anthropotpourri',
  description: 'Learn about Shorouk Elkobrosi and her cinematic work.',
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'About - Anthropotpourri',
    description: 'Learn about Shorouk Elkobrosi and her cinematic work.',
    url: 'https://shoroukelkobrosi.com/about',
  },
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
