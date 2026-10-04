import type { Metadata, Viewport } from "next";
import { Fraunces, Barlow, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A1A2F",
};

export const metadata: Metadata = {
  title: {
    default: "Exar International Trading Est — Building Materials, Industrial Tools & Hardware",
    template: "%s | Exar International Trading Est",
  },
  description:
    "Saudi Arabia-based supplier of industrial tools, building materials, welding equipment, safety gear, and precision instruments. ARAMCO & SABIC approved vendor serving the Middle East & Africa since 2015.",
  keywords: [
    "industrial tools Saudi Arabia",
    "building materials Dammam",
    "power tools supplier",
    "welding equipment",
    "safety PPE",
    "Mitutoyo instruments",
    "ARAMCO vendor",
    "SABIC vendor",
    "Exar International",
  ],
  authors: [{ name: "Exar International Trading Est" }],
  creator: "Exar International Trading Est",
  metadataBase: new URL("https://exarintl.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://exarintl.com",
    siteName: "Exar International Trading Est",
    title: "Exar International Trading Est — Building Materials, Industrial Tools & Hardware",
    description:
      "Saudi Arabia-based supplier of industrial tools, building materials, and hardware. ARAMCO & SABIC approved vendor serving the Middle East & Africa since 2015.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${barlow.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Exar International Trading Est",
              url: "https://exarintl.com",
              logo: "https://exarintl.com/logo.png",
              description:
                "Building Material, Industrial Tools, Safety & Fire. Established 2015, Saudi Arabia.",
              foundingDate: "2015",
              telephone: "+966 54 379 6070",
              email: "sales@exarintl.com",
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Dammam",
                  addressCountry: "SA",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Jubail",
                  addressCountry: "SA",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Khobar",
                  addressCountry: "SA",
                },
              ],
              areaServed: ["Middle East", "Africa"],
            }),
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
