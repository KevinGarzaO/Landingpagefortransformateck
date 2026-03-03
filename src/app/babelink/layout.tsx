import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Babelink | Analiza tu negocio con IA',
  },
  description: 'Babelink analiza tu landing page o sitio web con inteligencia artificial y te da un reporte detallado de SEO, conversión y rendimiento en segundos.',
  keywords: ['analizar landing page', 'auditoría web IA', 'análisis SEO', 'babelink', 'transformateck'],
  icons: {
    icon: '/assets/babelink/babelink-favicon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Babelink | Analiza tu negocio con IA',
    description: 'Analiza tu landing page con IA. Reporte de SEO, conversión y rendimiento en segundos.',
    url: 'https://transformateck.com/babelink',
    siteName: 'Transformateck',
    images: [
      {
        url: '/assets/babelink/babelink-favicon.png',
        width: 800,
        height: 800,
        alt: 'Babelink Logo',
      },
    ],
    type: 'website',
    locale: 'es_MX',
  },
  alternates: {
    canonical: 'https://transformateck.com/babelink',
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

export default function ChatGPTLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
