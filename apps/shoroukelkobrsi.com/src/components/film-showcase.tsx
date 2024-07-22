import { getPayload } from "payload";
import Image from "next/image";
import Link from "next/link";
import configPromise from "@payload-config";
import { type Film } from "../payload-types";
import styles from "./film-showcase.module.css";

async function getFilms(): Promise<Film[]> {
  const payload = await getPayload({ config: configPromise });
  const response = await payload.find({
    collection: "films",
    where: {
      displayOnHomepage: {
        equals: true,
      },
    },
    sort: "-date",
  });

  const films = response.docs.map((doc) => {
    if (
      typeof doc.title === "string" &&
      typeof doc.date === "string" &&
      typeof doc.updatedAt === "string" &&
      typeof doc.createdAt === "string"
    ) {
      return doc as Film;
    }
    throw new Error(`Invalid film: data: ${JSON.stringify(doc)}`);
  });

  return films;
}

export default async function FilmShowcase(): Promise<React.ReactElement> {
  const films = await getFilms();

  return (
    <section className={styles.showcase}>
      <h2>Films</h2>
      {films.map((film) => (
        <Link href={`/films/${film.id}`} key={film.id} className={styles.film}>
          <div className={styles.filmInfo}>
            <h3>{film.title}</h3>
            <p>{new Date(film.date).getFullYear()}</p>
          </div>
          <div
            className={`${styles.stillsGrid} ${styles[`aspect-${film.aspectRatio?.replace(":", "-")}`]}`}
          >
            {film.stills
              ?.filter((still) => still.featured)
              .map((still, index) => (
                <Image
                  key={index}
                  src={still.image.url}
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
