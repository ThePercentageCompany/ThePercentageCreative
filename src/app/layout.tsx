import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
    icon: [
      { url: "/The Percentage FZ-LLC-SYMBOL ONLY.png" },
      { url: "/favicon.png" }
    ],
    shortcut: "/The Percentage FZ-LLC-SYMBOL ONLY.png",
    apple: "/The Percentage FZ-LLC-SYMBOL ONLY.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6358K4HDZP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6358K4HDZP');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

