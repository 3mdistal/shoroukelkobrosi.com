import getAboutPage from "./get-about-page";
import styles from "./about-hero.module.css";

export default async function AboutHero(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const introHtml = aboutPage.intro_html;

  return (
    <div>
      <h1>About</h1>
      <div
        className={styles.intro}
        dangerouslySetInnerHTML={{ __html: introHtml ?? "" }}
      />
      <p>
        <b>Placeholder for professional/personal toggle.</b>
      </p>
    </div>
  );
}
