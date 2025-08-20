import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rhiz - Exclusive Lifetime Membership | AI Relationship Intelligence',
  description: 'Join the founding 150 members of Rhiz. One-time payment of $777 for lifetime access to AI-powered relationship intelligence. When these spots are gone, we close until 2026.',
  keywords: 'AI, relationship intelligence, networking, CRM, lifetime membership, exclusive',
  openGraph: {
    title: 'Rhiz - 150 Lifetime Memberships Only',
    description: 'Join the exclusive founding community. $777 once, lifetime access.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rhiz - 150 Lifetime Memberships Only',
    description: 'Join the exclusive founding community. $777 once, lifetime access.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}