import type { Metadata } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import './globals.css'
import { ViewTransitions } from 'next-view-transitions'
import Menu from '@/components/layout/menu'
import Footer from '@/components/layout/footer'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-on-save'
import { baseMetadata } from '@/components/base-metadata'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito-sans',
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" className={`${nunito.variable} ${nunitoSans.variable}`}>
        <body>
          <div
            id="main-content"
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
          >
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <RefreshRouteOnSave />
          </div>
          <Menu />
        </body>
      </html>
    </ViewTransitions>
  )
}
