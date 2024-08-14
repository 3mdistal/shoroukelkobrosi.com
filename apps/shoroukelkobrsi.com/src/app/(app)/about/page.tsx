import AboutPersonalIntro from "@/components/about/about-personal-intro";
import AboutProfessionalIntro from "@/components/about/about-professional-intro";
import AboutProfessionalLogos from "@/components/about/about-professional-logos";
import AboutPersonalPhoto from "@/components/about/about-personal-photo";
import AboutProfessionalPhoto from "@/components/about/about-professional-photo";

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <AboutPersonalIntro />
      <AboutProfessionalIntro />
      <AboutProfessionalLogos />
      <AboutPersonalPhoto />
      <AboutProfessionalPhoto />
    </>
  );
}
