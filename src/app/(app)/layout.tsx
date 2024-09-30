import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './globals.css'
import { ViewTransitions } from 'next-view-transitions'
import Menu from '@/components/layout/menu'
import Footer from '@/components/layout/footer'
import { RefreshRouteOnSave } from '@/components/utils/refresh-route-on-save'
import { baseMetadata } from '@/components/base-metadata'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" className={lora.variable}>
        <body>
          <div
            id="main-content"
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
          >
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <RefreshRouteOnSave />
          </div>
          <Menu title="Anthropotpourri: The cinema of Shorouk Elkobrosi" />
        </body>
      </html>
    </ViewTransitions>
  )
}
