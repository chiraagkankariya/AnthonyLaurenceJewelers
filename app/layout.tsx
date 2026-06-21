import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/ui/CartDrawer'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://anthonylaurencejewelry.com'),
  title: 'Anthony Laurence Jewelers | Made to Be Remembered.',
  description:
    'Fine jewelry in Millburn, NJ. Engagement rings, custom jewelry, appraisals, and repairs. Visit us at 139 Millburn Ave.',
  openGraph: {
    title: 'Anthony Laurence Jewelers | Made to Be Remembered.',
    description:
      'Fine jewelry in Millburn, NJ. Engagement rings, custom jewelry, appraisals, and repairs.',
    url: 'https://anthonylaurencejewelry.com',
    siteName: 'Anthony Laurence Jewelers',
    images: [{ url: '/alj-logo-final1.png', width: 800, height: 800, alt: 'Anthony Laurence Jewelers' }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
