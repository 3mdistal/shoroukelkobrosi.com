import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { AboutPage } from "@/payload-types";
// import styles from "./about-hero.module.css";

const getAboutPage = cache(
  async (): Promise<AboutPage> => {
    try {
      const payload: Payload = await getPayloadHMR({
        config: configPromise,
      });

      const aboutPage = await payload.findGlobal({
        slug: "about-page",
      });

      console.log("Fetched about page:", aboutPage);

      return aboutPage;
    } catch (error) {
      console.error("Error fetching about page:", error);
      throw error;
    }
  },
  ["about-page-cache"],
  {
    tags: ["about-page"],
  },
);

export default async function AboutHero(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const introHtml = aboutPage.intro_html;

  return (
    <div>
      <h1>About</h1>
      <div dangerouslySetInnerHTML={{ __html: introHtml ?? "" }} />
    </div>
  );
}
