import getAboutPage from "./get-about-page";
import styles from "./about-intro.module.css";

export default async function AboutProfessionalIntro(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const introHtml = aboutPage["professional-intro_html"];

  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: introHtml ?? "" }}
    />
  );
}
