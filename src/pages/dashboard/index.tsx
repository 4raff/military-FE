import { useAppSelector } from '../../store/hooks'
import { MainLayout } from '../../components/layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import SuperAdminDashboard from './superadmin'
import AdminDashboard from './admin/index'
import UserDashboard from './user/index'
import StatisticsPage from './statistics'

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user)
  const isInitializing = useAppSelector((state) => state.auth.isInitializing)

  // Show loading state during initialization
  if (isInitializing || !user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4 animate-spin">
              <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-blue-400"></div>
            </div>
            <p className="text-slate-300">Loading dashboard...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  const renderDashboard = (role: 'superadmin' | 'admin' | 'user') => {
    switch (role) {
      case 'superadmin':
        return <SuperAdminDashboard />
      case 'admin':
        return <AdminDashboard />
      case 'user':
        return <UserDashboard />
      default:
        return <div className="text-white">Unknown role</div>
    }
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={renderDashboard(user.role)} />
        <Route
          path="statistics"
          element={
            user.role === 'superadmin' || user.role === 'admin' ? (
              <StatisticsPage role={user.role} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  )
}
