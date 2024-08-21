import getAboutPage from "@/components/about/get-about-page";

export default async function AboutHeading(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const heading = aboutPage.heading;

  return <h1>{heading}</h1>;
}
