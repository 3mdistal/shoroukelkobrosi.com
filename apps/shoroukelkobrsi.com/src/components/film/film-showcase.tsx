import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";
import { Link } from "next-view-transitions";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Film, Homepage } from "@/payload-types";
import AspectRatio from "@/components/ui/aspect-ratio";
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

function getSeason(date: Date): string {
  const month = date.getMonth();
  switch (month) {
    case 2:
    case 3:
    case 4:
      return "Spring";
    case 5:
    case 6:
    case 7:
      return "Summer";
    case 8:
    case 9:
    case 10:
      return "Autumn";
    default:
      return "Winter";
  }
}

function formatSeasonYear(dateString: string): string {
  const date = new Date(dateString);
  const season = getSeason(date);
  const year = date.getFullYear().toString();
  return `${season} ${year}`;
}

export default async function FilmShowcase(): Promise<React.ReactElement> {
  const homepage = await getCachedHomepage();

  if (!homepage.featuredFilms) {
    return <div />;
  }

  const featuredFilms = homepage.featuredFilms as Film[];

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
              .map((still) => (
                <div className={styles.gridCell} key={still.id}>
                  <AspectRatio
                    ratio={16 / 9}
                    className={styles.aspectRatioWrapper}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={
                          typeof still.image === "object" && still.image.url
                            ? still.image.url
                            : "https://unplash.it/1600/900"
                        }
                        alt={`Still from ${film.title}`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </AspectRatio>
                </div>
              ))}
          </div>
        </Link>
      ))}
    </section>
  );
}
