import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/index.css'
import { Toaster } from 'sonner'

import MetaPixel from '@/components/MetaPixel'
import CapiTracker from '@/components/CapiTracker'

// Use the production domain to ensure WhatsApp/Socials always find the image
const baseUrl = "https://transformateck.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Transformateck',
    template: '%s | Transformateck',
  },
  description: 'Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados. Únete y crece con nosotros.',
  openGraph: {
    title: 'Transformateck',
    description: 'Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados. Únete y crece con nosotros.',
    url: baseUrl,
    siteName: 'Transformateck',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: 'https://transformateck.com/assets/transformateck-social-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Transformateck Social Card',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transformateck',
    description: 'La comunidad de IA más activa en español. +600 miembros, dinámicas semanales y encuentros los sábados.',
    images: ['https://transformateck.com/assets/transformateck-social-card.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/assets/favicon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'dMk6KakNFe4mmGMtDxf3PoNBO5xV-S8cS38Ar6BtwBo',
  },
}

// JSON-LD: WebSite + SiteNavigation — le dice a Google cuáles son tus páginas principales
// Para agregar más páginas en el futuro, añade un objeto más al array SiteNavigationElement
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://transformateck.com/#website',
      url: 'https://transformateck.com',
      name: 'Transformateck',
      description: 'La comunidad de IA más activa en español',
      inLanguage: 'es-MX',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://transformateck.com/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Navegación principal',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'Inicio',
          url: 'https://transformateck.com',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'Blog',
          url: 'https://transformateck.com/blog',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Babelink',
          url: 'https://transformateck.com/babelink',
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3RWYRZ63PV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3RWYRZ63PV');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vn7d9llhyi");
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        <MetaPixel />
        <CapiTracker />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
