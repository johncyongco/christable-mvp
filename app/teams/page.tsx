'use client'

import { useState } from 'react'
import { Users, MapPin, Bell, MoreVertical, Plus, User } from 'lucide-react'
import TeamForm from '@/components/forms/TeamForm'

const teams = [
  {
    id: '1',
    name: 'Worship Team',
    description: 'Leads worship sessions and musical activities',
    memberCount: 8,
    activeMembers: 7,
    lastActivity: '10 min ago',
    zone: 'Session Hall',
    members: [
      { id: '1', name: 'Sarah Johnson', role: 'Worship Leader' },
      { id: '5', name: 'John Smith', role: 'Audio Technician' },
    ]
  },
  {
    id: '2',
    name: 'Kitchen Team',
    description: 'Handles food preparation and distribution',
    memberCount: 4,
    activeMembers: 4,
    lastActivity: '15 min ago',
    zone: 'Kitchen',
    members: [
      { id: '2', name: 'Michael Chen', role: 'Kitchen Staff' },
    ]
  },
  {
    id: '3',
    name: 'Medical Team',
    description: 'Provides first aid and medical support',
    memberCount: 2,
    activeMembers: 1,
    lastActivity: '5 min ago',
    zone: 'First Aid Station',
    members: [
      { id: '3', name: 'David Wilson', role: 'First Aid' },
    ]
  },
  {
    id: '4',
    name: 'Registration Team',
    description: 'Manages participant registration and check-in',
    memberCount: 3,
    activeMembers: 2,
    lastActivity: '30 min ago',
    zone: 'Registration Desk',
    members: [
      { id: '4', name: 'Maria Garcia', role: 'Registration' },
    ]
  },
  {
    id: '5',
    name: 'Security Team',
    description: 'Ensures venue safety and security',
    memberCount: 5,
    activeMembers: 3,
    lastActivity: '1 hour ago',
    zone: 'Parking Lot',
    members: []
  },
  {
    id: '6',
    name: 'Technical Team',
    description: 'Manages audio, video, and technical equipment',
    memberCount: 4,
    activeMembers: 4,
    lastActivity: '20 min ago',
    zone: 'Session Hall',
    members: []
  },
]

export default function TeamsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditTeam = (team: any) => {
    setSelectedTeam(team)
    setIsEditMode(true)
    setIsAddModalOpen(true)
  }

  const handleAddTeam = () => {
    setSelectedTeam(null)
    setIsEditMode(false)
    setIsAddModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setSelectedTeam(null)
    setIsEditMode(false)
  }

  // Sample zones and people data (in production, this would come from an API)
  const zones = [
    { id: '1', name: 'Session Hall' },
    { id: '2', name: 'Kitchen' },
    { id: '3', name: 'First Aid Station' },
    { id: '4', name: 'Registration Desk' },
    { id: '5', name: 'Activity Hall' },
    { id: '6', name: 'Conference Room' },
    { id: '7', name: 'Parking Lot' },
  ]

  const people = [
    { id: '1', name: 'Sarah Johnson', role: 'Worship Leader' },
    { id: '2', name: 'Michael Chen', role: 'Kitchen Staff' },
    { id: '3', name: 'David Wilson', role: 'First Aid' },
    { id: '4', name: 'Maria Garcia', role: 'Registration' },
    { id: '5', name: 'John Smith', role: 'Audio Technician' },
    { id: '6', name: 'Emily Brown', role: 'Volunteer Coordinator' },
    { id: '7', name: 'Robert Taylor', role: 'Security Officer' },
    { id: '8', name: 'Lisa Wong', role: 'Video Technician' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Team Management</h1>
          <p className="mt-1 text-sm text-brand-light">
            Create and manage teams, assign members, configure settings, and coordinate team activities
          </p>
        </div>
        <button 
          onClick={handleAddTeam}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Team
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-brand-dark">All Teams ({teams.length})</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team) => (
                  <div 
                    key={team.id} 
                    className="border border-brand-light rounded-lg p-4 hover:border-brand-teal/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-brand-dark">{team.name}</h4>
                          <div className="flex items-center space-x-1">
                            <button
                              title="Ping Team"
                              className="p-1 text-brand-light hover:text-brand-teal hover:bg-brand-teal/10 rounded"
                              onClick={() => handlePingTeam(team)}
                            >
                              <Bell className="h-4 w-4" />
                            </button>
                            <button
                              title="More Options"
                              className="p-1 text-brand-light hover:text-brand-dark hover:bg-brand-light rounded"
                              onClick={() => handleEditTeam(team)}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="mt-1 text-sm text-brand-light">{team.description}</p>
                        
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
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
                          
                          {team.zone && (
                            <div className="flex items-center">
                              <MapPin className="mr-1.5 h-4 w-4 text-brand-light" />
                              <span className="text-sm text-brand-dark">{team.zone}</span>
                            </div>
                          )}
                          
                          {team.members && team.members.length > 0 && (
                            <div className="pt-2 border-t border-brand-light">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-brand-light uppercase">Key Members</span>
                                <span className="text-xs text-brand-light">
                                  {team.members.length} of {team.memberCount}
                                </span>
                              </div>
                              <div className="flex -space-x-2">
                                {team.members.slice(0, 4).map((member, index) => (
                                  <div
                                    key={member.id}
                                    className="h-8 w-8 rounded-full bg-brand-teal/20 border-2 border-white flex items-center justify-center"
                                    title={member.name}
                                  >
                                    {index < 3 ? (
                                      <span className="text-xs font-medium text-brand-teal">
                                        {member.name.charAt(0)}
                                      </span>
                                    ) : (
                                      <span className="text-xs font-medium text-brand-teal">+{team.members.length - 3}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Team Stats</h3>
            </div>
            <div className="card-body">
              <dl className="space-y-4">
                <div className="bg-brand-light rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Total Teams</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">{teams.length}</dd>
                </div>
                <div className="bg-brand-teal/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Total Members</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">
                    {teams.reduce((sum, team) => sum + team.memberCount, 0)}
                  </dd>
                </div>
                <div className="bg-brand-gold/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Avg Team Size</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">
                    {Math.round(teams.reduce((sum, team) => sum + team.memberCount, 0) / teams.length)}
                  </dd>
                </div>
                <div className="bg-brand-coral/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Active Teams</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">
                    {teams.filter(t => t.activeMembers > 0).length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Create New Team</h3>
            </div>
            <div className="card-body">
              <p className="text-sm text-brand-light mb-4">
                Create a new team to organize people, assign zones, and coordinate group activities.
              </p>
              <button 
                onClick={handleAddTeam}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Team
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Zone Distribution</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {['Session Hall', 'Kitchen', 'First Aid Station', 'Registration Desk', 'Parking Lot', 'Activity Hall'].map((zone) => {
                  const zoneTeams = teams.filter(t => t.zone === zone)
                  if (zoneTeams.length === 0) return null
                  
                  return (
                    <div key={zone} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-brand-teal mr-2" />
                        <span className="text-sm text-brand-dark">{zone}</span>
                      </div>
                      <span className="text-sm font-medium text-brand-dark">{zoneTeams.length} teams</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TeamForm
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        team={selectedTeam}
        zones={zones}
        people={people}
      />
    </div>
  )
}