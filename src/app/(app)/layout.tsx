import type { Metadata } from 'next'
import { Lato, LXGW_WenKai_TC } from 'next/font/google'
import './globals.css'
import { ViewTransitions } from 'next-view-transitions'
import Menu from '@/components/layout/menu'
import Footer from '@/components/layout/footer'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-on-save'
import { baseMetadata } from '@/components/base-metadata'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
})

const lxgwWenKaiTC = LXGW_WenKai_TC({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lxgw-wen-kai-tc',
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" className={`${lato.variable} ${lxgwWenKaiTC.variable}`}>
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
