import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Film } from "@/payload-types";
import styles from "./film-page.module.css";

const getCachedFilm = (slug: string): Promise<Film> =>
  cache(
    async () => {
      const payload: Payload = await getPayloadHMR({
        config: configPromise,
      });

      const response = await payload.find({
        collection: "films",
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      return response.docs[0];
    },
    ["film-cache", slug],
    {
      tags: [`film-${slug}`],
    },
  )();

export default async function FilmPage({
  slug,
}: {
  slug: string;
}): Promise<React.ReactElement> {
  const film = await getCachedFilm(slug);

  return (
    <div className={styles.filmPage}>
      <h1>{film.title}</h1>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Date: {new Date(film.date).toLocaleDateString()}</p>
      {film.trailer ? (
        <div className={styles.trailerEmbed}>
          <iframe src={film.trailer} title={`${film.title} trailer`} />
        </div>
      ) : null}
      <div className={styles.stillsGrid}>
        {film.stills?.map((still) => (
          <div key={still.id} className={styles.stillItem}>
            <img src={still.image.url} alt={`Still from ${film.title}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
