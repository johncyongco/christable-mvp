'use client'

import { useState, useEffect } from 'react'
import AddScheduleModal from '@/components/modals/AddScheduleModal'
import ScheduleDetailModal from '@/components/modals/ScheduleDetailModal'
import { useToast } from '@/lib/hooks/useToast'
import { useModal } from '@/lib/hooks/useModal'

interface Schedule {
  id: string
  title: string
  description: string | null
  scheduledTime: string
  status: string
  reminderMinutes: number | null
  messageTemplate: string | null
  team: { id: string; name: string } | null
  zone: { id: string; name: string } | null
  user: { id: string; name: string; imageUrl: string | null } | null
}

export default function SchedulePage() {
  const { success, error } = useToast()
  const scheduleModal = useModal<Schedule>()
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/schedules')
      if (!response.ok) throw new Error('Failed to fetch schedules')
      const data = await response.json()
      if (data.success) {
        setSchedules(data.data)
      }
    } catch (err) {
      error('Error', 'Failed to load schedule data')
      console.error('Failed to fetch schedules:', err)
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    await fetchSchedules()
    setIsLoading(false)
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await fetchSchedules()
    setIsRefreshing(false)
    success('Refreshed', 'Schedule data updated')
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleScheduleClick = (schedule: Schedule) => {
    scheduleModal.openModal(schedule)
  }

  const handleAddScheduleSave = async (data: any) => {
    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to add schedule')
      
      const result = await response.json()
      if (result.success) {
        success('Added', `${data.title} scheduled successfully`)
        await fetchSchedules() // Refresh the list
        setShowAddScheduleModal(false)
      }
    } catch (err) {
      error('Error', 'Failed to add schedule')
      console.error('Failed to add schedule:', err)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatPeriod = (dateString: string) => {
    const date = new Date(dateString)
    const hour = date.getHours()
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    return 'Evening'
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getBorderColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'border-yellow-500'
      case 'active':
        return 'border-green-500'
      case 'completed':
        return 'border-blue-500'
      case 'cancelled':
        return 'border-red-500'
      default:
        return 'border-gray-500'
    }
  }

  const getBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500'
      case 'active':
        return 'bg-green-500'
      case 'completed':
        return 'bg-blue-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const pendingSchedules = schedules.filter(s => s.status === 'pending').length
  const activeSchedules = schedules.filter(s => s.status === 'active').length
  const completedSchedules = schedules.filter(s => s.status === 'completed').length

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline mb-2">Schedule</h2>
          <p className="text-on-surface-variant font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {schedules.length} Events
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            <span className={`material-symbols-outlined ${isRefreshing ? 'animate-spin' : ''}`}>
              {isRefreshing ? 'refresh' : 'sync'}
            </span>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={() => setShowAddScheduleModal(true)}
            className="flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-on-primary font-bold hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>add_circle</span>
            Add Schedule
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 group hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
            </div>
            <span className="text-xs font-bold text-on-secondary-container px-2 py-1 bg-secondary-container/50 rounded-full uppercase">Live</span>
          </div>
          <p className="text-on-surface-variant font-bold text-xs tracking-wider uppercase mb-1">Completed</p>
          <h3 className="text-3xl font-black text-on-surface">
            {completedSchedules} <span className="text-sm font-medium text-on-surface-variant">/ {schedules.length} Tasks</span>
          </h3>
          <div className="mt-4 w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-secondary h-full rounded-full" 
              style={{ width: `${schedules.length > 0 ? (completedSchedules / schedules.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-primary p-6 rounded-xl text-on-primary relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined text-white">bolt</span>
            </div>
          </div>
          <p className="text-primary-fixed text-xs tracking-wider uppercase mb-1">Current Activity</p>
          <h3 className="text-xl font-bold mb-1">
            {activeSchedules > 0 ? `${activeSchedules} Active` : 'No Active'}
          </h3>
          <p className="text-primary-fixed text-sm">
            {activeSchedules > 0 ? `${activeSchedules} schedules in progress` : 'No active schedules'}
          </p>
        </div>
        
        <div className="bg-tertiary-container p-6 rounded-xl text-on-tertiary-container relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined text-white">schedule</span>
            </div>
          </div>
          <p className="text-tertiary-fixed-dim font-bold text-xs tracking-wider uppercase mb-1">Up Next</p>
          <h3 className="text-xl font-bold mb-1">
            {pendingSchedules} Pending
          </h3>
          <p className="text-tertiary-fixed-dim text-sm">
            {pendingSchedules > 0 ? `${pendingSchedules} schedules awaiting` : 'No pending schedules'}
          </p>
        </div>
      </div>
      
      <div className="bg-surface-container-low rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold font-headline">Timeline View</h3>
          <div className="flex gap-2 p-1 bg-surface-container-high rounded-lg">
            <button className="px-4 py-1.5 text-sm font-bold bg-white shadow-sm rounded-md text-primary">Day</button>
            <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">Week</button>
            <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">Month</button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-8 animate-pulse">
                <div className="w-20 text-right shrink-0 pt-2">
                  <div className="h-4 bg-surface-container-high rounded w-12 ml-auto"></div>
                  <div className="h-3 bg-surface-container-high rounded w-8 ml-auto mt-1"></div>
                </div>
                <div className="relative pt-2">
                  <div className="w-3 h-3 rounded-full bg-surface-container-high"></div>
                </div>
                <div className="flex-1 bg-surface-container-high p-6 rounded-lg">
                  <div className="space-y-2">
                    <div className="h-4 bg-surface-container-low rounded w-3/4"></div>
                    <div className="h-3 bg-surface-container-low rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : schedules.length > 0 ? (
          <div className="space-y-6 relative before:content-[''] before:absolute before:left-[111px] before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant/30">
            {schedules.slice(0, 5).map((schedule) => (
              <div 
                key={schedule.id} 
                onClick={() => handleScheduleClick(schedule)}
                className="flex gap-8 group cursor-pointer"
              >
                <div className="w-20 text-right shrink-0 pt-2">
                  <p className="text-sm font-black text-on-surface">{formatTime(schedule.scheduledTime)}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase">{formatPeriod(schedule.scheduledTime)}</p>
                </div>
                <div className="relative pt-2">
                  <div className={`absolute left-[-5px] top-4 w-3 h-3 rounded-full border-2 border-surface-container-low ${getBgColor(schedule.status)} ring-4 ${getBgColor(schedule.status)}/10`}></div>
                </div>
                <div className={`flex-1 bg-surface-container-lowest p-6 rounded-lg shadow-sm border-l-4 ${getBorderColor(schedule.status)} hover:translate-x-1 transition-transform`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-on-surface mb-1">{schedule.title}</h4>
                      <p className="text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {schedule.zone?.name || 'No location'}
                      </p>
                      {schedule.description && (
                        <p className="text-sm text-on-surface-variant mt-2">{schedule.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {schedule.status.toUpperCase()}
                      </span>
                      {schedule.team && (
                        <div className="w-10 h-10 bg-tertiary/5 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-tertiary">groups</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex gap-8 items-center -my-2 relative z-10">
              <div className="w-20 text-right">
                <p className="text-xs font-black text-primary">{formatTime(new Date().toISOString())}</p>
              </div>
              <div className="flex-1 h-[2px] bg-primary relative before:content-[''] before:absolute before:left-[-6px] before:top-[-4px] before:w-2.5 before:h-2.5 before:bg-primary before:rounded-full after:content-['NOW'] after:absolute after:right-0 after:top-[-20px] after:text-[9px] after:font-black after:text-primary"></div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-on-surface-variant">schedule</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">No schedules yet</h3>
            <p className="text-on-surface-variant mb-6">Add your first schedule to get started</p>
            <button 
              onClick={() => setShowAddScheduleModal(true)}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-on-primary font-bold hover:shadow-xl hover:shadow-primary/20 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>add_circle</span>
              Add Schedule
            </button>
          </div>
        )}
      </div>

      {showAddScheduleModal && (
        <AddScheduleModal
          isOpen={showAddScheduleModal}
          onClose={() => setShowAddScheduleModal(false)}
          onSave={handleAddScheduleSave}
        />
      )}

      {scheduleModal.isOpen && scheduleModal.data && (
        <ScheduleDetailModal
          isOpen={scheduleModal.isOpen}
          onClose={scheduleModal.closeModal}
          schedule={scheduleModal.data}
        />
      )}
    </div>
  )