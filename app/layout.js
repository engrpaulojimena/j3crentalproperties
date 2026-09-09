import './globals.css'

export const metadata = {
  title: 'J3C Rental Properties | Fini Homes Condominium, Valenzuela',
  description: 'J3C Rental Properties — condominium unit rental and tenant support in Valenzuela City, featuring Fini Homes Condominium in Marulas.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
