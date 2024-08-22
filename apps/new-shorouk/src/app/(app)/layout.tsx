import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import Menu from "@/components/layout/menu";
import Footer from "@/components/layout/footer";
import { RefreshRouteOnSave } from "@/components/utils/refresh-route-on-save";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Anthropotpourri",
  description: "The cinema of Shorouk Elkobrsi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" className={lora.variable}>
        <body>
          <div id="main-content">
            <main>{children}</main>
            <Footer />
            <RefreshRouteOnSave />
          </div>
          <Menu />
        </body>
      </html>
    </ViewTransitions>
  );
}
