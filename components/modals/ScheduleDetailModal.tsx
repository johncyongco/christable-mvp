'use client'

import { useState } from 'react'

interface ScheduleDetailModalProps {
  isOpen: boolean
  onClose: () => void
  schedule: {
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
}

export default function ScheduleDetailModal({ isOpen, onClose, schedule }: ScheduleDetailModalProps) {
  const [message, setMessage] = useState('')

  if (!isOpen) return null

  const scheduledTime = new Date(schedule.scheduledTime)
  const formattedDate = scheduledTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = scheduledTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message to schedule:', schedule.id, 'Message:', message)
      // In a real app, this would send a message/notification
      setMessage('')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Schedule Details</h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Schedule Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-on-surface mb-2">{schedule.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(schedule.status)}`}>
                      {schedule.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-on-surface-variant">
                      {formattedDate} at {formattedTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-on-surface-variant mb-1">Location</p>
                  <p className="font-medium text-on-surface">
                    {schedule.zone?.name || 'No location specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant mb-1">Team</p>
                  <p className="font-medium text-on-surface">
                    {schedule.team?.name || 'No team assigned'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant mb-1">Assigned To</p>
                  <p className="font-medium text-on-surface">
                    {schedule.user?.name || 'No one assigned'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant mb-1">Reminder</p>
                  <p className="font-medium text-on-surface">
                    {schedule.reminderMinutes ? `${schedule.reminderMinutes} minutes before` : 'No reminder'}
                  </p>
                </div>
              </div>

              {/* Description */}
              {schedule.description && (
                <div>
                  <p className="text-sm text-on-surface-variant mb-2">Description</p>
                  <p className="text-on-surface bg-surface-container-low p-4 rounded-lg">
                    {schedule.description}
                  </p>
                </div>
              )}

              {/* Message Template */}
              {schedule.messageTemplate && (
                <div>
                  <p className="text-sm text-on-surface-variant mb-2">Message Template</p>
                  <p className="text-on-surface bg-surface-container-low p-4 rounded-lg">
                    {schedule.messageTemplate}
                  </p>
                </div>
              )}

              {/* Message Input */}
              <div>
                <p className="text-sm text-on-surface-variant mb-2">Send Message</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message to send..."
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-on-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}