import type { Metadata } from 'next'
import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
