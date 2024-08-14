import getAboutPage from "./get-about-page";

export default async function AboutProfessionalIntro(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const introHtml = aboutPage["professional-intro_html"];

  return <div dangerouslySetInnerHTML={{ __html: introHtml ?? "" }} />;
}
