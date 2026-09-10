import AdminLoginClient from './AdminLoginClient'

export const metadata = {
  title: 'Admin Access | J3C Rental Properties',
  description: 'Private administration access for J3C Rental Properties.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function AdminLoginPage() {
  return <AdminLoginClient />
}
