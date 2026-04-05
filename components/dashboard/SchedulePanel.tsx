'use client'

import { Calendar, Clock, MapPin, Users, Bell, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import ScheduleForm from '../forms/ScheduleForm'
import { format } from 'date-fns'

const schedules = [
  {
    id: '1',
    title: 'Worship Session',
    description: 'Morning worship and praise',
    scheduledTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    team: 'Worship Team',
    zone: 'Session Hall',
    status: 'upcoming',
    reminder: '15 min before',
  },
  {
    id: '2',
    title: 'Break & Snacks',
    description: 'Refreshment break for all participants',
    scheduledTime: new Date(Date.now() + 90 * 60 * 1000), // 90 minutes from now
    team: 'Kitchen Team',
    zone: 'Kitchen & Dining Area',
    status: 'upcoming',
    reminder: '30 min before',
  },
  {
    id: '3',
    title: 'Workshop: Team Building',
    description: 'Interactive team building activities',
    scheduledTime: new Date(Date.now() + 180 * 60 * 1000), // 3 hours from now
    team: 'All Teams',
    zone: 'Activity Hall',
    status: 'upcoming',
    reminder: '1 hour before',
  },
  {
    id: '4',
    title: 'Evening Session',
    description: 'Closing remarks and announcements',
    scheduledTime: new Date(Date.now() + 300 * 60 * 1000), // 5 hours from now
    team: 'Leadership Team',
    zone: 'Session Hall',
    status: 'upcoming',
    reminder: '30 min before',
  },
]

export default function SchedulePanel() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800'
      case 'upcoming': return 'bg-primary-100 text-primary-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-danger-100 text-danger-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'upcoming': return 'Upcoming'
      case 'completed': return 'Completed'
      case 'cancelled': return 'Cancelled'
      default: return 'Unknown'
    }
  }

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm')
  }

  const getTimeRemaining = (date: Date) => {
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 0) return 'Past due'
    if (diffMins < 60) return `in ${diffMins} min`
    if (diffMins < 1440) return `in ${Math.floor(diffMins / 60)} hours`
    return `in ${Math.floor(diffMins / 1440)} days`
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
            <div className="flex space-x-2">
              <button className="btn btn-secondary">
                View Calendar
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="btn btn-primary"
              >
                Add Schedule
              </button>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-primary-50 rounded-lg flex flex-col items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <span className="text-xs font-medium text-primary-900 mt-1">
                            {formatTime(schedule.scheduledTime)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{schedule.title}</h4>
                            <p className="mt-1 text-sm text-gray-500">{schedule.description}</p>
                          </div>
                          <span className={`badge ${getStatusColor(schedule.status)}`}>
                            {getStatusText(schedule.status)}
                          </span>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                            <span>{getTimeRemaining(schedule.scheduledTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1.5 h-4 w-4 text-gray-400" />
                            <span>{schedule.team}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                            <span>{schedule.zone}</span>
                          </div>
                          <div className="flex items-center">
                            <Bell className="mr-1.5 h-4 w-4 text-gray-400" />
                            <span>Reminder: {schedule.reminder}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex items-center space-x-1">
                    <button
                      title="Send Reminder"
                      className="p-1.5 text-gray-400 hover:text-warning-600 hover:bg-warning-50 rounded"
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                    <button
                      title="More"
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScheduleForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        schedule={selectedSchedule}
      />
    </>
  )
}