'use client'

import { Users, Bell, MoreVertical, X } from 'lucide-react'
import { useState } from 'react'
import TeamForm from '../forms/TeamForm'

const teams = [
  {
    id: '1',
    name: 'Worship Team',
    description: 'Leads worship sessions and musical activities',
    memberCount: 8,
    activeMembers: 7,
    lastActivity: '10 min ago',
  },
  {
    id: '2',
    name: 'Kitchen Team',
    description: 'Handles food preparation and distribution',
    memberCount: 4,
    activeMembers: 4,
    lastActivity: '15 min ago',
  },
  {
    id: '3',
    name: 'Medical Team',
    description: 'Provides first aid and medical support',
    memberCount: 2,
    activeMembers: 1,
    lastActivity: '5 min ago',
  },
  {
    id: '4',
    name: 'Registration Team',
    description: 'Manages participant registration and check-in',
    memberCount: 3,
    activeMembers: 2,
    lastActivity: '30 min ago',
  },
]

export default function TeamsPanel() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const [showAllTeams, setShowAllTeams] = useState(false)
  const [showTeamDetails, setShowTeamDetails] = useState(false)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-brand-dark">Teams</h3>
            <div className="flex space-x-2">
               <button 
                 onClick={() => setShowAllTeams(true)}
                 className="btn btn-secondary"
               >
                 View All
               </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="btn btn-primary"
              >
                Add Team
              </button>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team) => (
               <div 
                 key={team.id} 
                 className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 cursor-pointer"
                 onClick={() => {
                   setSelectedTeam(team)
                   setShowTeamDetails(true)
                 }}
               >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-brand-dark">{team.name}</h4>
                    <p className="mt-1 text-sm text-brand-light">{team.description}</p>
                    
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="mr-1.5 h-4 w-4 text-brand-light" />
                        <span className="text-sm text-brand-dark">
                          {team.activeMembers}/{team.memberCount} active
                        </span>
                      </div>
                      <div className="text-sm text-brand-light">
                        Last: {team.lastActivity}
                      </div>
                    </div>
                  </div>
                  
                   <div className="flex items-center space-x-1">
                     <button
                       title="Ping Team"
                       className="p-1.5 text-brand-light hover:text-brand-teal hover:bg-brand-teal/10 rounded"
                     >
                       <Bell className="h-4 w-4" />
                     </button>
                     <button
                       title="More"
                       className="p-1.5 text-brand-light hover:text-brand-dark hover:bg-brand-light rounded"
                     >
                       <MoreVertical className="h-4 w-4" />
                     </button>
                   </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(team.memberCount, 5))].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-brand-light border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-brand-dark">
                          {i + 1}
                        </span>
                      </div>
                    ))}
                    {team.memberCount > 5 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-medium text-brand-dark">
                          +{team.memberCount - 5}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
           </div>
         </div>


       </div>

        <TeamForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          team={selectedTeam}
        />

        {/* Team Details Modal */}
        {showTeamDetails && selectedTeam && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-brand-dark bg-opacity-75 transition-opacity" onClick={() => setShowTeamDetails(false)}></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-dark">{selectedTeam.name}</h3>
                        <p className="text-sm text-brand-light">{selectedTeam.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTeamDetails(false)}
                      className="text-brand-light hover:text-brand-light"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-2">Team Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-brand-dark">Total Members</p>
                          <p className="text-lg font-semibold text-brand-dark">{selectedTeam.memberCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-brand-dark">Active Now</p>
                          <p className="text-lg font-semibold text-success-600">{selectedTeam.activeMembers}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-2">Slack Integration</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-brand-dark">Channel ID: <span className="font-medium text-brand-dark">C1234567890</span></p>
                        <p className="text-xs text-brand-light mt-1">For team-wide notifications</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-2">Send Team Message</h4>
                      <textarea
                        className="form-textarea w-full text-sm"
                        rows={3}
                        placeholder="Type your message to the team..."
                      />
                      <p className="mt-1 text-xs text-brand-light">
                        Leave empty to send default ping: "Team ping"
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setShowTeamDetails(false)
                          setIsAddModalOpen(true)
                        }}
                        className="flex-1 btn btn-secondary"
                      >
                        Edit Team
                      </button>
                      <button className="flex-1 btn btn-primary">
                        <Bell className="h-4 w-4 mr-2" />
                        Ping Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Teams Modal */}
        {showAllTeams && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-brand-dark bg-opacity-75 transition-opacity" onClick={() => setShowAllTeams(false)}></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">All Teams</h3>
                      <p className="text-sm text-brand-light mt-1">Total: {teams.length} teams</p>
                    </div>
                    <button
                      onClick={() => setShowAllTeams(false)}
                      className="text-brand-light hover:text-brand-light"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Team Name</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Description</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Members</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Active</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Last Activity</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {teams.map((team) => (
                          <tr 
                            key={team.id}
                            className="hover:bg-brand-light cursor-pointer"
                            onClick={() => {
                              setSelectedTeam(team)
                              setShowTeamDetails(true)
                              setShowAllTeams(false)
                            }}
                          >
                            <td className="px-3 py-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                                  <Users className="h-4 w-4 text-brand-teal" />
                                </div>
                                <div className="text-sm font-medium text-brand-dark">{team.name}</div>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="text-sm text-brand-dark max-w-xs truncate">{team.description}</div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="text-sm text-brand-dark">{team.memberCount}</div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="text-sm text-success-600">{team.activeMembers}</div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="text-sm text-brand-dark">{team.lastActivity}</div>
                            </td>
                            <td className="px-3 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedTeam(team)
                                  // Trigger ping for this team
                                  alert(`Team ping sent to ${team.name}`)
                                }}
                                className="text-brand-teal hover:text-primary-900 text-sm font-medium"
                              >
                                Ping Team
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setShowAllTeams(false)}
                      className="btn btn-secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }