import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { AboutPage } from "@/payload-types";
import styles from "./about-hero.module.css";

const getAboutPage = cache(
  async (): Promise<AboutPage> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    });

    const aboutPage = await payload.findGlobal({
      slug: "about-page",
    });

    return aboutPage;
  },
  ["about-page-cache"],
  {
    tags: ["about-page"],
  },
);
