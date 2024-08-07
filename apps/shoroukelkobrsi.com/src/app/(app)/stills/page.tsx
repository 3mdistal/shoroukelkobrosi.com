import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Still } from "@/payload-types";
import StillImageFrame from "@/components/still/still-image-frame";
import { shuffleArray } from "@/utilities/shuffle";
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
  const shuffledStills2 = shuffleArray(stills);

  return (
    <div className={styles.stillsPage}>
      <h1>Stills</h1>
      <div className={styles.masonryGrid}>
        {shuffledStills.map((still) => (
          <div key={still.id} className={styles.gridItem}>
            <StillImageFrame
              imageUrl={
                typeof still.image !== "number" ? (still.image.url ?? "") : ""
              }
              location={still.location}
              width={
                typeof still.image !== "number"
                  ? (still.image.width ?? 300)
                  : 300
              }
              height={
                typeof still.image !== "number"
                  ? (still.image.height ?? 200)
                  : 200
              }
            />
          </div>
        ))}
        {shuffledStills2.map((still) => (
          <div key={still.id} className={styles.gridItem}>
            <StillImageFrame
              imageUrl={
                typeof still.image !== "number" ? (still.image.url ?? "") : ""
              }
              location={still.location}
              width={
                typeof still.image !== "number"
                  ? (still.image.width ?? 300)
                  : 300
              }
              height={
                typeof still.image !== "number"
                  ? (still.image.height ?? 200)
                  : 200
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
