import { useEffect, useMemo, useState } from 'react'
import { Shield, Building2 } from 'lucide-react'
import { ChartCard, StatCard } from '../../../components/dashboard'
import { unitService } from '../../../services'
import type { Unit } from '../../../types/api'

const formatDate = (value?: string) => {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreatingUnit, setIsCreatingUnit] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [createSuccess, setCreateSuccess] = useState<string | null>(null)
  const [unitForm, setUnitForm] = useState({ id: '', name: '' })

  const fetchUnits = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await unitService.getAll()
      setUnits(response.data ?? [])
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal memuat daftar unit')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  const handleCreateUnit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedUnitId = unitForm.id.trim().toUpperCase()
    const normalizedUnitName = unitForm.name.trim()

    if (!normalizedUnitId || !normalizedUnitName) {
      setCreateError('Kode unit dan nama unit wajib diisi')
      setCreateSuccess(null)
      return
    }

    if (!/^[A-Z0-9\-_]{3,50}$/.test(normalizedUnitId)) {
      setCreateError('Kode unit harus 3-50 karakter, huruf besar/angka/dash/underscore')
      setCreateSuccess(null)
      return
    }

    try {
      setIsCreatingUnit(true)
      setCreateError(null)
      setCreateSuccess(null)

      await unitService.create({
        id: normalizedUnitId,
        name: normalizedUnitName,
      })

      setCreateSuccess('Unit berhasil dibuat')
      setUnitForm({ id: '', name: '' })
      await fetchUnits()
    } catch (err: any) {
      setCreateError(err?.response?.data?.message || 'Gagal membuat unit')
    } finally {
      setIsCreatingUnit(false)
    }
  }

  const stats = useMemo(
    () => [
      {
        label: 'Total Units',
        value: units.length,
        icon: <Shield size={24} />,
        color: 'blue' as const,
      },
      {
        label: 'Active Unit Codes',
        value: new Set(units.map((unit) => unit.id)).size,
        icon: <Building2 size={24} />,
        color: 'green' as const,
      },
    ],
    [units],
  )

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Units Directory</h1>
        <p className="text-slate-300">Daftar seluruh unit militer yang terdaftar di sistem</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <ChartCard title="Create Unit" subtitle="Tambah unit baru ke sistem">
        <form onSubmit={handleCreateUnit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Kode Unit</label>
            <input
              type="text"
              value={unitForm.id}
              onChange={(event) =>
                setUnitForm((prev) => ({
                  ...prev,
                  id: event.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Contoh: MABESAD"
              required
            />
            <p className="text-xs text-slate-500">Gunakan huruf besar, angka, dash, atau underscore</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Nama Unit</label>
            <input
              type="text"
              value={unitForm.name}
              onChange={(event) =>
                setUnitForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Contoh: Markas Besar Angkatan Darat"
              required
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isCreatingUnit}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 text-white font-medium transition-colors"
            >
              {isCreatingUnit ? 'Creating Unit...' : 'Create Unit'}
            </button>
            {createSuccess && <p className="text-sm text-green-300">{createSuccess}</p>}
            {createError && <p className="text-sm text-red-300">{createError}</p>}
          </div>
        </form>
      </ChartCard>

      <ChartCard
        title="Unit List"
        subtitle="Semua unit dari endpoint API /units"
        action={
          <button
            onClick={fetchUnits}
            className="px-3 py-1.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors text-sm"
          >
            Refresh
          </button>
        }
      >
        {isLoading ? (
          <div className="py-10 text-center text-slate-300">Loading units...</div>
        ) : units.length === 0 ? (
          <div className="py-10 text-center text-slate-400">Belum ada unit terdaftar</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/60">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Unit Code</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Unit Name</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Created At</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => (
                  <tr key={unit.id} className="border-b border-slate-800/70 hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-slate-100">{unit.id}</td>
                    <td className="py-3 px-3 text-sm text-slate-300">{unit.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-400">{formatDate(unit.created_at)}</td>
                    <td className="py-3 px-3 text-sm text-slate-400">{formatDate(unit.updated_at)}</td>
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
