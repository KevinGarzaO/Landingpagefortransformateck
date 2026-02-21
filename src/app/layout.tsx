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
    icon: '/assets/favicon.png',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
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
