import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DEV-MOKU-AI",
    template: "%s | Mohan Kumar S",
  },

  description:
    "Explore Mohan Kumar S's education, skills, projects, work experience, and professional background through his personal portfolio.",

  keywords: [
    "Mohan Kumar S",
    "Mohan Kumar",
    "Portfolio",
    "Developer Portfolio",
    "Software Developer",
    "Projects",
    "Skills",
    "Education",
    "Work Experience",
  ],

  authors: [
    {
      name: "Mohan Kumar S",
    },
  ],

  creator: "Mohan Kumar S",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Mohan Kumar S — Portfolio",
    description:
      "Explore Mohan Kumar S's education, skills, projects, work experience, and professional background.",
    url: "https://dev-moku-ai.vercel.app",
    siteName: "Mohan Kumar S",
    images: [
      {
        url: "https://dev-moku-ai.vercel.app/favicon.png",
        width: 1200,
        height: 630,
        alt: "Mohan Kumar S Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mohan Kumar S — Portfolio",
    description:
      "Explore Mohan Kumar S's skills, projects, education, and professional experience.",
    images: ["https://dev-moku-ai.vercel.app/favicon.png"],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },

  verification: {
    google: "ymSznSsVvafZVO_4VPihCAGLjkctLEXSBHDK3Q2jDgA"
  }

}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
