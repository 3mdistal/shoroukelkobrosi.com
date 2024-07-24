import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";
import Link from "next/link";
import type { Payload } from "payload";
import configPromise from "@payload-config";
import type { Film } from "../payload-types";
import styles from "./film-showcase.module.css";

async function getFilms(): Promise<Film[]> {
  const payload: Payload = await getPayloadHMR({
    config: configPromise,
  });

  const response = await payload.find({
    collection: "films",
    where: {
      displayOnHomepage: {
        equals: true,
      },
    },
    sort: "-date",
  });

  return response.docs;
}

export default async function FilmShowcase(): Promise<React.ReactElement> {
  const films = await getFilms();

  return (
    <section className={styles.showcase}>
      <h2>Films</h2>
      {films.map((film) => (
        <Link
          href={`/films/${film.id.toString()}`}
          key={film.id}
          className={styles.film}
        >
          <div className={styles.filmInfo}>
            <h3>{film.title}</h3>
            <p>{new Date(film.date).getFullYear()}</p>
          </div>
          <div className={styles.stillsGrid}>
            {film.stills
              ?.filter((still) => still.featured)
              .map((still, index) => (
                <Image
                  key={index}
                  src={
                    typeof still.image === "object" && still.image.url
                      ? still.image.url
                      : "https://unplash.it/1600/900"
                  }
                  alt={`Still from ${film.title}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ))}
          </div>
        </Link>
      ))}
    </section>
  );
}
