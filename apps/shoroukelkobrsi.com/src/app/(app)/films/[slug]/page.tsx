import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Film } from "@/payload-types";
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save";

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
  params,
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const filmSlug = params.slug;
  const film = await getCachedFilm(filmSlug);

  return (
    <>
      <RefreshRouteOnSave />
      <h1>Film Page: {film.title}</h1>
    </>
  );
}
