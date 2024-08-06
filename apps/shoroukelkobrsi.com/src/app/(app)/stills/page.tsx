import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Still } from "@/payload-types";
import StillImageFrame from "@/components/still-image-frame";
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

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
              imageUrl={still.image.url}
              location={still.location}
              width={still.image.width || 300}
              height={still.image.height || 200}
            />
          </div>
        ))}
        {shuffledStills2.map((still) => (
          <div key={still.id} className={styles.gridItem}>
            <StillImageFrame
              imageUrl={still.image.url}
              location={still.location}
              width={still.image.width || 300}
              height={still.image.height || 200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
