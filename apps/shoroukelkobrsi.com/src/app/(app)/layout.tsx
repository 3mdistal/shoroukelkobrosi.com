import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import MenuWrapper from "@/components/layout/menu-wrapper";
import Footer from "@/components/layout/footer";

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
    <html lang="en" className={lora.variable}>
      <body>
        <MenuWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
