'use client'

import { useState } from 'react'

export default function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'New Event Created',
      message: 'Summer Youth Camp 2024 has been scheduled',
      time: '2 minutes ago',
      read: false,
      type: 'event'
    },
    {
      id: 2,
      title: 'Equipment Alert',
      message: 'Power fluctuation reported in Hub B',
      time: '15 minutes ago',
      read: false,
      type: 'alert'
    },
    {
      id: 3,
      title: 'Schedule Updated',
      message: 'Lunch shift 2 moved to 12:45 PM',
      time: '42 minutes ago',
      read: true,
      type: 'update'
    },
    {
      id: 4,
      title: 'New Personnel Added',
      message: 'Sarah Chen has been added to Operations team',
      time: '1 hour ago',
      read: true,
      type: 'personnel'
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read')
    setShowNotifications(false)
  }

  return (
    <header className="ml-64 w-[calc(100%-16rem)] h-16 sticky top-0 z-40 bg-white/80 backdrop-blur-xl flex justify-between items-center px-8 border-b border-slate-100">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96 group focus-within:ring-2 ring-primary/20 transition-all">
        <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium placeholder:text-slate-400" 
          placeholder="Search operations, personnel, or venues..." 
          type="text"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/15 z-50">
              <div className="p-4 border-b border-surface-container">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-on-surface">Notifications</h3>
                  <button 
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-surface-container hover:bg-surface-container-low transition-colors ${
                      !notification.read ? 'bg-surface-container-low/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'alert' ? 'bg-error/10 text-error' :
                        notification.type === 'event' ? 'bg-primary/10 text-primary' :
                        notification.type === 'update' ? 'bg-secondary/10 text-secondary' :
                        'bg-surface-container text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-sm">
                          {notification.type === 'alert' ? 'warning' :
                           notification.type === 'event' ? 'event' :
                           notification.type === 'update' ? 'update' : 'person'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-sm text-on-surface">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">{notification.message}</p>
                        <p className="text-[10px] text-on-surface-variant mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-surface-container">
                <button className="w-full text-center text-sm text-primary hover:bg-primary/5 py-2 rounded-lg transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900 leading-none">Operations Lead</p>
            <p className="text-[10px] text-slate-500 font-medium">Main Hub</p>
          </div>
          <img 
            alt="User Profile" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDstIf-FAqEF2Nz5r3eaMYyHD1zRFf1zuSBYurCeQ9RUmXccj1hn-YuLAVw-DToaqdHPt-qyF3GvoxNrAp2TRvcVT0JEgUMnx7mgcRLBHc1zS5JLGyf3QmpDKchBHFKyWqnAH2eGEjnXQN3S5Fl-cpyQHRcjor5OkTkTWOejsfuaAN_H7zYRXZfVS3tSpOgUiJ1LwK3UjPYFceNERNR3X3EHNmoN1a-sfz6edY3_O1kewIeUR9ASPpP2ugJ2v625PFCWAuENvqkCoc"
          />
        </div>
      </div>
    </header>
  )
}