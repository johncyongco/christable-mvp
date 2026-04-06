'use client'

import { useState, useEffect } from 'react'

interface EditTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  team: any
}

interface User {
  id: string
  name: string
  email: string | null
  role: string | null
  team: { id: string; name: string } | null
}

export default function EditTeamModal({ isOpen, onClose, onSave, team }: EditTeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '' as string | undefined,
    assignedPersonnel: [] as string[]
  })
  const [availablePersonnel, setAvailablePersonnel] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('EditTeamModal useEffect triggered, isOpen:', isOpen, 'team:', team)
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Fetching personnel data...')
        // Fetch all personnel
        const personnelResponse = await fetch('/api/users')
        const personnelData = await personnelResponse.json()
        
        console.log('Personnel data fetched:', personnelData)
        if (personnelData.success) {
          setAvailablePersonnel(personnelData.data)
          
          // Set form data from team
          const assignedPersonnel = personnelData.data
            .filter((person: User) => person.team?.id === team.id)
            .map((person: User) => person.id)
          
          console.log('Assigned personnel:', assignedPersonnel)
          setFormData({
            name: team.name || '',
            description: team.description || '',
            icon: undefined, // Team model doesn't have icon field
            assignedPersonnel: assignedPersonnel
          })
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
        console.log('Loading set to false')
      }
    }

    if (isOpen && team) {
      console.log('Fetching data for team edit')
      fetchData()
    }
  }, [isOpen, team])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const togglePersonnel = (personId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedPersonnel: prev.assignedPersonnel.includes(personId)
        ? prev.assignedPersonnel.filter(id => id !== personId)
        : [...prev.assignedPersonnel, personId]
    }))
  }

  const selectIcon = (icon: string) => {
    setFormData(prev => ({
      ...prev,
      icon: prev.icon === icon ? '' : icon
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: team.id
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* HEADER */}
          <div className="px-8 py-6 flex items-center justify-between border-b border-outline-variant/20">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">Edit Team</h2>
              <p className="text-sm text-on-surface-variant">Update team details and personnel assignments.</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* FORM CONTENT */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column: Team Details */}
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Team Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline transition-all"
                    placeholder="e.g. Executive Leadership"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline transition-all resize-none"
                    placeholder="Describe the team's purpose and responsibilities..."
                  />
                  
                  {/* Hidden Icon Selector - Toggle to show emoji-like selection */}
                  <div className="mt-4 pt-4 border-t border-outline-variant/20">
                     <button
                       type="button"
                       className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                       onClick={() => {
                         // Toggle icon selector visibility
                         const iconSelector = document.getElementById('icon-selector-edit')
                         if (iconSelector) {
                           iconSelector.classList.toggle('hidden')
                         }
                       }}
                     >
                       <span className="material-symbols-outlined text-sm">{formData.icon ? 'edit' : 'add'}</span>
                       {formData.icon ? 'Change Team Icon' : 'Add Team Icon'}
                     </button>
                    
                     <div id="icon-selector-edit" className="hidden mt-3">
                       <div className="grid grid-cols-6 gap-2">
                         {['groups', 'security', 'medical_services', 'support_agent', 'engineering', 'local_shipping', 'restaurant', 'event', 'account_circle', 'work', 'school', 'sports'].map((icon, index) => (
                           <button
                             key={index}
                             type="button"
                             onClick={() => selectIcon(icon)}
                             className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                               formData.icon === icon 
                                 ? 'bg-primary text-on-primary' 
                                 : 'hover:bg-surface-container-high text-on-surface-variant'
                             }`}
                           >
                             <span className="material-symbols-outlined text-lg">{icon}</span>
                           </button>
                         ))}
                       </div>
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Assign Personnel */}
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Assign Personnel</label>
                  <div className="bg-surface-container-low rounded-lg border border-outline-variant/30 p-4 max-h-64 overflow-y-auto">
                    {loading ? (
                      <div className="text-center py-8 text-on-surface-variant">
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                        <p className="mt-2 text-sm">Loading personnel...</p>
                      </div>
                    ) : availablePersonnel.length === 0 ? (
                      <div className="text-center py-8 text-on-surface-variant">
                        <span className="material-symbols-outlined">group</span>
                        <p className="mt-2 text-sm">No personnel available</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {availablePersonnel.map(person => (
                          <div
                            key={person.id}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                              formData.assignedPersonnel.includes(person.id)
                                ? 'bg-primary/10 border border-primary/30'
                                : 'hover:bg-surface-container-high'
                            }`}
                            onClick={() => togglePersonnel(person.id)}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              formData.assignedPersonnel.includes(person.id)
                                ? 'bg-primary border-primary'
                                : 'border-outline-variant'
                            }`}>
                              {formData.assignedPersonnel.includes(person.id) && (
                                <span className="material-symbols-outlined text-xs text-on-primary">check</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-on-surface">{person.name}</p>
                              <p className="text-xs text-on-surface-variant">
                                {person.role || 'No role'} • {person.team?.name || 'No team'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2">
                    {formData.assignedPersonnel.length} personnel selected
                  </p>
                </div>
                

              </div>
            </div>
            
            {/* FOOTER */}
            <div className="mt-8 px-0 py-6 flex items-center justify-end gap-4 border-t border-outline-variant/10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full font-semibold text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 rounded-full font-bold bg-primary text-on-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>save</span>
                Update Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}