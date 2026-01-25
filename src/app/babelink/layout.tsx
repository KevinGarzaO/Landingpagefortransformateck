import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Babelink',
  },
  description: 'Analiza y optimiza tu web con IA',
  icons: {
    icon: '/assets/babelink/babelink-favicon.png',
  },
  manifest: '/manifest.json',
};

export default function ChatGPTLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
