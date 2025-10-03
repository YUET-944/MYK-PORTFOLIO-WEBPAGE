import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Muhammad Younas Khan | Portfolio - Aspiring Full Stack Developer",
    template: "%s | MYK Portfolio",
  },
  description:
    "Muhammad Younas Khan - Computer Science student at UET Mardan specializing in Flutter, Python, SQL, and full-stack development. Passionate about creating innovative solutions and building meaningful technology.",
  keywords: [
    "Muhammad Younas Khan",
    "MYK",
    "Computer Science",
    "Full Stack Developer",
    "Flutter Developer",
    "Python Developer",
    "SQL Database",
    "Mobile App Developer",
    "Web Developer",
    "Portfolio",
    "UET Mardan",
    "Pakistan Developer",
    "Software Engineer",
    "Database Developer",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "GitHub",
    "Programming",
    "Software Development",
    "Team Leadership",
    "Project Management",
  ],
  authors: [{ name: "Muhammad Younas Khan", url: "https://github.com/YUET-944" }],
  creator: "Muhammad Younas Khan",
  publisher: "Muhammad Younas Khan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myk-portfolio-website.vercel.app",
    title: "Muhammad Younas Khan | Portfolio - Aspiring Full Stack Developer",
    description:
      "Computer Science student at UET Mardan specializing in Flutter, Python, SQL, and full-stack development. View my projects and get in touch for collaboration opportunities.",
    siteName: "MYK Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Younas Khan - Portfolio Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Younas Khan | Portfolio - Aspiring Full Stack Developer",
    description:
      "Computer Science student and developer from UET Mardan, Pakistan specializing in Flutter, Python & SQL",
    images: ["/og-image.jpg"],
    creator: "@MYK_Dev",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://myk-portfolio-website.vercel.app",
  },
  category: "Portfolio",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0L1YFZ7XMM"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0L1YFZ7XMM');
          `}
        </script>
      </head>
      <body className="font-poppins antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
