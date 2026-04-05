'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Schedule', href: '/schedule', icon: 'event' },
  { name: 'Venue Map', href: '/map', icon: 'map' },
  { name: 'Personnel', href: '/people', icon: 'group' },
  { name: 'Messages', href: '/messages', icon: 'chat_bubble' },
  { name: 'Settings', href: '/settings', icon: 'settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <aside className={`h-screen fixed left-0 top-0 bg-white flex flex-col p-6 z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>security</span>
          </div>
          {!isCollapsed && <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Christable</h1>}
        </div>
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
        )}
      </div>
      
      {!isCollapsed && (
        <button className="w-full py-3.5 px-4 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mb-8 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Create New Event
        </button>
      )}
      
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname?.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[13px] tracking-wide uppercase transition-all
                ${isActive 
                  ? 'text-primary bg-primary/5' 
                  : 'text-slate-500 hover:bg-slate-50'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.name : ''}
            >
              <span 
                className="material-symbols-outlined" 
                style={{ fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0' }}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
      
      {isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-8 text-slate-400 hover:text-slate-600 flex justify-center"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}
    </aside>
  )
}