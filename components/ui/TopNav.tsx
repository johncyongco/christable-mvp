'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Bell, User, Users, Calendar, Map, Activity, Menu, X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'
import PingButton from './PingButton'
import { useSidebar } from './SidebarContext'

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { isCollapsed, toggleSidebar } = useSidebar()
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Mock messages data
  const messages = [
    { id: 1, from: 'Sarah Johnson', text: 'Running 5 minutes late to worship session', time: '2 min ago' },
    { id: 2, from: 'Michael Chen', text: 'Kitchen supplies restocked', time: '15 min ago' },
    { id: 3, from: 'Medical Team', text: 'First aid station set up at Zone B', time: '1 hour ago' },
    { id: 4, from: 'David Wilson', text: 'Need assistance with audio equipment', time: '2 hours ago' },
  ]

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
       <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-brand-white border-b border-brand-light">
        <div className="flex-1 px-4 flex justify-between">
           <div className="flex-1 flex items-center">
            <button
              type="button"
               className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-brand-light hover:text-brand-dark"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            
            <button
              type="button"
               className="hidden md:inline-flex -ml-2 -mt-0.5 h-12 w-12 items-center justify-center rounded-md text-brand-light hover:text-brand-dark"
              onClick={toggleSidebar}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="sr-only">Toggle sidebar</span>
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-5 w-5 text-brand-light" />
                </div>
                <input
                  id="search"
                  name="search"
                   className="block w-full pl-10 pr-3 py-2 border border-brand-light rounded-lg leading-5 bg-brand-white placeholder-brand-light focus:outline-none focus:placeholder-brand-dark focus:ring-1 focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
                  placeholder="Search people, teams, events..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
           <div className="ml-4 flex items-center space-x-4">
            <PingButton />
            
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                 className="p-1 rounded-full text-brand-light hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal relative"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                 <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-brand-coral ring-2 ring-brand-white" />
              </button>
              
              {/* Notifications dropdown */}
              {showNotifications && (
                 <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-brand-white ring-1 ring-black ring-opacity-5 divide-y divide-brand-light z-20">
                  <div className="py-1">
                     <div className="px-4 py-2 text-xs font-semibold text-brand-dark uppercase tracking-wider">
                       Notifications
                     </div>
                     <div className="px-4 py-2 text-xs font-semibold text-brand-dark uppercase tracking-wider border-t border-brand-light">
                       Messages
                     </div>
                    {messages.map((message) => (
                       <div key={message.id} className="px-4 py-3 hover:bg-brand-light">
                         <div className="flex items-start">
                           <MessageSquare className="h-4 w-4 text-brand-light mt-0.5 mr-2" />
                           <div className="flex-1">
                             <p className="text-sm font-medium text-brand-dark">{message.from}</p>
                             <p className="text-sm text-brand-dark truncate">{message.text}</p>
                             <p className="text-xs text-brand-light mt-1">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-2 border-t">
                      <button className="w-full text-center text-sm font-medium text-primary-600 hover:text-primary-500">
                        View all messages
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-0 flex">
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">Christable</span>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <a
                    href="/dashboard"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 bg-gray-100"
                  >
                    <Home className="mr-4 h-6 w-6 text-gray-400" />
                    Dashboard
                  </a>
                  <a
                    href="/people"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Users className="mr-4 h-6 w-6 text-gray-400" />
                    People
                  </a>
                  <a
                    href="/teams"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Users2 className="mr-4 h-6 w-6 text-gray-400" />
                    Teams
                  </a>
                  <a
                    href="/schedule"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Calendar className="mr-4 h-6 w-6 text-gray-400" />
                    Schedule
                  </a>
                  <a
                    href="/map"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Map className="mr-4 h-6 w-6 text-gray-400" />
                    Map & Zones
                  </a>
                  <a
                    href="/activity"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Activity className="mr-4 h-6 w-6 text-gray-400" />
                    Activity Feed
                  </a>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-base font-medium text-gray-800">Admin User</div>
                    <div className="text-sm font-medium text-gray-500">Event Coordinator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Temporary icons for mobile menu
const Home = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const Users2 = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
  </svg>
)