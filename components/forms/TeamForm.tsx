'use client'

import { useState } from 'react'
import { X, Users2, Check } from 'lucide-react'

interface Zone {
  id: string
  name: string
}

interface Person {
  id: string
  name: string
  role: string
}

interface TeamFormProps {
  isOpen: boolean
  onClose: () => void
  team?: any
  zones?: Zone[]
  people?: Person[]
}

export default function TeamForm({ isOpen, onClose, team, zones = [], people = [] }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: team?.name || '',
    description: team?.description || '',
    zoneId: team?.zoneId || '',
    memberIds: team?.memberIds || [],
  })

  // Default zones if none provided
  const defaultZones: Zone[] = [
    { id: '1', name: 'Session Hall' },
    { id: '2', name: 'Kitchen' },
    { id: '3', name: 'First Aid Station' },
    { id: '4', name: 'Registration Desk' },
    { id: '5', name: 'Activity Hall' },
    { id: '6', name: 'Parking Lot' },
  ]

  // Default people if none provided
  const defaultPeople: Person[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Worship Leader' },
    { id: '2', name: 'Michael Chen', role: 'Kitchen Staff' },
    { id: '3', name: 'David Wilson', role: 'First Aid' },
    { id: '4', name: 'Maria Garcia', role: 'Registration' },
    { id: '5', name: 'John Smith', role: 'Audio Technician' },
    { id: '6', name: 'Emily Brown', role: 'Volunteer Coordinator' },
  ]

  const zonesToUse = zones.length > 0 ? zones : defaultZones
  const peopleToUse = people.length > 0 ? people : defaultPeople

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In production, this would make an API call
    console.log('Submitting team form:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMemberToggle = (personId: string) => {
    setFormData(prev => {
      const memberIds = prev.memberIds.includes(personId)
        ? prev.memberIds.filter(id => id !== personId)
        : [...prev.memberIds, personId]
      return { ...prev, memberIds }
    })
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
                  <Users2 className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {team ? 'Edit Team' : 'Create New Team'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {team ? 'Update team details' : 'Create a new team for coordination'}
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
                {/* Team Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Worship Team, Kitchen Staff"
                    required
                  />
                </div>

                 {/* Description */}
                 <div>
                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                     Description
                   </label>
                   <textarea
                     id="description"
                     name="description"
                     value={formData.description}
                     onChange={handleChange}
                     rows={3}
                     className="form-textarea"
                     placeholder="Describe the team's purpose, responsibilities, or any special instructions..."
                   />
                 </div>

                 {/* Zone Assignment */}
                 <div>
                   <label htmlFor="zoneId" className="block text-sm font-medium text-gray-700 mb-1">
                     Zone Assignment (Optional)
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
                   <p className="mt-1 text-xs text-gray-500">
                     Assign this team to a specific zone for location-based coordination
                   </p>
                 </div>

                 {/* Team Members Selection */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Team Members
                   </label>
                    <div className="border border-gray-200 rounded-lg p-3 max-h-60 overflow-y-auto">
                      {peopleToUse.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No people available. Add people first in the People section.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {peopleToUse.map(person => (
                           <div key={person.id} className="flex items-center">
                             <input
                               type="checkbox"
                               id={`person-${person.id}`}
                               checked={formData.memberIds.includes(person.id)}
                               onChange={() => handleMemberToggle(person.id)}
                               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                             />
                             <label
                               htmlFor={`person-${person.id}`}
                               className="ml-3 flex-1 cursor-pointer"
                             >
                               <div className="text-sm font-medium text-gray-900">{person.name}</div>
                               <div className="text-xs text-gray-500">{person.role}</div>
                             </label>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                   <p className="mt-1 text-xs text-gray-500">
                     {formData.memberIds.length} {formData.memberIds.length === 1 ? 'person' : 'people'} selected
                   </p>
                 </div>

                {/* Team Members Preview (for edit mode) */}
                {team && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team Members
                    </label>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex -space-x-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                          >
                            <span className="text-xs font-medium text-gray-600">
                              {i + 1}
                            </span>
                          </div>
                        ))}
                        <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            +3
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        Manage Team Members →
                      </button>
                    </div>
                  </div>
                )}

                {/* Team Settings */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Team Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Enable Slack Notifications</p>
                        <p className="text-xs text-gray-500">Send team pings to Slack channels</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        role="switch"
                      >
                        <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Auto-expand Team Pings</p>
                        <p className="text-xs text-gray-500">Automatically ping all team members</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        role="switch"
                      >
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Schedule Reminders</p>
                        <p className="text-xs text-gray-500">Send schedule reminders to team</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        role="switch"
                      >
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
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
                  {team ? 'Update Team' : 'Create Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}