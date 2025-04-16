import { Inter, Cormorant_Upright } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Upright({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Augusta Luxury - Premium Furniture & Home Decor",
  description: "Discover exquisite furniture and home decor at Augusta Luxury. Shop our curated collection of premium sofas, lighting, and home accessories. Free shipping on all orders.",
  keywords: "luxury furniture, premium home decor, designer furniture, luxury sofas, home lighting, ottoman furniture, carved sofas, chesterfield furniture",
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/vercel.png' },
    ],
  },
  openGraph: {
    title: "Augusta Luxury - Premium Furniture & Home Decor",
    description: "Discover exquisite furniture and home decor at Augusta Luxury. Shop our curated collection of premium sofas, lighting, and home accessories.",
    url: "https://augustaluxury.in",
    siteName: "Augusta Luxury",
    images: [
      {
        url: "https://augustaluxury.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Augusta Luxury Showroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Augusta Luxury - Premium Furniture & Home Decor",
    description: "Discover exquisite furniture and home decor at Augusta Luxury. Shop our curated collection of premium sofas, lighting, and home accessories.",
    images: ["https://augustaluxury.in/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-[#FDFBF8]`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
