'use client'

import { useState, useEffect } from 'react'
import AddPersonModal from '@/components/modals/AddPersonModal'
import AddTeamModal from '@/components/modals/AddTeamModal'
import PersonnelDetailsModal from '@/components/modals/PersonnelDetailsModal'
import { useToast } from '@/lib/hooks/useToast'
import { useModal } from '@/lib/hooks/useModal'

interface User {
  id: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  imageUrl: string | null
  team?: {
    id: string
    name: string
  } | null
  zone?: {
    id: string
    name: string
  } | null
}

interface Team {
  id: string
  name: string
  description: string | null
  memberCount: number
  activeMembers: number
}

export default function PersonnelPage() {
  const { success, error } = useToast()
  const personnelModal = useModal<User>()
  const [showAddPersonModal, setShowAddPersonModal] = useState(false)
  const [showAddTeamModal, setShowAddTeamModal] = useState(false)
  const [personnel, setPersonnel] = useState<User[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [actionMenu, setActionMenu] = useState<{open: boolean; person: User | null; x: number; y: number}>({
    open: false,
    person: null,
    x: 0,
    y: 0
  })

  const fetchPersonnel = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch personnel')
      const data = await response.json()
      if (data.success) {
        // Transform API data to match User type
        const transformedData = data.data.map((user: any) => ({
          ...user,
          email: user.email || '',
          role: user.role || '',
          phone: user.phone || '',
          status: user.status || 'active'
        }))
        setPersonnel(transformedData)
      }
    } catch (err) {
      error('Error', 'Failed to load personnel data')
      console.error('Failed to fetch personnel:', err)
    }
  }

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams')
      if (!response.ok) throw new Error('Failed to fetch teams')
      const data = await response.json()
      if (data.success) {
        setTeams(data.data)
      }
    } catch (err) {
      error('Error', 'Failed to load team data')
      console.error('Failed to fetch teams:', err)
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    await Promise.all([fetchPersonnel(), fetchTeams()])
    setIsLoading(false)
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await Promise.all([fetchPersonnel(), fetchTeams()])
    setIsRefreshing(false)
    success('Refreshed', 'Personnel data updated')
  }

  useEffect(() => {
    loadData()
  }, [])

  const handlePersonClick = (person: User) => {
    personnelModal.openModal(person)
  }

  const handlePersonnelSave = async (updatedPerson: User) => {
    try {
      const response = await fetch(`/api/users/${updatedPerson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPerson)
      })
      
      if (!response.ok) throw new Error('Failed to update person')
      
      const data = await response.json()
      if (data.success) {
        success('Updated', `${updatedPerson.name} updated successfully`)
        await fetchPersonnel() // Refresh the list
        personnelModal.closeModal()
      }
    } catch (err) {
      error('Error', 'Failed to update personnel')
      console.error('Failed to update person:', err)
    }
  }

  const handleAddPersonSave = async (data: any) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to add person')
      
      const result = await response.json()
      if (result.success) {
        success('Added', `${data.name} added successfully`)
        await fetchPersonnel() // Refresh the list
        setShowAddPersonModal(false)
      }
    } catch (err) {
      error('Error', 'Failed to add personnel')
      console.error('Failed to add person:', err)
    }
  }

  const handleAddTeamSave = async (data: any) => {
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to add team')
      
      const result = await response.json()
      if (result.success) {
        success('Added', `${data.name} team added successfully`)
        await fetchTeams() // Refresh the list
        setShowAddTeamModal(false)
      }
    } catch (err) {
      error('Error', 'Failed to add team')
      console.error('Failed to add team:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'on duty':
        return 'bg-secondary'
      case 'roaming':
      case 'busy':
        return 'bg-primary'
      case 'available':
      case 'idle':
        return 'bg-outline-variant'
      case 'inactive':
      case 'offline':
        return 'bg-error'
      default:
        return 'bg-outline-variant'
    }
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Active'
      case 'on duty':
        return 'On Duty'
      case 'roaming':
        return 'Roaming'
      case 'busy':
        return 'Busy'
      case 'available':
        return 'Available'
      case 'idle':
        return 'Idle'
      case 'inactive':
        return 'Inactive'
      case 'offline':
        return 'Offline'
      default:
        return status
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Personnel</h2>
          <p className="text-on-surface-variant font-body text-lg">Manage staff assignments, team distribution, and real-time operational status.</p>
        </div>
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
      </div>
      
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-sm">
            <div className="p-6 flex items-center justify-between bg-surface-container-low/30">
              <h3 className="text-lg font-bold font-headline">Active Directory</h3>
              <div className="flex items-center gap-2">
                <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-base">filter_list</span> Filter List
                </button>
                <span className="text-xs text-on-surface-variant">•</span>
                <span className="text-sm text-on-surface-variant">{personnel.length} people</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="text-on-surface-variant text-[11px] uppercase tracking-widest bg-surface-container-low/50">
                    <th className="px-6 py-4 font-bold">Name</th>
                    <th className="px-6 py-4 font-bold">Role</th>
                    <th className="px-6 py-4 font-bold">Team</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 4 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-surface-container-high"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-surface-container-high rounded w-24"></div>
                              <div className="h-3 bg-surface-container-high rounded w-32"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-surface-container-high rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-surface-container-high rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-surface-container-high rounded w-12"></div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="h-6 w-6 bg-surface-container-high rounded inline-block"></div>
                        </td>
                      </tr>
                    ))
                  ) : personnel.length > 0 ? (
                    personnel.map((person) => (
                      <tr 
                        key={person.id} 
                        onClick={() => handlePersonClick(person)}
                        className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {person.imageUrl ? (
                              <img alt={person.name} className="w-9 h-9 rounded-full object-cover" src={person.imageUrl} />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                {person.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-sm text-on-surface">{person.name}</p>
                              <p className="text-xs text-on-surface-variant">{person.email || 'No email'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium">{person.role || 'No role'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-on-surface-variant">{person.team?.name || 'No team'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(person.status)}`}></span>
                            <span className="text-xs font-semibold uppercase">{getStatusText(person.status)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              const rect = e.currentTarget.getBoundingClientRect()
                              setActionMenu({
                                open: true,
                                person,
                                x: rect.right,
                                y: rect.top + rect.height
                              })
                            }}
                            className="p-1 rounded-lg hover:bg-surface-container-highest transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <span className="material-symbols-outlined text-xl">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                        No personnel found. Add your first person to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-surface-container bg-surface-container-low/20 flex justify-center">
              <button className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                View All Personnel ({personnel.length})
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <button 
            onClick={() => setShowAddPersonModal(true)}
            className="w-full bg-surface-container-low text-on-surface py-3.5 rounded-xl border border-outline-variant/30 text-sm font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 shadow-sm font-body"
          >
            <span className="material-symbols-outlined text-xl">person_add</span>
            Add Person
          </button>
          
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold font-headline mb-1">Teams</h3>
              <p className="text-sm text-on-surface-variant mb-8 font-body">Active team coordination and deployment.</p>
              
              <div className="space-y-6 font-body">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-primary">groups</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{team.name}</p>
                        <p className="text-xs text-on-surface-variant">
                          {team.activeMembers}/{team.memberCount} active • {team.description || 'No description'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Implement team action menu
                        console.log('Team action menu for:', team.name)
                      }}
                      className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-surface-container">
                <button 
                  onClick={() => setShowAddTeamModal(true)}
                  className="w-full bg-surface-container-low text-on-surface py-3.5 rounded-full text-sm font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 font-body"
                >
                  <span className="material-symbols-outlined text-lg">group_add</span>
                  Add a New Team
                </button>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          </div>
        </div>
      </div>

      {showAddPersonModal && (
        <AddPersonModal
          isOpen={showAddPersonModal}
          onClose={() => setShowAddPersonModal(false)}
          onSave={handleAddPersonSave}
        />
      )}

      {showAddTeamModal && (
        <AddTeamModal
          isOpen={showAddTeamModal}
          onClose={() => setShowAddTeamModal(false)}
          onSave={handleAddTeamSave}
        />
      )}

       {personnelModal.isOpen && personnelModal.data && (
        <PersonnelDetailsModal
          isOpen={personnelModal.isOpen}
          onClose={personnelModal.closeModal}
          onSave={handlePersonnelSave}
          personnel={personnelModal.data}
        />
       )}

       {/* Action Menu */}
       {actionMenu.open && actionMenu.person && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setActionMenu({ open: false, person: null, x: 0, y: 0 })}
          />
          
          {/* Menu */}
          <div 
            className="fixed z-50 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/15 min-w-48"
            style={{
              left: `${actionMenu.x - 200}px`,
              top: `${actionMenu.y}px`
            }}
          >
            <div className="py-2">
              <button 
                onClick={() => {
                  personnelModal.openModal(actionMenu.person!)
                  setActionMenu({ open: false, person: null, x: 0, y: 0 })
                }}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                Edit
              </button>
              <button 
                onClick={() => {
                  console.log('Message to:', actionMenu.person!.name)
                  // This would open a DirectMessagesModal
                  setActionMenu({ open: false, person: null, x: 0, y: 0 })
                }}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">chat_bubble</span>
                Message
              </button>
              <button 
                onClick={() => {
                  console.log('Ping:', actionMenu.person!.name)
                  success('Ping Sent', `Ping sent to ${actionMenu.person!.name}`)
                  setActionMenu({ open: false, person: null, x: 0, y: 0 })
                }}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">notifications</span>
                Ping
              </button>
              <div className="border-t border-surface-container my-1"></div>
              <button 
                onClick={() => {
                  console.log('Delete:', actionMenu.person!.name)
                  if (confirm(`Are you sure you want to delete ${actionMenu.person!.name}?`)) {
                    // This would call delete API
                    success('Deleted', `${actionMenu.person!.name} has been removed`)
                  }
                  setActionMenu({ open: false, person: null, x: 0, y: 0 })
                }}
                className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">delete</span>
                Delete
              </button>
            </div>
          </div>
        </>
       )}
     </div>
   )
 }