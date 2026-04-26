import { Users, Package, AlertCircle } from 'lucide-react'
import { StatCard, ChartCard, RecentActivityTable } from '../../../components/dashboard'
import { useMemo } from 'react'

export default function AdminDashboard() {
  const stats = useMemo(
    () => [
      {
        label: 'Total Items',
        value: 328,
        icon: <Package size={24} />,
        trend: { value: 5, direction: 'up' as const },
        color: 'blue' as const,
      },
      {
        label: 'Pending Requests',
        value: 12,
        icon: <AlertCircle size={24} />,
        color: 'red' as const,
      },
      {
        label: 'Users in Unit',
        value: 24,
        icon: <Users size={24} />,
        color: 'green' as const,
      },
    ],
    [],
  )

  const recentActivities = useMemo(
    () => [
      {
        id: '1',
        action: 'Request Approved',
        description: 'Item request #2034 approved',
        timestamp: '5 min ago',
        status: 'success' as const,
      },
      {
        id: '2',
        action: 'Inventory Updated',
        description: 'Stock updated for Ammunition',
        timestamp: '1 hour ago',
        status: 'info' as const,
      },
    ],
    [],
  )

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400">Manage inventory and requests for your unit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      <RecentActivityTable items={recentActivities} />
    </div>
  )
}
