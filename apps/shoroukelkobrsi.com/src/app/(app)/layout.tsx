import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Menu from "@/components/menu";
import styles from "./top-layout.module.css";

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
      <body className="w-lvw">
        <Menu />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
