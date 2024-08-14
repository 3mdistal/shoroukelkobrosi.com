import AboutHero from "@/components/about/about-hero";
import AboutPersonalTidbits from "@/components/about/about-personal-tidbits";
// import styles from "./about.module.css";

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <AboutHero />
      <AboutPersonalTidbits />
    </>
  );
}
