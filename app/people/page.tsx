'use client'

import { useState } from 'react'
import AddPersonModal from '@/components/modals/AddPersonModal'
import AddTeamModal from '@/components/modals/AddTeamModal'

export default function PersonnelPage() {
  const [showAddPersonModal, setShowAddPersonModal] = useState(false)
  const [showAddTeamModal, setShowAddTeamModal] = useState(false)
  const personnel = [
    {
      name: 'Sarah Chen',
      email: 'sarah.c@christable.com',
      role: 'Logistics Lead',
      department: 'Operations',
      status: 'On Duty',
      statusColor: 'bg-secondary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnYUXgF8Mw8wN6BGxRbjrvwC4UloMpCHxYNw0Ev-vChjsuRHfKDDJqv0bl6_UKuZeufpZMcyOw3TsTt4rC9qxOejwpktKVq0Ros5BhtEvBJVe16ClFJEopkcGE7grhuw8wvlVh9Kxpdq_JSjbd-BynelA-5MnTcysQOddfKdRIcOGDAdbxkn7GrCOC5CwdGWlmSl7_q43T4EQAroOpI4NKQDBUKa_hueT4x8qTfdOmtcnvKuNcNJ-_SlYt9TRKr6ahnXH1NlWLoa4'
    },
    {
      name: 'Marcus Jensen',
      email: 'm.jensen@christable.com',
      role: 'Medical Officer',
      department: 'Health & Safety',
      status: 'Roaming',
      statusColor: 'bg-primary',
      image: null
    },
    {
      name: 'David Miller',
      email: 'd.miller@christable.com',
      role: 'Security',
      department: 'Perimeter',
      status: 'Available',
      statusColor: 'bg-outline-variant',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdqF5mVj3FpwMoK3p4SYwowFijpbdS4dQ5ddd7s2UJELXpohJbgqKh2idfdhuIzva0bQA9NyWCbKLvP1vZNTPnj0OWiNonl7vtDBMADpWpeCNpY3DLIhCjxzRZcToU3KmRARgnz1MNfuMwW8OfmaKft4_0kwRYyzASc-05C-StKurJ1kzyuVPcLjYsk81p0115huDnK_dFMybWYdUC_d4VDAD5fdKgSemw8ioWb3aqC22ChPRUunVT1_zELg-hyN4wXg52H5AflAI'
    },
    {
      name: 'James Wilson',
      email: 'j.wilson@christable.com',
      role: 'Logistics Lead',
      department: 'Supply Chain',
      status: 'On Duty',
      statusColor: 'bg-secondary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbERxoHAFOE8fSr1NKUJwtsQMcdEL5cU7n4zpew3d1LvaHinx4ZZOn7M1pFOlOtuYeWB8g7mnFSVrLb2Dy0H38bIPgUyAux7yQzwuCH4pcPI0ZL6poTh5807NPEhltUSWaLGhzGd3vyNk1DsTFrOeW3PUUMCQ8N22UBgxn1lpTX8L_Gtnu4Qibbr8GbjznTUX4HtJaIu4hIxazq7v_iIUkW-GXBTbprZsYtcz54UEG3XzPn4RlVx-S5zlrcbrO0IaZmEWQHjtlqCE'
    }
  ]

  const teams = [
    {
      name: 'Emergency Response',
      members: '12 Members',
      location: 'Zone A',
      icon: 'medical_services',
      color: 'bg-primary text-white'
    },
    {
      name: 'Floor Security',
      members: '34 Members',
      location: 'Main Hall',
      icon: 'security',
      color: 'bg-primary/10 text-primary'
    },
    {
      name: 'Guest Concierge',
      members: '08 Members',
      location: 'Entrance',
      icon: 'support_agent',
      color: 'bg-secondary-fixed text-on-secondary-container'
    }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Personnel</h2>
        <p className="text-on-surface-variant font-body text-lg">Manage staff assignments, team distribution, and real-time operational status.</p>
      </div>
      
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-sm">
            <div className="p-6 flex items-center justify-between bg-surface-container-low/30">
              <h3 className="text-lg font-bold font-headline">Active Directory</h3>
              <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-base">filter_list</span> Filter List
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
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {personnel.map((person, index) => (
                    <tr key={index} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {person.image ? (
                            <img alt={person.name} className="w-9 h-9 rounded-full object-cover" src={person.image} />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                              {person.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-sm text-on-surface">{person.name}</p>
                            <p className="text-xs text-on-surface-variant">{person.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">{person.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-on-surface-variant">{person.department}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${person.statusColor}`}></span>
                          <span className="text-xs font-semibold uppercase">{person.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 rounded-lg hover:bg-surface-container-highest transition-colors opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined text-xl">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-surface-container bg-surface-container-low/20 flex justify-center">
              <button className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">View All Personnel</button>
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
                {teams.map((team, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${team.color} flex items-center justify-center shadow-sm`}>
                        <span className="material-symbols-outlined">{team.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{team.name}</p>
                        <p className="text-xs text-on-surface-variant">{team.members} • {team.location}</p>
                      </div>
                    </div>
                    <button className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
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
          onSave={(data) => {
            console.log('New person added:', data)
            setShowAddPersonModal(false)
          }}
        />
      )}

      {showAddTeamModal && (
        <AddTeamModal
          isOpen={showAddTeamModal}
          onClose={() => setShowAddTeamModal(false)}
          onSave={(data) => {
            console.log('New team added:', data)
            setShowAddTeamModal(false)
          }}
        />
      )}
    </div>
  )
}