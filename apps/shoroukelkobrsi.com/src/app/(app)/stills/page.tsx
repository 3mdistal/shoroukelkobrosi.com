import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Still } from "@/payload-types";
import StillImageFrame from "@/components/still/still-image-frame";
import { shuffleArray } from "@/utilities/shuffle";
import { createImageUrl, getImageDimensions } from "@/utilities/media";
import styles from "./stills.module.css";

const getCachedStills = cache(
  async (): Promise<Still[]> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    });

    const stills = await payload.find({
      collection: "stills",
    });

    return stills.docs;
  },
  ["stills-cache"],
  {
    tags: ["stills"],
  },
);

export default async function StillsPage(): Promise<React.ReactElement> {
  const stills = await getCachedStills();
  const shuffledStills = shuffleArray(stills);

  return (
    <div className={styles.stillsPage}>
      <h1>Stills</h1>
      <div className={styles.masonryGrid}>
        {shuffledStills.map((still) => {
          const { width, height } = getImageDimensions(still.image);
          return (
            <div key={still.id} className={styles.gridItem}>
              <StillImageFrame
                imageUrl={createImageUrl(still.image)}
                location={still.location}
                width={width}
                height={height}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
