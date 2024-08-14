import Image from "next/image";
import getAboutPage from "@/components/about/get-about-page";
import type { Media } from "@/payload-types";
import { createImageUrl } from "@/utilities/media";

export default async function AboutProfessionalLogos(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const logos = aboutPage["professional-logos"];

  return (
    <div>
      {logos.map((logoItem) => {
        const logo = logoItem.logo as Media;
        return (
          <Image
            key={logo.id}
            src={createImageUrl(logo)}
            alt={logo.alt}
            width={100}
            height={100}
          />
        );
      })}
    </div>
  );
}
