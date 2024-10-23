import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import localFont from 'next/font/local'
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

const lxgwWenKaiTC = localFont({
  src: [
    {
      path: './LXGWWenKaiTC-Light.ttf',
      weight: '300',
      style: 'light',
    },
    {
      path: './LXGWWenKaiTC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './LXGWWenKaiTC-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
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
