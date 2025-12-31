import { Navbar } from '@/legacy_app/components/Navbar'
import { Footer } from '@/legacy_app/components/Footer'
import { WhatsAppButton } from '@/legacy_app/components/WhatsAppButton'
import { ScrollToTop } from '@/legacy_app/components/ScrollToTop'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      {/* ScrollToTop might need adjustment for Next.js routing, but keeping for now */}
      <ScrollToTop />
    </>
  )
}
