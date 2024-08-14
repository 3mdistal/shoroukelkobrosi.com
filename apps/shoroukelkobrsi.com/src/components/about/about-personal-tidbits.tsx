import Image from "next/image";
import type { AboutPage } from "@/payload-types";
import getAboutPage from "./get-about-page";

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
        {imageUrl ? (
          <Image src={imageUrl} alt={tidbit.header} width={100} height={100} />
        ) : null}
      </div>
    </>
  );
}
