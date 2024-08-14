import Image from "next/image";
import getAboutPage from "@/components/about/get-about-page";
import { getImageDimensions, createImageUrl } from "@/utilities/media";

export default async function AboutPersonalPhoto(): Promise<React.ReactElement> {
  const aboutPage = await getAboutPage();
  const image = aboutPage["professional-photo"];
  const { width, height } = getImageDimensions(image);

  return (
    <Image
      src={createImageUrl(image)}
      alt="Professional Image"
      width={width}
      height={height}
    />
  );
}
