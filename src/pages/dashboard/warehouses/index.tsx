import { useEffect, useMemo, useState } from 'react'
import { Building2, Layers3, Shield, RefreshCcw } from 'lucide-react'
import { ChartCard, StatCard } from '../../../components/dashboard'
import { unitService, warehouseService } from '../../../services'
import type { Unit, Warehouse } from '../../../types/api'

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const [warehouseRes, unitRes] = await Promise.all([
        warehouseService.getAll(),
        unitService.getAll(),
      ])

      setWarehouses(warehouseRes.data ?? [])
      setUnits(unitRes.data ?? [])
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal memuat data warehouse')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const unitMap = useMemo(() => {
    return new Map(units.map((unit) => [unit.id, unit.name]))
  }, [units])

  const stats = useMemo(() => {
    const linkedUnits = new Set(warehouses.map((warehouse) => warehouse.unitId)).size

    return [
      { label: 'Total Warehouses', value: warehouses.length, icon: <Building2 size={24} />, color: 'blue' as const },
      { label: 'Linked Units', value: linkedUnits, icon: <Layers3 size={24} />, color: 'purple' as const },
      { label: 'Registered Units', value: units.length, icon: <Shield size={24} />, color: 'green' as const },
    ]
  }, [warehouses, units])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Warehouses</h1>
        <p className="text-slate-300">Pusat distribusi inventory berdasarkan unit militer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      <ChartCard
        title="Warehouse Directory"
        subtitle="Daftar warehouse dan keterkaitannya dengan unit"
        action={
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors text-sm"
          >
            <RefreshCcw size={14} />
            Refresh
          </button>
        }
      >
        {isLoading ? (
          <div className="py-10 text-center text-slate-300">Loading warehouses...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-300">{error}</div>
        ) : warehouses.length === 0 ? (
          <div className="py-10 text-center text-slate-400">Belum ada warehouse terdaftar</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/60">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Warehouse ID</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Warehouse Name</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Unit Code</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Unit Name</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((warehouse) => (
                  <tr key={warehouse.id} className="border-b border-slate-800/70 hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 text-sm text-slate-100 font-medium">#{warehouse.id}</td>
                    <td className="py-3 px-3 text-sm text-slate-200">{warehouse.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-300">{warehouse.unitId}</td>
                    <td className="py-3 px-3 text-sm text-slate-400">{unitMap.get(warehouse.unitId) || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ChartCard>
    </div>
  )
}
