import { Metadata } from 'next'
import { baseMetadata } from '@/components/base-metadata'
import FilmPage from '@/components/film/film-page'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-on-save'
import { getCachedFilm } from '@/components/film/film-fetches'
import { createImageUrl } from '@/utilities/media'

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
    description: film['og-info'][0].ogDescription,
    openGraph: {
      ...baseMetadata.openGraph,
      title: film.title,
      description: film['og-info'][0].ogDescription,
      images: [
        {
          url: createImageUrl(film['og-info'][0].ogImage),
          width: 1200,
          height: 630,
          alt: 'Anthropotpourri',
        },
      ],
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
