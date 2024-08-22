import getAboutPage from "./get-about-page";
import styles from "./about-intro.module.css";

export default async function AboutPersonalIntro(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const introHtml = aboutPage["personal-intro_html"];

  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: introHtml ?? "" }}
    />
  );
}
