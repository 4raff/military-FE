import { useEffect, useMemo, useState } from 'react'
import { Package, AlertTriangle, ShieldCheck, Boxes } from 'lucide-react'
import { ChartCard, StatCard } from '../../../components/dashboard'
import { itemsService } from '../../../services'
import type { Item } from '../../../types/api'

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await itemsService.getAll()
      setItems(response.data ?? [])
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal memuat data inventory')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const stats = useMemo(() => {
    const totalStock = items.reduce((sum, item) => sum + item.stock, 0)
    const lowStock = items.filter((item) => item.stock <= 10).length
    const damaged = items.filter((item) => item.condition === 'Rusak' || item.condition === 'Perbaikan').length

    return [
      { label: 'Total Items', value: items.length, icon: <Package size={24} />, color: 'blue' as const },
      { label: 'Total Stock', value: totalStock, icon: <Boxes size={24} />, color: 'purple' as const },
      { label: 'Low Stock', value: lowStock, icon: <AlertTriangle size={24} />, color: 'orange' as const },
      { label: 'Need Repair', value: damaged, icon: <ShieldCheck size={24} />, color: 'red' as const },
    ]
  }, [items])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
        <p className="text-slate-300">Monitoring stok, kondisi, dan distribusi item militer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      <ChartCard
        title="Inventory List"
        subtitle="Seluruh item yang terdaftar di sistem"
        action={
          <button
            onClick={fetchItems}
            className="px-3 py-1.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors text-sm"
          >
            Refresh
          </button>
        }
      >
        {isLoading ? (
          <div className="py-10 text-center text-slate-300">Loading inventory...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-300">
            <p>{error}</p>
            <button
              onClick={fetchItems}
              className="mt-3 px-3 py-1.5 rounded-md bg-red-500/15 text-red-200 border border-red-500/30 hover:bg-red-500/25 transition-colors text-sm"
            >
              Coba Lagi
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-slate-400">Belum ada item inventory</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/60">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Item</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Category</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Condition</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Stock</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Warehouse ID</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800/70 hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 text-sm text-slate-100 font-medium">{item.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-300">{item.category}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className="px-2 py-1 rounded border border-slate-600/60 bg-slate-800/70 text-slate-200 text-xs">
                        {item.condition}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-200">{item.stock}</td>
                    <td className="py-3 px-3 text-sm text-slate-400">#{item.warehouseId}</td>
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
