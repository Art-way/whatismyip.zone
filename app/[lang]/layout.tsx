// app/[lang]/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Tajawal } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: {
    template: '%s | whatismyip.zone',
    default: 'What Is My IP Address? Free IP Lookup | whatismyip.zone',
  },
  description: "Instantly check your IP address and learn how to protect your online privacy and security with our free tools and guides.",
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
  }>
) {
  const { lang } = props.params;
  const isArabic = lang === 'ar';

  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'} className={`${GeistSans.variable} ${isArabic ? tajawal.variable : ''}`}>
      <body className={`flex flex-col min-h-screen ${isArabic ? 'font-tajawal' : 'font-sans'}`}>
        <Header />
        <main className="container mx-auto px-4 py-12 flex-grow">
          {props.children}
        </main>
        <Footer />
      </body>
    </html>
  );
}