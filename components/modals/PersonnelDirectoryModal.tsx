'use client'

import { useState, useEffect } from 'react'
import { fetchUsers, type User } from '../../lib/services/dashboard-service'

interface PersonnelDirectoryModalProps {
  isOpen: boolean
  onClose: () => void
  onPersonClick: (person: User) => void
}

export default function PersonnelDirectoryModal({ isOpen, onClose, onPersonClick }: PersonnelDirectoryModalProps) {
  const [personnel, setPersonnel] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      loadPersonnel()
    }
  }, [isOpen])
  
  async function loadPersonnel() {
    setIsLoading(true)
    try {
      const users = await fetchUsers({ limit: 50 })
      setPersonnel(users)
    } catch (error) {
      console.error('Failed to load personnel:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'active') return 'bg-secondary'
    if (statusLower === 'busy') return 'bg-warning'
    return 'bg-outline-variant'
  }
  
  const getStatusDisplay = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'active') return 'Available'
    if (statusLower === 'busy') return 'Busy'
    return 'Offline'
  }
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-on-surface">Personnel Directory</h3>
                <p className="text-on-surface-variant mt-1">All active personnel across all teams</p>
              </div>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse font-body">
                 <thead>
                   <tr className="text-on-surface-variant text-[11px] uppercase tracking-widest bg-surface-container-low/50">
                     <th className="px-6 py-4 font-bold">Name</th>
                     <th className="px-6 py-4 font-bold">Role</th>
                     <th className="px-6 py-4 font-bold">Team</th>
                     <th className="px-6 py-4 font-bold">Status</th>
                     <th className="px-6 py-4 font-bold">Contact</th>
                     <th className="px-6 py-4 font-bold text-right">Actions</th>
                   </tr>
                 </thead>
                  <tbody className="divide-y divide-surface-container">
                    {isLoading ? (
                      // Loading skeletons
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-surface-container-high"></div>
                              <div className="space-y-2">
                                <div className="h-3 bg-surface-container-high rounded w-24"></div>
                                <div className="h-2 bg-surface-container-high rounded w-32"></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-3 bg-surface-container-high rounded w-16"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-3 bg-surface-container-high rounded w-20"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-3 bg-surface-container-high rounded w-12"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-3 bg-surface-container-high rounded w-24"></div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <div className="w-8 h-8 bg-surface-container-high rounded"></div>
                              <div className="w-8 h-8 bg-surface-container-high rounded"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : personnel.length > 0 ? (
                      personnel.map((person) => (
                        <tr 
                          key={person.id} 
                          className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                          onClick={() => onPersonClick(person)}
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
                              <span className="text-xs font-semibold uppercase">{getStatusDisplay(person.status)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-on-surface-variant">{person.phone || 'No phone'}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                className="p-1.5 rounded-lg hover:bg-surface-container-highest transition-colors opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  alert(`Ping sent to ${person.name}`)
                                }}
                              >
                                <span className="material-symbols-outlined text-xl text-primary">notifications</span>
                              </button>
                              <button 
                                className="p-1 rounded-lg hover:bg-surface-container-highest transition-colors opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onPersonClick(person)
                                }}
                              >
                                <span className="material-symbols-outlined text-xl">visibility</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                          No personnel data available
                        </td>
                      </tr>
                    )}
                  </tbody>
               </table>
             </div>

             <div className="mt-6 flex justify-between items-center">
               <div className="text-sm text-on-surface-variant">
                 Showing {personnel.length} personnel
               </div>
               <div className="flex items-center gap-3">
                 <button className="text-sm font-bold text-primary hover:underline">
                   Export to CSV
                 </button>
                 <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">
                   Add New Person
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}