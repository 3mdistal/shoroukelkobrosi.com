import { Metadata } from 'next'
import { baseMetadata } from '@/components/base-metadata'
import FilmPage from '@/components/film/film-page'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-on-save'
import { getCachedFilm } from '@/components/film/film-fetches'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const film = await getCachedFilm(params.slug)

  return {
    ...baseMetadata,
    title: film.title,
    description: `Explore the cinematic journey of "${film.title}" - a captivating film by Shorouk Elkobrosi`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: film.title,
      description: `Discover the visual storytelling and artistic vision behind "${film.title}" - a compelling work in the Anthropotpourri collection`,
      url: `https://shoroukelkobrosi.com/films/${params.slug}`,
    },
  }
}

export default function Page({ params }: { params: { slug: string } }): React.ReactElement {
  return (
    <>
      <RefreshRouteOnSave />
      <FilmPage slug={params.slug} />
    </>
  )
}
