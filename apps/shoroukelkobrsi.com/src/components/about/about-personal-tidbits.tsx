import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import Image from "next/image";
import configPromise from "@payload-config";
import type { AboutPage } from "@/payload-types";

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

export default async function AboutPersonalTidbits(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const tidbits = aboutPage["personal-tidbits"];

  return (
    <div>
      {tidbits
        ? tidbits.map((tidbit) => <Tidbit key={tidbit.id} tidbit={tidbit} />)
        : null}
    </div>
  );
}

function Tidbit({
  tidbit,
}: {
  tidbit: NonNullable<AboutPage["personal-tidbits"]>[number];
}): React.ReactElement {
  const imageUrl = typeof tidbit.image === "object" ? tidbit.image.url : "";

  return (
    <>
      <div className="text">
        <h2>{tidbit.header}</h2>
        <div dangerouslySetInnerHTML={{ __html: tidbit.body_html ?? "" }} />
      </div>
      <div className="image">
        <Image src={imageUrl} alt={tidbit.header} />
      </div>
    </>
  );
}
