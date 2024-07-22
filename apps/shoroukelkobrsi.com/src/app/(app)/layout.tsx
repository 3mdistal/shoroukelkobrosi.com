import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Menu from "@/components/menu";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Anthropotpourri",
  description: "The cinema of Shorouk Elkobrsi.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  return (
    <html lang="en" className={lora.variable}>
      <body>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
