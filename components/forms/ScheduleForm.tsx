'use client'

import { useState } from 'react'
import { X, Calendar, Clock, MapPin, Users, Bell, Repeat } from 'lucide-react'

interface ScheduleFormProps {
  isOpen: boolean
  onClose: () => void
  schedule?: any
}

export default function ScheduleForm({ isOpen, onClose, schedule }: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    title: schedule?.title || '',
    description: schedule?.description || '',
    scheduledDate: schedule?.scheduledTime ? new Date(schedule.scheduledTime).toISOString().split('T')[0] : '',
    scheduledTime: schedule?.scheduledTime ? new Date(schedule.scheduledTime).toISOString().split('T')[1].substring(0, 5) : '09:00',
    teamId: schedule?.teamId || '',
    zoneId: schedule?.zoneId || '',
    userId: schedule?.userId || '',
    reminderMinutes: schedule?.reminderMinutes || 15,
    messageTemplate: schedule?.messageTemplate || '',
    isRecurring: schedule?.isRecurring || false,
    recurrencePattern: schedule?.recurrencePattern || 'daily',
  })

  const teams = [
    { id: '1', name: 'Worship Team' },
    { id: '2', name: 'Kitchen Team' },
    { id: '3', name: 'Medical Team' },
    { id: '4', name: 'Registration Team' },
    { id: '5', name: 'All Teams' },
  ]

  const zones = [
    { id: '1', name: 'Session Hall' },
    { id: '2', name: 'Kitchen' },
    { id: '3', name: 'First Aid Station' },
    { id: '4', name: 'Registration Desk' },
    { id: '5', name: 'Activity Hall' },
  ]

  const people = [
    { id: '1', name: 'Sarah Johnson', role: 'Worship Leader' },
    { id: '2', name: 'Michael Chen', role: 'Kitchen Staff' },
    { id: '3', name: 'David Wilson', role: 'First Aid' },
    { id: '4', name: 'Maria Garcia', role: 'Registration' },
  ]

  const reminderOptions = [
    { value: 5, label: '5 minutes before' },
    { value: 15, label: '15 minutes before' },
    { value: 30, label: '30 minutes before' },
    { value: 60, label: '1 hour before' },
    { value: 120, label: '2 hours before' },
    { value: 1440, label: '1 day before' },
  ]

  const recurrenceOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekdays', label: 'Weekdays only' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Combine date and time
    const scheduledTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
    
    // In production, this would make an API call
    console.log('Submitting schedule form:', {
      ...formData,
      scheduledTime
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {schedule ? 'Edit Schedule' : 'Create New Schedule'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {schedule ? 'Update schedule details' : 'Schedule an activity or reminder'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Worship Session, Break Time"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Brief description of the activity"
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="scheduledDate"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      id="scheduledTime"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 mb-1">
                      Team
                    </label>
                    <select
                      id="teamId"
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select team...</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="zoneId" className="block text-sm font-medium text-gray-700 mb-1">
                      Zone
                    </label>
                    <select
                      id="zoneId"
                      name="zoneId"
                      value={formData.zoneId}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select zone...</option>
                      {zones.map(zone => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                      Person
                    </label>
                    <select
                      id="userId"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select person...</option>
                      {people.map(person => (
                        <option key={person.id} value={person.id}>
                          {person.name} ({person.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reminder Settings */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-gray-400" />
                      <h4 className="text-sm font-medium text-gray-900">Reminder Settings</h4>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reminderMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                        Send Reminder
                      </label>
                      <select
                        id="reminderMinutes"
                        name="reminderMinutes"
                        value={formData.reminderMinutes}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="0">No reminder</option>
                        {reminderOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="messageTemplate" className="block text-sm font-medium text-gray-700 mb-1">
                        Reminder Message
                      </label>
                      <input
                        type="text"
                        id="messageTemplate"
                        name="messageTemplate"
                        value={formData.messageTemplate}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Custom message for reminder"
                      />
                    </div>
                  </div>
                </div>

                {/* Recurrence */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Repeat className="mr-2 h-5 w-5 text-gray-400" />
                      <h4 className="text-sm font-medium text-gray-900">Recurrence</h4>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isRecurring"
                        name="isRecurring"
                        checked={formData.isRecurring}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isRecurring" className="ml-2 text-sm text-gray-700">
                        Repeat this schedule
                      </label>
                    </div>
                  </div>
                  
                  {formData.isRecurring && (
                    <div>
                      <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700 mb-1">
                        Repeat Pattern
                      </label>
                      <div className="flex space-x-2">
                        {recurrenceOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, recurrencePattern: option.value }))}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                              formData.recurrencePattern === option.value
                                ? 'bg-primary-100 text-primary-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Settings */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Action Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Send Ping on Trigger</p>
                        <p className="text-xs text-gray-500">Automatically ping assigned team/person</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Send Slack Notification</p>
                        <p className="text-xs text-gray-500">Notify via Slack channels</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Trigger Automation</p>
                        <p className="text-xs text-gray-500">Run n8n workflows</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {schedule ? 'Update Schedule' : 'Create Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}