import AboutPersonalIntro from "@/components/about/about-personal-intro";
import AboutProfessionalIntro from "@/components/about/about-professional-intro";
import AboutProfessionalLogos from "@/components/about/about-professional-logos";
import AboutPersonalPhoto from "@/components/about/about-personal-photo";
import AboutProfessionalPhoto from "@/components/about/about-professional-photo";
import AboutContentToggle from "@/components/about/about-content-toggle";

export default function AboutPage(): React.ReactElement {
  return (
    <AboutContentToggle
      personalIntro={<AboutPersonalIntro />}
      professionalIntro={<AboutProfessionalIntro />}
      personalPhoto={<AboutPersonalPhoto />}
      professionalPhoto={<AboutProfessionalPhoto />}
      professionalLogos={<AboutProfessionalLogos />}
    />
  );
}
