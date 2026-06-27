import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "S Manjunatha | Aspiring Software Developer Portfolio",
  description:
    "B.Tech Student in Information Science and Engineering at REVA University. Aspiring Software Developer focusing on Java, Python, and Web Development.",
  keywords: [
    "S Manjunatha",
    "Manjunatha S",
    "REVA University",
    "Software Developer Portfolio",
    "Student Developer",
    "Java Developer",
    "Python Developer",
  ],
  authors: [{ name: "S Manjunatha" }],
  creator: "S Manjunatha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/s-manjunatha",
    title: "S Manjunatha | Aspiring Software Developer Portfolio",
    description:
      "Student in Information Science and Engineering at REVA University. Exploring Java, Python, and web development technologies.",
    siteName: "S Manjunatha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "S Manjunatha | Portfolio",
    description:
      "Information Science student at REVA University. Focused on Java, Python, and DSA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
