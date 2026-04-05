'use client'

import { useState, useEffect } from 'react'
import { Bell, MessageSquare, Calendar, Users, RefreshCw, User, MapPin, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

const activityItems = [
    {
      id: '1',
      type: 'ping',
      icon: Bell,
      color: 'text-success-600 bg-success-50',
      title: 'Ping sent to Sarah Johnson',
      description: 'Reminder: Worship session starts in 10 minutes',
      time: 'Just now',
      user: 'Sarah Johnson',
      team: 'Worship Team',
    },
  {
    id: '2',
    type: 'message',
    icon: MessageSquare,
    color: 'text-success-600 bg-success-50',
    title: 'Message delivered to Kitchen Team',
    description: 'Snacks preparation update requested',
    time: '2 minutes ago',
    user: 'Michael Chen',
    team: 'Kitchen Team',
  },
  {
    id: '3',
    type: 'schedule',
    icon: Calendar,
    color: 'text-warning-600 bg-warning-50',
    title: 'Schedule triggered: Break Time',
    description: 'Automatic reminder sent to all teams',
    time: '5 minutes ago',
    user: null,
    team: 'All Teams',
  },
  {
    id: '4',
    type: 'team_ping',
    icon: Users,
    color: 'text-purple-600 bg-purple-50',
    title: 'Team ping expanded',
    description: 'Medical Team ping sent to 2 members',
    time: '10 minutes ago',
    user: null,
    team: 'Medical Team',
  },
  {
    id: '5',
    type: 'sync',
    icon: RefreshCw,
    color: 'text-indigo-600 bg-indigo-50',
    title: 'Google Sheets sync completed',
    description: '5 records updated from spreadsheet',
    time: '15 minutes ago',
    user: null,
    team: null,
  },
  {
    id: '6',
    type: 'user_update',
    icon: User,
    color: 'text-gray-600 bg-gray-50',
    title: 'User status updated',
    description: 'David Wilson marked as "Needs Attention"',
    time: '20 minutes ago',
    user: 'David Wilson',
    team: 'Medical Team',
  },
  {
    id: '7',
    type: 'zone',
    icon: MapPin,
    color: 'text-pink-600 bg-pink-50',
    title: 'Zone assignment updated',
    description: 'Session Hall zone modified',
    time: '25 minutes ago',
    user: null,
    team: null,
  },
]

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState(activityItems)
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)

  const addMockActivity = () => {
    const mockActivities = [
        {
          id: Date.now().toString(),
          type: 'ping',
          icon: Bell,
          color: 'text-success-600 bg-success-50',
          title: 'System ping sent',
          description: 'Automatic check-in request sent to idle members',
          time: 'Just now',
          user: 'System',
          team: 'System',
        },
      {
        id: (Date.now() + 1).toString(),
        type: 'message',
        icon: MessageSquare,
        color: 'text-success-600 bg-success-50',
        title: 'Broadcast announcement',
        description: 'Evening session details shared with all participants',
        time: 'Just now',
        user: null,
        team: 'All Teams',
      },
    ]
    
    setActivities(prev => [
      mockActivities[Math.floor(Math.random() * mockActivities.length)],
      ...prev.slice(0, 9) // Keep only 10 items
    ])
  }

  useEffect(() => {
    if (!isAutoRefresh) return

    const interval = setInterval(() => {
      addMockActivity()
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [isAutoRefresh])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ping': return Bell
      case 'message': return MessageSquare
      case 'schedule': return Calendar
      case 'team_ping': return Users
      case 'sync': return RefreshCw
      case 'user_update': return User
      case 'zone': return MapPin
      default: return Bell
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Live Activity Feed</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`p-1.5 rounded ${
                isAutoRefresh 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={isAutoRefresh ? 'Pause auto-refresh' : 'Resume auto-refresh'}
            >
              <RefreshCw className={`h-4 w-4 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            </button>
            <button className="btn btn-secondary text-sm">
              View All
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-body p-0">
        <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                    
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      {activity.user && (
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {activity.user}
                        </span>
                      )}
                      {activity.team && (
                        <span className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {activity.team}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <button
              onClick={addMockActivity}
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Load more activity
            </button>
            <p className="mt-1 text-xs text-gray-500">
              System updates every 30 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}