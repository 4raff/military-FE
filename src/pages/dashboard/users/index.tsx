import { useEffect, useMemo, useState } from 'react'
import { UserCog, UserRound, Users } from 'lucide-react'
import { ChartCard, StatCard } from '../../../components/dashboard'
import { unitService, userService } from '../../../services'
import type { Unit, User } from '../../../types/api'

const roleClasses: Record<User['role'], string> = {
  superadmin: 'bg-purple-500/15 text-purple-300 border border-purple-500/35',
  admin: 'bg-blue-500/15 text-blue-300 border border-blue-500/35',
  user: 'bg-slate-500/15 text-slate-300 border border-slate-500/35',
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [createSuccess, setCreateSuccess] = useState<string | null>(null)
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    unitId: '',
  })

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const [userRes, unitRes] = await Promise.all([userService.getAll(), unitService.getAll()])
      setUsers(userRes.data ?? [])
      setUnits(unitRes.data ?? [])
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal memuat data users')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const unitMap = useMemo(() => new Map(units.map((unit) => [unit.id, unit.name])), [units])

  const stats = useMemo(() => {
    const admins = users.filter((user) => user.role === 'admin').length
    const standardUsers = users.filter((user) => user.role === 'user').length

    return [
      { label: 'Total Users', value: users.length, icon: <Users size={24} />, color: 'blue' as const },
      { label: 'Admin', value: admins, icon: <UserCog size={24} />, color: 'green' as const },
      { label: 'User', value: standardUsers, icon: <UserRound size={24} />, color: 'orange' as const },
    ]
  }, [users])

  const handleCreateAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedUnitId = adminForm.unitId.trim()

    if (!adminForm.name || !adminForm.email || !adminForm.password || !normalizedUnitId) {
      setCreateError('Semua field wajib diisi untuk membuat akun admin')
      setCreateSuccess(null)
      return
    }

    if (adminForm.password.length < 6) {
      setCreateError('Password minimal 6 karakter')
      setCreateSuccess(null)
      return
    }

    const unitExists = units.some((unit) => unit.id === normalizedUnitId)
    if (!unitExists) {
      setCreateError('Unit tidak ditemukan. Buat unit terlebih dahulu atau gunakan kode unit yang sudah ada.')
      setCreateSuccess(null)
      return
    }

    try {
      setIsCreatingAdmin(true)
      setCreateError(null)
      setCreateSuccess(null)

      await userService.create({
        name: adminForm.name,
        email: adminForm.email,
        password: adminForm.password,
        role: 'admin',
        unitId: normalizedUnitId,
      })

      setCreateSuccess('Akun admin berhasil dibuat')
      setAdminForm(() => ({
        name: '',
        email: '',
        password: '',
        unitId: '',
      }))

      await fetchData()
    } catch (err: any) {
      setCreateError(err?.response?.data?.message || 'Gagal membuat akun admin')
    } finally {
      setIsCreatingAdmin(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <p className="text-slate-300">Kelola akun, role, dan unit assignment pengguna sistem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      <ChartCard title="Create Admin Account" subtitle="Superadmin dapat membuat akun admin baru">
        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Nama Admin</label>
            <input
              type="text"
              value={adminForm.name}
              onChange={(event) =>
                setAdminForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Contoh: Budi Santoso"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Email</label>
            <input
              type="email"
              value={adminForm.email}
              onChange={(event) =>
                setAdminForm((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="admin@military.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <input
              type="password"
              value={adminForm.password}
              onChange={(event) =>
                setAdminForm((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Unit</label>
            <input
              type="text"
              value={adminForm.unitId}
              onChange={(event) =>
                setAdminForm((prev) => ({
                  ...prev,
                  unitId: event.target.value,
                }))
              }
              list="unit-suggestions"
              className="w-full px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/70 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Contoh: MABESAD"
              required
            />
            <datalist id="unit-suggestions">
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </datalist>
            <p className="text-xs text-slate-500">Isi kode unit secara manual, contoh: MABESAD</p>
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isCreatingAdmin}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-400 text-white font-medium transition-colors"
            >
              {isCreatingAdmin ? 'Creating...' : 'Create Admin'}
            </button>
            {createSuccess && <p className="text-sm text-green-300">{createSuccess}</p>}
            {createError && <p className="text-sm text-red-300">{createError}</p>}
          </div>
        </form>
      </ChartCard>

      <ChartCard
        title="Users Directory"
        subtitle="Daftar seluruh user berdasarkan role"
        action={
          <button
            onClick={fetchData}
            className="px-3 py-1.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors text-sm"
          >
            Refresh
          </button>
        }
      >
        {isLoading ? (
          <div className="py-10 text-center text-slate-300">Loading users...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-300">{error}</div>
        ) : users.length === 0 ? (
          <div className="py-10 text-center text-slate-400">Belum ada user terdaftar</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/60">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Name</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Email</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Role</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Unit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800/70 hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 text-sm text-slate-100 font-medium">{user.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-300">{user.email}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${roleClasses[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-400">
                      {unitMap.get(user.unitId) || user.unitId}
                    </td>
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
