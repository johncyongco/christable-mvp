'use client'

import { useState } from 'react'
import { Bell, Clock, AlertCircle, CheckCircle, XCircle, Info, Filter } from 'lucide-react'

const notifications = [
  {
    id: '1',
    title: 'New message from Sarah Johnson',
    description: 'Sarah sent a message: "Running 5 minutes late to the worship team meeting"',
    type: 'message',
    time: '2 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'David Wilson needs attention',
    description: 'David has been marked as "Needs Attention" in the First Aid Station',
    type: 'alert',
    time: '15 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    title: 'Schedule update',
    description: 'Worship team practice has been moved to 3:00 PM in the Session Hall',
    type: 'info',
    time: '1 hour ago',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Team check-in completed',
    description: 'Kitchen team has completed their morning check-in',
    type: 'success',
    time: '2 hours ago',
    read: true,
    priority: 'low'
  },
  {
    id: '5',
    title: 'Zone status change',
    description: 'Registration Desk zone status changed from "Active" to "Idle"',
    type: 'info',
    time: '3 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: '6',
    title: 'System sync completed',
    description: 'Slack integration sync completed successfully',
    type: 'success',
    time: '5 hours ago',
    read: true,
    priority: 'low'
  },
  {
    id: '7',
    title: 'Ping sent successfully',
    description: 'Ping was successfully delivered to Michael Chen',
    type: 'success',
    time: 'Yesterday',
    read: true,
    priority: 'low'
  },
  {
    id: '8',
    title: 'Backup reminder',
    description: 'Daily system backup is scheduled for 11:00 PM tonight',
    type: 'info',
    time: 'Yesterday',
    read: true,
    priority: 'low'
  },
]

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all')
  const [notificationsList, setNotificationsList] = useState(notifications)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return <Bell className="h-5 w-5 text-blue-500" />
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'info': return <Info className="h-5 w-5 text-blue-500" />
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />
      default: return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500'
      case 'medium': return 'border-l-4 border-yellow-500'
      case 'low': return 'border-l-4 border-green-500'
      default: return 'border-l-4 border-gray-300'
    }
  }

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const filteredNotifications = filter === 'all' 
    ? notificationsList 
    : filter === 'unread' 
      ? notificationsList.filter(n => !n.read)
      : notificationsList.filter(n => n.type === filter)

  const unreadCount = notificationsList.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-600">
            Live updates, activities, and system notifications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn btn-secondary"
            >
              Mark all as read
            </button>
          )}
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  All Notifications ({filteredNotifications.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="form-select text-sm"
                  >
                    <option value="all">All notifications</option>
                    <option value="unread">Unread only</option>
                    <option value="message">Messages</option>
                    <option value="alert">Alerts</option>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {filter === 'unread' 
                        ? 'You have no unread notifications' 
                        : 'No notifications match your filter'}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        bg-white rounded-lg border border-gray-200 p-4
                        ${getPriorityColor(notification.priority)}
                        ${!notification.read ? 'bg-blue-50' : ''}
                        hover:bg-gray-50 transition-colors
                      `}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {notification.description}
                          </p>
                          {!notification.read && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Notification Summary</h3>
            </div>
            <div className="card-body">
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-600">Total</dt>
                  <dd className="text-sm font-semibold text-gray-900">{notificationsList.length}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-600">Unread</dt>
                  <dd className="text-sm font-semibold text-gray-900">{unreadCount}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-600">High Priority</dt>
                  <dd className="text-sm font-semibold text-gray-900">
                    {notificationsList.filter(n => n.priority === 'high').length}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-600">Today</dt>
                  <dd className="text-sm font-semibold text-gray-900">
                    {notificationsList.filter(n => n.time.includes('minute') || n.time.includes('hour')).length}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Messages</span>
                    <span className="ml-auto text-sm font-medium text-gray-900">
                      {notificationsList.filter(n => n.type === 'message').length}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Alerts</span>
                    <span className="ml-auto text-sm font-medium text-gray-900">
                      {notificationsList.filter(n => n.type === 'alert').length}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Info</span>
                    <span className="ml-auto text-sm font-medium text-gray-900">
                      {notificationsList.filter(n => n.type === 'info').length}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Success</span>
                    <span className="ml-auto text-sm font-medium text-gray-900">
                      {notificationsList.filter(n => n.type === 'success').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setNotificationsList([])
                    alert('All notifications cleared!')
                  }}
                  className="w-full btn btn-secondary"
                >
                  Clear All Notifications
                </button>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            </div>
            <div className="card-body">
              <p className="text-sm text-gray-600 mb-4">
                Configure how you receive notifications for different event types.
              </p>
              <button
                onClick={() => alert('Notification settings will be available soon')}
                className="w-full btn btn-primary"
              >
                Configure Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}