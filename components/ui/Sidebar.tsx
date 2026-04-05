'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'
import { 
  Home, 
  Users, 
  Users2, 
  Calendar, 
  Map, 
  Settings,
  Bell,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'People', href: '/people', icon: Users },
  { name: 'Teams', href: '/teams', icon: Users2 },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Map & Zones', href: '/map', icon: Map },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <div className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ${isCollapsed ? 'md:w-16' : 'md:w-64'}`}>
      <div className="flex flex-col flex-1 min-h-0 bg-brand-white border-r border-brand-light">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 px-4">
            <div className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
               <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center">
                <span className="text-brand-white font-bold">C</span>
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold text-brand-dark">Christable</span>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded-md text-brand-light hover:text-brand-dark hover:bg-brand-light"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg
                     ${isActive 
                      ? 'bg-brand-teal/10 text-brand-teal' 
                      : 'text-brand-dark hover:bg-brand-light hover:text-brand-dark'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className={`
                    flex-shrink-0 h-5 w-5
                     ${isActive ? 'text-brand-teal' : 'text-brand-light group-hover:text-brand-dark'}
                    ${isCollapsed ? '' : 'mr-3'}
                  `} />
                  {!isCollapsed && item.name}
                </Link>
              )
            })}
          </nav>
        </div>
         <div className="flex-shrink-0 flex border-t border-brand-light p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Event Coordinator</p>
              </div>
            )}
            {isCollapsed && (
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                title="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}