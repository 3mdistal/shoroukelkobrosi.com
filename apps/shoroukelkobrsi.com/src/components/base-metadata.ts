import type { Metadata } from 'next'

export const baseMetadata: Metadata = {
  title: 'Anthropotpourri',
  description: 'The cinema of Shorouk Elkobrosi.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shoroukelkobrosi.com',
    siteName: 'Anthropotpourri',
    images: [
      {
        url: 'https://unsplash.it/1200/630',
        width: 1200,
        height: 630,
        alt: 'Anthropotpourri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shoroukelkobrosi',
    creator: '@shoroukelkobrosi',
  },
}