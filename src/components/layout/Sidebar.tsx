import { useMemo } from 'react'
import { useAppSelector } from '../../store/hooks'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Users,
  Package,
  Warehouse,
  FileText,
  Settings,
  LogOut,
  X,
  Home,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  roles: ('superadmin' | 'admin' | 'user')[]
  badge?: string
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 transition-transform duration-300 ease-in-out z-40 lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-white text-lg">Military</span>
            </div>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg lg:hidden text-slate-300">
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
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
