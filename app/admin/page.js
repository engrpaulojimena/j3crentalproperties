import AdminDashboardClient from './AdminDashboardClient'

export const metadata = {
  title: 'Admin Dashboard | J3C Rental Properties',
  description: 'Private administration dashboard for J3C Rental Properties.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
