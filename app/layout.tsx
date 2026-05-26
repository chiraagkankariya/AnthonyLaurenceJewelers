import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/ui/CartDrawer'

export const metadata: Metadata = {
  title: 'Anthony Laurence Jewelers | Made to Be Remembered.',
  description:
    'Fine jewelry in Millburn, NJ. Engagement rings, custom jewelry, appraisals, and repairs. Visit us at 139 Millburn Ave.',
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
      </body>
    </html>
  )
}
