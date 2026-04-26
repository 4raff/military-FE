import { useMemo } from 'react'
import { BarChart3, TrendingUp, AlertTriangle, PackageCheck, Warehouse, Clock3 } from 'lucide-react'
import { ChartCard, StatCard } from '../../../components/dashboard'

type StatisticsRole = 'superadmin' | 'admin'

interface StatisticsPageProps {
  role: StatisticsRole
}

export default function StatisticsPage({ role }: StatisticsPageProps) {
  const stats = useMemo(
    () => [
      {
        label: 'Monthly Requests',
        value: 186,
        icon: <BarChart3 size={24} />,
        trend: { value: 14, direction: 'up' as const },
        color: 'blue' as const,
      },
      {
        label: 'Approval Rate',
        value: '92%',
        icon: <PackageCheck size={24} />,
        trend: { value: 3, direction: 'up' as const },
        color: 'green' as const,
      },
      {
        label: 'Low Stock Alerts',
        value: 11,
        icon: <AlertTriangle size={24} />,
        trend: { value: 4, direction: 'down' as const },
        color: 'orange' as const,
      },
      {
        label: 'Active Warehouses',
        value: role === 'superadmin' ? 8 : 3,
        icon: <Warehouse size={24} />,
        color: 'purple' as const,
      },
    ],
    [role],
  )

  const categoryStats = useMemo(
    () => [
      { category: 'Persenjataan', total: 138, change: '+8%' },
      { category: 'Amunisi', total: 96, change: '+5%' },
      { category: 'Kendaraan Militer', total: 37, change: '-2%' },
    ],
    [],
  )

  const recentPeaks = useMemo(
    () => [
      { time: '08:00', request: 12 },
      { time: '10:00', request: 24 },
      { time: '12:00', request: 31 },
      { time: '14:00', request: 28 },
      { time: '16:00', request: 19 },
      { time: '18:00', request: 11 },
    ],
    [],
  )

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Statistics Overview</h1>
        <p className="text-slate-300">
          Ringkasan performa inventori dan request untuk role {role === 'superadmin' ? 'Super Admin' : 'Admin'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ChartCard
            title="Request Traffic (Today)"
            subtitle="Distribusi jam sibuk request"
            action={
              <div className="inline-flex items-center gap-2 text-xs text-slate-300 bg-slate-800/70 border border-slate-700/60 rounded-md px-2 py-1">
                <Clock3 size={14} />
                Updated 2 min ago
              </div>
            }
          >
            <div className="grid grid-cols-6 gap-2">
              {recentPeaks.map((point) => (
                <div key={point.time} className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-3 text-center">
                  <p className="text-xs text-slate-400">{point.time}</p>
                  <p className="text-lg font-bold text-blue-300 mt-1">{point.request}</p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <ChartCard title="Trend Summary" subtitle="Perbandingan 30 hari terakhir">
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
              <p className="text-xs text-slate-400">Request Growth</p>
              <p className="text-2xl font-bold text-green-300 mt-1">+14%</p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
              <p className="text-xs text-slate-400">Fulfillment Speed</p>
              <p className="text-2xl font-bold text-cyan-300 mt-1">1.8 days</p>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-3">
              <p className="text-xs text-slate-400">Stock Stability</p>
              <p className="text-2xl font-bold text-amber-300 mt-1">86%</p>
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Inventory Category Performance"
        subtitle="Ringkasan item per kategori"
        action={
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors text-sm">
            <TrendingUp size={14} />
            Export Snapshot
          </button>
        }
      >
        <div className="space-y-3">
          {categoryStats.map((row) => (
            <div key={row.category} className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{row.category}</p>
                <p className="text-xs text-slate-400 mt-1">Total item tercatat</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-100">{row.total}</p>
                <p className="text-xs text-green-300 mt-1">{row.change}</p>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
