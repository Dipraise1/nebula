import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula AI ($NAI) - Decentralized GPU Marketplace",
  description: "Nebula AI is a decentralized GPU marketplace where users can rent GPU resources for AI workloads, earn rewards by lending GPUs, and stake tokens to secure the network. Join our fair launch model.",
  keywords: "AI, GPU marketplace, blockchain, decentralized computing, machine learning, GPU rental, cryptocurrency, staking, fair launch, Nebula AI, NAI token",
  authors: [{ name: "Nebula AI Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://nebulaai.xyz",
    title: "Nebula AI ($NAI) - Decentralized GPU Marketplace",
    description: "Decentralized GPU marketplace for AI workloads with fair tokenomics and staking rewards.",
    siteName: "Nebula AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nebula AI - Decentralized GPU Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebula AI ($NAI) - Decentralized GPU Marketplace",
    description: "Decentralized GPU marketplace for AI workloads with fair tokenomics and staking rewards.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/shortcut-icon.png",
  },
  metadataBase: new URL("https://nebulaai.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="canonical" href="https://nebulaai.xyz" />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
