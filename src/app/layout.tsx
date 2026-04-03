import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solutionsquad.tech'),
  title: "Solution Squad — Software Development Company",
  description:
    "We build exceptional mobile apps, web platforms, and backend systems. React Native, Flutter, Next.js, NestJS, FastAPI specialists.",
  keywords: [
    "software development",
    "mobile app development",
    "React Native",
    "Flutter",
    "Next.js",
    "NestJS",
    "FastAPI",
    "web development",
  ],
  openGraph: {
    title: "Solution Squad",
    description: "We craft exceptional digital products.",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solution Squad',
    description: 'We craft exceptional digital products.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
