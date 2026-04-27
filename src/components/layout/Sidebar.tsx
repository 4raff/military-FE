import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { Link, useLocation } from 'react-router-dom'
import { unitService } from '../../services'
import {
  BarChart3,
  Users,
  Package,
  Shield,
  Warehouse,
  FileText,
  Settings,
  LogOut,
  X,
  Home,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  roles: ('superadmin' | 'admin' | 'user')[]
  badge?: string
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()
  const [unitName, setUnitName] = useState<string | null>(null)

  useEffect(() => {
    const resolveUnitName = async () => {
      if (!user?.unitId) {
        setUnitName(null)
        return
      }

      try {
        const response = await unitService.getAll()
        const unitList = Array.isArray((response as any)?.data)
          ? (response as any).data
          : Array.isArray(response)
            ? response
            : []

        const matched = unitList.find((unit: any) => unit.id === user.unitId)
        setUnitName(matched?.name || null)
      } catch {
        setUnitName(null)
      }
    }

    resolveUnitName()
  }, [user?.unitId])

  const navigationItems: NavItem[] = useMemo(
    () => [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <Home size={20} />,
        roles: ['superadmin', 'admin', 'user'],
      },
      {
        label: 'Statistics',
        href: '/dashboard/statistics',
        icon: <BarChart3 size={20} />,
        roles: ['superadmin', 'admin'],
      },
      {
        label: 'Inventory',
        href: '/dashboard/inventory',
        icon: <Package size={20} />,
        roles: ['superadmin', 'admin'],
      },
      {
        label: 'Warehouses',
        href: '/dashboard/warehouses',
        icon: <Warehouse size={20} />,
        roles: ['superadmin', 'admin'],
      },
      {
        label: 'Units',
        href: '/dashboard/units',
        icon: <Shield size={20} />,
        roles: ['superadmin'],
      },
      {
        label: 'Requests',
        href: '/dashboard/requests',
        icon: <FileText size={20} />,
        roles: ['superadmin', 'admin', 'user'],
      },
      {
        label: 'Users',
        href: '/dashboard/users',
        icon: <Users size={20} />,
        roles: ['superadmin'],
      },
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: <Settings size={20} />,
        roles: ['superadmin'],
      },
    ],
    [],
  )

  const filteredItems = user
    ? navigationItems.filter((item) => item.roles.includes(user.role as any))
    : navigationItems.filter((item) => item.roles.includes('user'))

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm lg:hidden z-30"></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 overflow-hidden bg-slate-950/72 backdrop-blur-xl border-r border-slate-700/60 transition-transform duration-300 ease-out will-change-transform z-40 ${
          isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm leading-tight truncate max-w-[170px]">
                  {unitName || user?.unitId || 'Military'}
                </span>
                <span className="text-[11px] text-slate-400 leading-tight">Unit Header</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg lg:hidden text-slate-300"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-blue-400/25'
                      : 'text-slate-300 border-transparent hover:text-white hover:bg-slate-800/70 hover:border-slate-600/40'
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      isActive(item.href) ? 'text-blue-400' : 'group-hover:text-slate-200'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-700/50 space-y-2">
            <div className="px-4 py-2 bg-slate-700/20 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Current Role</p>
              <p className="text-sm font-semibold text-white capitalize">
                {user?.role === 'superadmin' ? 'Super Administrator' : user?.role}
              </p>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
