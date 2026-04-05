'use client'

import { useState } from 'react'
import { X, Bell, User, Users, MapPin, MessageSquare, Megaphone, CheckSquare, Send } from 'lucide-react'

interface PingFormProps {
  isOpen: boolean
  onClose: () => void
  defaultAction?: string | null
}

const pingActions = [
  { id: 'person', label: 'Ping Person', icon: User, description: 'Send a ping to an individual' },
  { id: 'team', label: 'Ping Team', icon: Users, description: 'Ping all members of a team' },
  { id: 'area', label: 'Ping Area', icon: MapPin, description: 'Ping everyone in a specific zone' },
  { id: 'broadcast', label: 'Broadcast', icon: Megaphone, description: 'Announcement to all teams' },
  { id: 'task', label: 'Assign Task', icon: CheckSquare, description: 'Assign a task with details' },
]

const people = [
  { id: '1', name: 'Sarah Johnson', role: 'Worship Leader', team: 'Worship Team' },
  { id: '2', name: 'Michael Chen', role: 'Kitchen Staff', team: 'Kitchen Team' },
  { id: '3', name: 'David Wilson', role: 'First Aid', team: 'Medical Team' },
  { id: '4', name: 'Maria Garcia', role: 'Registration', team: 'Registration Team' },
]

const teams = [
  { id: '1', name: 'Worship Team', memberCount: 8 },
  { id: '2', name: 'Kitchen Team', memberCount: 4 },
  { id: '3', name: 'Medical Team', memberCount: 2 },
  { id: '4', name: 'Registration Team', memberCount: 3 },
]

const zones = [
  { id: '1', name: 'Session Hall', peopleCount: 8 },
  { id: '2', name: 'Kitchen', peopleCount: 4 },
  { id: '3', name: 'First Aid Station', peopleCount: 2 },
  { id: '4', name: 'Registration Desk', peopleCount: 3 },
]

export default function PingForm({ isOpen, onClose, defaultAction }: PingFormProps) {
  const [selectedAction, setSelectedAction] = useState(defaultAction || 'person')
  const [formData, setFormData] = useState({
    targetId: '',
    message: 'You are pinged',
    sendSlack: true,
    triggerAutomation: true,
    priority: 'normal',
    taskTitle: '',
    taskDescription: '',
  })
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    // Prepare data with default message if empty
    const sendData = {
      action: selectedAction,
      ...formData,
      // Use default message if empty (for non-task actions)
      message: selectedAction === 'task' ? formData.message : (formData.message.trim() || 'You are pinged')
    }
    
    // In production, this would make an API call to /api/ping/[type]
    console.log('Sending ping:', sendData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSending(false)
    onClose()
    
    // Show success notification
    alert(`${pingActions.find(a => a.id === selectedAction)?.label} sent successfully!`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
  }

  const getTargetOptions = () => {
    switch (selectedAction) {
      case 'person':
      case 'task': // Task assignment also needs person selection
        return people.map(p => ({ value: p.id, label: `${p.name} (${p.role})` }))
      case 'team':
        return teams.map(t => ({ value: t.id, label: `${t.name} (${t.memberCount} members)` }))
      case 'area':
        return zones.map(z => ({ value: z.id, label: `${z.name} (${z.peopleCount} people)` }))
      default:
        return []
    }
  }

  const getActionIcon = () => {
    const action = pingActions.find(a => a.id === selectedAction)
    return action ? action.icon : Bell
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
                  {(() => {
                    const Icon = getActionIcon()
                    return <Icon className="h-5 w-5 text-primary-600" />
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {pingActions.find(a => a.id === selectedAction)?.label}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {pingActions.find(a => a.id === selectedAction)?.description}
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

            {/* Action Selector */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {pingActions.map((action) => {
                  const Icon = action.icon
                  const isSelected = selectedAction === action.id
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => setSelectedAction(action.id)}
                      className={`
                        flex flex-col items-center p-3 rounded-lg border-2 transition-all
                        ${isSelected 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className={`
                        p-2 rounded-lg mb-2
                        ${isSelected ? 'bg-primary-100' : 'bg-gray-100'}
                      `}>
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-primary-600' : 'text-gray-600'}`} />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                        {action.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Target Selection */}
                {(selectedAction === 'person' || selectedAction === 'team' || selectedAction === 'area' || selectedAction === 'task') && (
                  <div>
                    <label htmlFor="targetId" className="block text-sm font-medium text-gray-700 mb-1">
                      Select {selectedAction === 'person' || selectedAction === 'task' ? 'Person' : selectedAction === 'team' ? 'Team' : 'Area'} *
                    </label>
                    <select
                      id="targetId"
                      name="targetId"
                      value={formData.targetId}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Choose {selectedAction === 'person' || selectedAction === 'task' ? 'a person' : selectedAction === 'team' ? 'a team' : 'an area'}...</option>
                      {getTargetOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Task Title (for task assignment) */}
                {selectedAction === 'task' && (
                  <div>
                    <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      id="taskTitle"
                      name="taskTitle"
                      value={formData.taskTitle}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Prepare evening snacks"
                      required
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedAction === 'task' ? 'Task Description' : 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={selectedAction === 'task' ? 4 : 3}
                    className="form-textarea"
                    placeholder={
                      selectedAction === 'task' 
                        ? 'Describe the task, requirements, and deadlines...' 
                        : 'Custom message (optional)'
                    }
                    required={selectedAction === 'task'}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedAction === 'task' 
                      ? 'Include all necessary details for task completion'
                      : 'Default message: "You are pinged". Leave empty for notification only.'
                    }
                  </p>
                </div>

                {/* Task Details (for task assignment) */}
                {selectedAction === 'task' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details
                      </label>
                      <input
                        type="text"
                        id="taskDescription"
                        name="taskDescription"
                        value={formData.taskDescription}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Location, resources, etc."
                      />
                    </div>
                  </div>
                )}

                {/* Delivery Options */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Delivery Options</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Send Slack Notification</p>
                        <p className="text-xs text-gray-500">Deliver via Slack if available</p>
                      </div>
                      <input
                        type="checkbox"
                        id="sendSlack"
                        name="sendSlack"
                        checked={formData.sendSlack}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Trigger Automation</p>
                        <p className="text-xs text-gray-500">Run n8n workflows for this ping</p>
                      </div>
                      <input
                        type="checkbox"
                        id="triggerAutomation"
                        name="triggerAutomation"
                        checked={formData.triggerAutomation}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>

                    {selectedAction === 'broadcast' && (
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                          Broadcast Priority
                        </label>
                        <div className="flex space-x-2">
                          {['normal', 'high', 'urgent'].map((priority) => (
                            <button
                              key={priority}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, priority }))}
                              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                                formData.priority === priority
                                  ? priority === 'urgent' 
                                    ? 'bg-danger-100 text-danger-800'
                                    : priority === 'high'
                                    ? 'bg-warning-100 text-warning-800'
                                    : 'bg-primary-100 text-primary-800'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                  disabled={isSending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send {pingActions.find(a => a.id === selectedAction)?.label}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}