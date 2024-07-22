// src/components/film-showcase.tsx
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import styles from "./film-showcase.module.css";

interface Film {
  id: string;
  title: string;
  date: string;
  stills: {
    image: { url: string };
    featured: boolean;
  }[];
  aspectRatio: string;
}

async function getFilms(): Promise<Film[]> {
  const payload = await getPayload({ config: configPromise });
  const films = await payload.find({
    collection: "films",
    where: {
      displayOnHomepage: {
        equals: true,
      },
    },
    sort: "-date",
  });

  return films.docs;
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
            className={`${styles.stillsGrid} ${styles[`aspect-${film.aspectRatio.replace(":", "-")}`]}`}
          >
            {film.stills
              .filter((still) => still.featured)
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
