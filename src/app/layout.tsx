import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Percentage Creative | Graphic Design Studio",
  description:
    "The Percentage Creative is a graphic design studio creating brochures, posters, flyers, digital images, labels, logos, and full branding systems.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230E3B2A'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='16' font-family='Inter,sans-serif' font-weight='700' fill='%237CFF6B'%3E%25%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
