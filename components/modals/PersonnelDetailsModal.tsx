'use client'

import { useState } from 'react'

interface PersonnelDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  personnel: {
    id: string
    name: string
    role: string
    team: string
    email: string
    phone: string
    status: 'Available' | 'Busy' | 'Offline'
    avatar: string
    zone?: string
    notes?: string
  }
}

export default function PersonnelDetailsModal({ isOpen, onClose, onSave, personnel }: PersonnelDetailsModalProps) {
  const [formData, setFormData] = useState({
    name: personnel.name,
    role: personnel.role,
    team: personnel.team,
    email: personnel.email,
    phone: personnel.phone,
    status: personnel.status,
    zone: personnel.zone || '',
    notes: personnel.notes || ''
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...personnel, ...formData })
    setIsEditing(false)
  }

  const handlePing = () => {
    alert(`Ping sent to ${personnel.name}!`)
  }

  const handleMessage = () => {
    alert(`Opening chat with ${personnel.name}...`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Personnel Details</h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center text-3xl font-bold text-on-surface">
                  {personnel.avatar ? (
                    <img src={personnel.avatar} alt={personnel.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{personnel.name.charAt(0)}</span>
                  )}
                </div>
                <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-surface-container-lowest ${
                  personnel.status === 'Available' ? 'bg-success' :
                  personnel.status === 'Busy' ? 'bg-warning' : 'bg-outline'
                }`}></div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-on-surface">{personnel.name}</h4>
                    <p className="text-on-surface-variant">{personnel.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePing}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary/90 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">notifications</span>
                      Ping
                    </button>
                    <button
                      onClick={handleMessage}
                      className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg font-bold hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Message
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-on-surface-variant">Team</p>
                    <p className="font-medium text-on-surface">{personnel.team}</p>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface-variant">Zone</p>
                    <p className="font-medium text-on-surface">{personnel.zone || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface-variant">Email</p>
                    <p className="font-medium text-on-surface">{personnel.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface-variant">Phone</p>
                    <p className="font-medium text-on-surface">{personnel.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-on-surface">Edit Details</h4>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg font-bold hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
                    {isEditing ? 'Cancel Edit' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                          Role *
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                          Team *
                        </label>
                        <input
                          type="text"
                          name="team"
                          value={formData.team}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                          Status *
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                          required
                        >
                          <option value="Available">Available</option>
                          <option value="Busy">Busy</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">
                        Zone Assignment
                      </label>
                      <input
                        type="text"
                        name="zone"
                        value={formData.zone}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                        placeholder="Enter zone name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface resize-none"
                        placeholder="Add notes about this personnel..."
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-surface-container-low text-on-surface py-3.5 rounded-xl font-bold hover:bg-surface-container-high transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-on-surface-variant">info</span>
                      <p className="text-sm text-on-surface-variant">
                        Click "Edit" to modify personnel details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}