import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";
import { Link } from "next-view-transitions";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Film, Homepage } from "@/payload-types";
import AspectRatio from "@/components/ui/aspect-ratio";
import { formatSeasonYear } from "@/utilities/date-utils";
import { createImageUrl, getImageDimensions } from "@/utilities/media";
import styles from "./film-showcase.module.css";

const getCachedHomepage = cache(
  async (): Promise<Homepage> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    });

    const homepage = await payload.findGlobal({
      slug: "homepage",
    });

    return homepage;
  },
  ["homepage-cache"],
  {
    tags: ["homepage"],
  },
);

export default async function FilmShowcase(): Promise<React.ReactElement> {
  const homepage = await getCachedHomepage();

  if (!homepage.featuredFilms) {
    return <div />;
  }

  const featuredFilms = homepage.featuredFilms as Film[];

  // Define sizes based on the grid layout
  const sizes = "(max-width: 768px) 100vw, 33vw";

  return (
    <section className={styles.showcase}>
      {featuredFilms.map((film) => (
        <Link
          href={`/films/${film.slug}`}
          key={film.id}
          className={styles.film}
        >
          <div className={styles.filmInfo}>
            <h2>{film.title}</h2>
            <div className={styles.filmMeta}>
              {film.date ? (
                <span className={styles.filmDate}>
                  {formatSeasonYear(film.date)}
                </span>
              ) : null}
              {film.producer ? (
                <span className={styles.filmProducer}>{film.producer}</span>
              ) : null}
            </div>
          </div>
          <div className={styles.stillsGrid}>
            {film.stills
              ?.filter((still) => still.featured)
              .map((still) => {
                const { width, height } = getImageDimensions(still.image);
                return (
                  <div className={styles.gridCell} key={still.id}>
                    <AspectRatio
                      ratio={16 / 9}
                      className={styles.aspectRatioWrapper}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={createImageUrl(still.image)}
                          alt={`Still from ${film.title}`}
                          width={width}
                          height={height}
                          sizes={sizes}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </AspectRatio>
                  </div>
                );
              })}
          </div>
        </Link>
      ))}
    </section>
  );
}
