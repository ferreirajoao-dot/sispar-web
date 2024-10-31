import type { Metadata } from "next";
import localFont from "next/font/local";
import Layout from "@/ui/layout/layout";
import Script from 'next/script'

import "@/styles/globals.scss";

import { Roboto, Poppins, Space_Grotesk } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: "--font-roboto",
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500','600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: "--font-poppins",
  display: 'swap',
})


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: "--font-space-grotesk",
  display: 'swap',
})


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Sispar",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${poppins.variable} ${spaceGrotesk.variable}`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
