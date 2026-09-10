import './globals.css'

export const metadata = {
  title: 'J3C Rental Properties | Condominium Rentals in Valenzuela',
  description: 'Browse available J3C rental units in Valenzuela City. View live owner-managed listings, actual property photos, rental information, FAQs, guidelines, rates and terms, location details, and send a direct inquiry.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
