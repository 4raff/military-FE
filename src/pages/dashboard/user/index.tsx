import { FileText, Package, Clock } from 'lucide-react'
import { StatCard, ChartCard, RecentActivityTable } from '../../../components/dashboard'
import { useMemo } from 'react'

export default function UserDashboard() {
  const stats = useMemo(
    () => [
      {
        label: 'My Requests',
        value: 5,
        icon: <FileText size={24} />,
        color: 'blue' as const,
      },
      {
        label: 'Available Items',
        value: 124,
        icon: <Package size={24} />,
        color: 'green' as const,
      },
      {
        label: 'Pending',
        value: 2,
        icon: <Clock size={24} />,
        color: 'orange' as const,
      },
    ],
    [],
  )

  const myActivities = useMemo(
    () => [
      {
        id: '1',
        action: 'Request Submitted',
        description: 'Requested 500 units of ammunition',
        timestamp: '2 hours ago',
        status: 'info' as const,
      },
      {
        id: '2',
        action: 'Request Approved',
        description: 'Your request #2032 has been approved',
        timestamp: '1 day ago',
        status: 'success' as const,
      },
    ],
    [],
  )

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
        <p className="text-slate-400">View your requests and available items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <ChartCard title="Quick Actions">
        <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Create New Request
        </button>
      </ChartCard>

      <RecentActivityTable items={myActivities} title="My Activity" />
    </div>
  )
}
