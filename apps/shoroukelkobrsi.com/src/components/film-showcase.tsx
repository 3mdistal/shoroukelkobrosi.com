import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";
import Link from "next/link";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Film, Homepage } from "@/payload-types";
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
      <h2>Films</h2>
      {featuredFilms.map((film) => (
        <Link
          href={`/films/${film.slug}`}
          key={film.id}
          className={styles.film}
        >
          <div>
            <h3>{film.title}</h3>
            <p>{formatSeasonYear(film.date)}</p>
          </div>
          <div className={styles.stillsGrid}>
            {film.stills
              ?.filter((still) => still.featured)
              .map((still) => (
                <div className={styles.gridCell} key={still.id}>
                  <Image
                    src={
                      typeof still.image === "object" && still.image.url
                        ? still.image.url
                        : "https://unplash.it/1600/900"
                    }
                    alt={`Still from ${film.title}`}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
              ))}
          </div>
        </Link>
      ))}
    </section>
  );
}
