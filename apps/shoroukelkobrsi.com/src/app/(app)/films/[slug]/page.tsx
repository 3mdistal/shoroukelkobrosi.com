import { Metadata } from 'next'
import { baseMetadata } from '@/components/base-metadata'
import FilmPage from '@/components/film/film-page'
import { getCachedFilm } from '@/components/film/film-fetches'
import { createImageUrl } from '@/utilities/media'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const film = await getCachedFilm(params.slug)

  if (film['og-info'].length > 0) {
    return {
      ...baseMetadata,
      title: `${film.title} - Anthropotpourri`,
      description: film['og-info'][0].ogDescription,
      openGraph: {
        ...baseMetadata.openGraph,
        title: `${film.title} - Anthropotpourri`,
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
  } else {
    return baseMetadata
  }
}

export default function Page({ params }: { params: { slug: string } }): React.ReactElement {
  return (
    <>
      <FilmPage slug={params.slug} />
    </>
  )
}
