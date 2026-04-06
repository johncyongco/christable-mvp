'use client'

import { useState, useEffect } from 'react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  personnel: {
    id: string
    name: string
    role: string
    team: string
    teamId?: string
    email: string
    phone: string
    status: 'Active' | 'Inactive' | 'Away'
    avatar: string
    zone?: string
    notes?: string
    slackId?: string
    channelId?: string
  }
}

export default function EditProfileModal({ isOpen, onClose, onSave, personnel }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: personnel.name,
    role: personnel.role,
    teamId: personnel.teamId || '',
    email: personnel.email,
    phone: personnel.phone,
    status: personnel.status,
    zone: personnel.zone || '',
    slackId: personnel.slackId || '',
    channelId: personnel.channelId || '',
    notes: personnel.notes || '',
    photo: null as File | null,
    imageUrl: '' as string | undefined
  })

  const [teams, setTeams] = useState<{id: string, name: string}[]>([])
  const [loadingTeams, setLoadingTeams] = useState(true)
  const [photoPreview, setPhotoPreview] = useState<string | null>(personnel.avatar || null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }))
    setPhotoPreview(null)
  }

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoadingTeams(true)
        const response = await fetch('/api/teams')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setTeams(data.data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch teams:', error)
      } finally {
        setLoadingTeams(false)
      }
    }

    if (isOpen) {
      fetchTeams()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prepare data for API
    const { photo, ...dataToSend } = formData
    
    // Handle photo upload - create avatar URL from name if photo was uploaded
    if (photo) {
      // Create avatar URL from name
      dataToSend.imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
    }
    
    onSave({
      ...personnel,
      ...dataToSend
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="px-8 py-6 flex justify-between items-center bg-surface-container-low">
            <h1 className="text-headline-sm font-extrabold tracking-tight text-on-surface">Edit Profile</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

           {/* Content Area */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Profile Photo</label>
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-32 h-32 border-2 border-dashed border-outline-variant/50 rounded-xl flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-3xl mb-2">cloud_upload</span>
                          <span className="text-sm font-medium">Upload Image</span>
                          <span className="text-[10px] text-outline">JPG, PNG up to 5MB</span>
                        </div>
                      )}
                    </div>
                    <label className="absolute inset-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-4 py-2 rounded-full font-semibold text-error hover:bg-error/10 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Team</label>
                  <select
                    name="teamId"
                    value={formData.teamId}
                    onChange={handleChange}
                    className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                    required
                    disabled={loadingTeams}
                  >
                    <option value="">{loadingTeams ? 'Loading teams...' : 'Select a Team'}</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                  >
                    <option value="Active">Active</option>
                    <option value="Away">Away</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-label-sm font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Zone</label>
                    <input
                      type="text"
                      name="zone"
                      value={formData.zone}
                      onChange={handleChange}
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                      placeholder="e.g., Main Stage, Kitchen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Slack ID</label>
                    <input
                      type="text"
                      name="slackId"
                      value={formData.slackId}
                      onChange={handleChange}
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Channel ID</label>
                    <input
                      type="text"
                      name="channelId"
                      value={formData.channelId}
                      onChange={handleChange}
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface"
                      placeholder="#channel-name"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface resize-none"
                  placeholder="Additional notes about this personnel..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-outline-variant/30 text-on-surface font-bold rounded-full hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-on-primary font-bold rounded-full hover:bg-primary/90 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}