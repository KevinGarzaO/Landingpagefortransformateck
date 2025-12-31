import type { Metadata } from 'next'
import '@/styles/index.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Transformateck',
  description: 'Landing page for Transformateck',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
