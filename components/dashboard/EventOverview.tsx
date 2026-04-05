'use client'

import { Users, Users2, Calendar, Bell, Activity, UserCheck, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

const stats = [
  { id: 1, name: 'Total People', value: '24', icon: Users, change: '+2', changeType: 'positive' },
  { id: 2, name: 'Total Teams', value: '6', icon: Users2, change: '+1', changeType: 'positive' },
  { id: 3, name: 'Active Schedules', value: '8', icon: Calendar, change: '+3', changeType: 'positive' },
  { id: 4, name: 'Recent Pings', value: '42', icon: Bell, change: '+12', changeType: 'positive' },
  { id: 5, name: 'Live Activity', value: '18', icon: Activity, change: '+5', changeType: 'positive' },
  { id: 6, name: 'Active Users', value: '18', icon: UserCheck, change: '+3', changeType: 'positive' },
]

export default function EventOverview() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Summer Youth Camp 2024</h3>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4" />
                <span>Day 2 • {currentTime}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1.5 h-2 w-2 rounded-full bg-success-500"></div>
                <span>Event Active</span>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary">
            Refresh Data
          </button>
        </div>
      </div>
      
      <div className="card-body">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-teal/10 rounded-lg p-4">
              <h4 className="text-sm font-medium text-brand-teal">Current Activity</h4>
              <p className="mt-1 text-lg font-semibold text-brand-teal">Worship Session</p>
              <p className="mt-1 text-sm text-brand-teal">Session Hall • 45 minutes remaining</p>
            </div>
          
           <div className="bg-brand-gold/10 rounded-lg p-4">
             <h4 className="text-sm font-medium text-brand-gold">Next Activity</h4>
             <p className="mt-1 text-lg font-semibold text-brand-gold">Break & Snacks</p>
             <p className="mt-1 text-sm text-brand-gold">15:15 • Kitchen Area</p>
           </div>
        </div>
      </div>
    </div>
  )
}