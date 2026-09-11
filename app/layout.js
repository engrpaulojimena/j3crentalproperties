import './globals.css'

export const metadata = {
  title: 'J3C Rental Properties | Condominium & Bedspace Rentals',
  description: 'Browse J3C rental properties across Valenzuela, Taguig, Alabang, and Manila. View live listings, property photos, rental requirements, FAQs, rates and terms, locations, and direct inquiry options.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
