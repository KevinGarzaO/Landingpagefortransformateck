import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Babelink',
  },
  description: 'Analizador de negocio con IA',
  icons: {
    icon: '/assets/babelink/babelink-favicon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Babelink',
    description: 'Analizador de negocio con IA',
    images: [
      {
        url: '/assets/babelink/babelink-favicon.png',
        width: 800,
        height: 800,
        alt: 'Babelink Logo',
      },
    ],
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChatGPTLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
