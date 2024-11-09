import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang={locale}>
        <body className={`${inter.className}`}>
          {children}
        </body>
    </html>
  );
}
