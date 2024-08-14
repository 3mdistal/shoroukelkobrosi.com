import getAboutPage from "./get-about-page";

export default async function AboutPersonalIntro(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const introHtml = aboutPage["personal-intro_html"];

  return <div dangerouslySetInnerHTML={{ __html: introHtml ?? "" }} />;
}
