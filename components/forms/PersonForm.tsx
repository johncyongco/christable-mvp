'use client'

import { useState } from 'react'
import { X, User, Upload, Check } from 'lucide-react'

interface Team {
  id: string
  name: string
}

interface Zone {
  id: string
  name: string
}

interface PersonFormProps {
  isOpen: boolean
  onClose: () => void
  person?: any
  teams?: Team[]
  zones?: Zone[]
}

export default function PersonForm({ isOpen, onClose, person, teams = [], zones = [] }: PersonFormProps) {
  const [formData, setFormData] = useState({
    name: person?.name || '',
    role: person?.role || '',
    phone: person?.phone || '',
    email: person?.email || '',
    messageNotes: person?.messageNotes || '',
    status: person?.status || 'active',
    teamId: person?.teamId || '',
    zoneId: person?.zoneId || '',
    slackChannelId: person?.slackChannelId || '',
    slackUserId: person?.slackUserId || '',
  })

  // Default teams if none provided
  const defaultTeams: Team[] = [
    { id: '1', name: 'Worship Team' },
    { id: '2', name: 'Kitchen Team' },
    { id: '3', name: 'Medical Team' },
    { id: '4', name: 'Registration Team' },
  ]

  // Default zones if none provided
  const defaultZones: Zone[] = [
    { id: '1', name: 'Session Hall' },
    { id: '2', name: 'Kitchen' },
    { id: '3', name: 'First Aid Station' },
    { id: '4', name: 'Registration Desk' },
  ]

  const teamsToUse = teams.length > 0 ? teams : defaultTeams
  const zonesToUse = zones.length > 0 ? zones : defaultZones

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-success-100 text-success-800' },
    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
    { value: 'away', label: 'Away', color: 'bg-warning-100 text-warning-800' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In production, this would make an API call
    console.log('Submitting person form:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {person ? 'Edit Person' : 'Add New Person'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {person ? 'Update person details' : 'Create a new person record'}
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
                {/* Profile Image Upload */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Worship Leader"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="person@example.com"
                    />
                  </div>
                </div>

                 {/* Status - Only show when editing existing person */}
                 {person && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Status
                     </label>
                     <div className="flex space-x-2">
                       {statusOptions.map((option) => (
                         <button
                           key={option.value}
                           type="button"
                           onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                           className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                             formData.status === option.value
                               ? option.color
                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                           }`}
                         >
                           {formData.status === option.value && (
                             <Check className="inline mr-1 h-4 w-4" />
                           )}
                           {option.label}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}

                {/* Team and Zone Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 mb-1">
                      Team Assignment
                    </label>
                    <select
                      id="teamId"
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select a team...</option>
                      {teamsToUse.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="zoneId" className="block text-sm font-medium text-gray-700 mb-1">
                      Zone Assignment
                    </label>
                    <select
                      id="zoneId"
                      name="zoneId"
                      value={formData.zoneId}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select a zone...</option>
                      {zonesToUse.map(zone => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                 {/* Slack Integration */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label htmlFor="slackChannelId" className="block text-sm font-medium text-gray-700 mb-1">
                       Slack Channel ID
                     </label>
                     <input
                       type="text"
                       id="slackChannelId"
                       name="slackChannelId"
                       value={formData.slackChannelId}
                       onChange={handleChange}
                       className="form-input"
                       placeholder="C1234567890"
                     />
                     <p className="mt-1 text-xs text-gray-500">
                       Team channel for group notifications
                     </p>
                   </div>
                   
                   <div>
                     <label htmlFor="slackUserId" className="block text-sm font-medium text-gray-700 mb-1">
                       Slack User ID
                     </label>
                     <input
                       type="text"
                       id="slackUserId"
                       name="slackUserId"
                       value={formData.slackUserId}
                       onChange={handleChange}
                       className="form-input"
                       placeholder="U1234567890"
                     />
                     <p className="mt-1 text-xs text-gray-500">
                       User ID for direct messages
                     </p>
                   </div>
                 </div>

                 {/* Message Notes - Only show when editing existing person */}
                 {person && (
                   <div>
                     <label htmlFor="messageNotes" className="block text-sm font-medium text-gray-700 mb-1">
                       Message Notes / Instructions
                     </label>
                     <textarea
                       id="messageNotes"
                       name="messageNotes"
                       value={formData.messageNotes}
                       onChange={handleChange}
                       rows={3}
                       className="form-textarea"
                       placeholder="Any special instructions or notes for messaging this person..."
                     />
                   </div>
                 )}
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
                  {person ? 'Update Person' : 'Create Person'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}