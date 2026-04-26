import { useMemo } from 'react'
import { Users, Package, Warehouse, FileText, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { StatCard, ChartCard, RecentActivityTable } from '../../../components/dashboard'

export default function SuperAdminDashboard() {
  // Mock data - Will be replaced with actual API calls
  const stats = useMemo(
    () => [
      {
        label: 'Total Users',
        value: 42,
        icon: <Users size={24} />,
        trend: { value: 12, direction: 'up' as const },
        color: 'blue' as const,
      },
      {
        label: 'Total Items',
        value: 328,
        icon: <Package size={24} />,
        trend: { value: 5, direction: 'up' as const },
        color: 'purple' as const,
      },
      {
        label: 'Warehouses',
        value: 8,
        icon: <Warehouse size={24} />,
        color: 'green' as const,
      },
      {
        label: 'Pending Requests',
        value: 12,
        icon: <AlertCircle size={24} />,
        trend: { value: 8, direction: 'down' as const },
        color: 'red' as const,
      },
    ],
    [],
  )

  const recentActivities = useMemo(
    () => [
      {
        id: '1',
        action: 'User Created',
        description: 'New admin user "Budi Santoso" created for KODIM-001',
        timestamp: '5 min ago',
        user: 'Admin User',
        status: 'success' as const,
        icon: <Users size={16} />,
      },
      {
        id: '2',
        action: 'Request Approved',
        description: 'Item request #2034 approved for ammunition supply',
        timestamp: '15 min ago',
        user: 'Admin User',
        status: 'success' as const,
        icon: <CheckCircle size={16} />,
      },
      {
        id: '3',
        action: 'Request Rejected',
        description: 'Item request #2033 rejected - insufficient stock',
        timestamp: '1 hour ago',
        user: 'Admin User',
        status: 'warning' as const,
        icon: <AlertCircle size={16} />,
      },
      {
        id: '4',
        action: 'Inventory Updated',
        description: 'Weapon stock updated in Warehouse Central',
        timestamp: '2 hours ago',
        user: 'System',
        status: 'info' as const,
        icon: <Package size={16} />,
      },
      {
        id: '5',
        action: 'System Alert',
        description: 'Database backup completed successfully',
        timestamp: '4 hours ago',
        user: 'System',
        status: 'success' as const,
        icon: <CheckCircle size={16} />,
      },
    ],
    [],
  )

  const topRequests = useMemo(
    () => [
      {
        id: '2045',
        item: 'Assault Rifle Ammunition',
        unit: 'KODIM-001',
        quantity: 500,
        status: 'pending' as const,
      },
      {
        id: '2044',
        item: 'Medical Supplies',
        unit: 'MABESAD',
        quantity: 200,
        status: 'pending' as const,
      },
      {
        id: '2043',
        item: 'Communication Equipment',
        unit: 'KODIM-002',
        quantity: 15,
        status: 'approved' as const,
      },
    ],
    [],
  )

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, Super Administrator
        </h1>
        <p className="text-slate-400">
          Here's what's happening with your military inventory system today
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivityTable items={recentActivities} onViewAll={() => {}} />
        </div>

        {/* Quick Stats */}
        <ChartCard title="System Status" subtitle="Real-time metrics">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm text-slate-300">API Status</span>
              </div>
              <span className="text-sm font-semibold text-green-400">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm text-slate-300">Database</span>
              </div>
              <span className="text-sm font-semibold text-green-400">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-slate-300">Storage</span>
              </div>
              <span className="text-sm font-semibold text-yellow-400">75% Used</span>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-slate-400 mb-2">Last Sync</p>
              <p className="text-sm font-semibold text-blue-300">2 minutes ago</p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Pending Requests Section */}
      <ChartCard
        title="Top Pending Requests"
        subtitle="Items waiting for approval"
        action={
          <button className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
            View All
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">
                  Request ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">
                  Item
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">
                  Unit
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {topRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium text-white">#{req.id}</td>
                  <td className="py-3 px-4 text-sm text-slate-300">{req.item}</td>
                  <td className="py-3 px-4 text-sm text-slate-400">{req.unit}</td>
                  <td className="py-3 px-4 text-sm text-slate-300 font-medium">{req.quantity}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors border border-green-500/30">
                        Approve
                      </button>
                      <button className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
              <Users className="text-blue-400" size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">Quick Action</p>
              <p className="text-sm font-semibold text-white">Create User</p>
            </div>
          </div>
        </button>

        <button className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
              <Package className="text-purple-400" size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">Quick Action</p>
              <p className="text-sm font-semibold text-white">Add Item</p>
            </div>
          </div>
        </button>

        <button className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
              <Warehouse className="text-green-400" size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">Quick Action</p>
              <p className="text-sm font-semibold text-white">Manage Units</p>
            </div>
          </div>
        </button>

        <button className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 backdrop-blur-sm transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
              <TrendingUp className="text-orange-400" size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">Quick Action</p>
              <p className="text-sm font-semibold text-white">View Reports</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
