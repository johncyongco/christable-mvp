'use client'

import { useState } from 'react'
import { User, Phone, Mail, MapPin, MoreVertical, Plus, Users, Bell } from 'lucide-react'
import PersonForm from '@/components/forms/PersonForm'

const people = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Worship Leader',
    status: 'active',
    phone: '+1 (555) 123-4567',
    email: 'sarah@example.com',
    team: 'Worship Team',
    zone: 'Session Hall',
    lastPing: '10 min ago',
    imageUrl: null,
    slackChannelId: 'C1234567890',
    slackUserId: 'U1234567890',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Kitchen Staff',
    status: 'active',
    phone: '+1 (555) 234-5678',
    email: 'michael@example.com',
    team: 'Kitchen Team',
    zone: 'Kitchen',
    lastPing: '15 min ago',
    imageUrl: null,
    slackChannelId: 'C2345678901',
    slackUserId: 'U2345678901',
  },
  {
    id: '3',
    name: 'David Wilson',
    role: 'First Aid',
    status: 'needs_attention',
    phone: '+1 (555) 345-6789',
    email: 'david@example.com',
    team: 'Medical Team',
    zone: 'First Aid Station',
    lastPing: '5 min ago',
    imageUrl: null,
    slackChannelId: 'C3456789012',
    slackUserId: 'U3456789012',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    role: 'Registration',
    status: 'idle',
    phone: '+1 (555) 456-7890',
    email: 'maria@example.com',
    team: 'Registration Team',
    zone: 'Registration Desk',
    lastPing: '30 min ago',
    imageUrl: null,
    slackChannelId: 'C4567890123',
    slackUserId: 'U4567890123',
  },
]

export default function PeoplePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-brand-teal/20 text-brand-teal'
      case 'idle': return 'bg-brand-gold/20 text-brand-gold'
      case 'needs_attention': return 'bg-brand-coral/20 text-brand-coral'
      default: return 'bg-brand-light text-brand-dark'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'idle': return 'Idle'
      case 'needs_attention': return 'Needs Attention'
      default: return 'Unknown'
    }
  }

  const activeCount = people.filter(p => p.status === 'active').length
  const needsAttentionCount = people.filter(p => p.status === 'needs_attention').length
  const idleCount = people.filter(p => p.status === 'idle').length

  const handleEditPerson = (person: any) => {
    setSelectedPerson(person)
    setIsEditMode(true)
    setIsAddModalOpen(true)
  }

  const handleAddPerson = () => {
    setSelectedPerson(null)
    setIsEditMode(false)
    setIsAddModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setSelectedPerson(null)
    setIsEditMode(false)
  }

  // Sample teams and zones data (in production, this would come from an API)
  const teams = [
    { id: '1', name: 'Worship Team' },
    { id: '2', name: 'Kitchen Team' },
    { id: '3', name: 'Medical Team' },
    { id: '4', name: 'Registration Team' },
    { id: '5', name: 'Security Team' },
    { id: '6', name: 'Technical Team' },
  ]

  const zones = [
    { id: '1', name: 'Session Hall' },
    { id: '2', name: 'Kitchen' },
    { id: '3', name: 'First Aid Station' },
    { id: '4', name: 'Registration Desk' },
    { id: '5', name: 'Activity Hall' },
    { id: '6', name: 'Conference Room' },
    { id: '7', name: 'Parking Lot' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">People Management</h1>
          <p className="mt-1 text-sm text-brand-light">
            Manage all people records, assign teams and zones, track status, and send pings
          </p>
        </div>
        <button 
          onClick={handleAddPerson}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Person
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">All People ({people.length})</h3>
            </div>
            <div className="card-body">
              <div className="table-container">
                <table className="table">
                  <thead className="table-header">
                    <tr>
                      <th scope="col" className="table-header-cell">Name</th>
                      <th scope="col" className="table-header-cell">Role</th>
                      <th scope="col" className="table-header-cell">Status</th>
                      <th scope="col" className="table-header-cell">Team & Zone</th>
                      <th scope="col" className="table-header-cell">Last Ping</th>
                      <th scope="col" className="table-header-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {people.map((person) => (
                      <tr key={person.id} className="hover:bg-brand-light">
                        <td className="table-cell py-4 pl-4 pr-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {person.imageUrl ? (
                                <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-brand-light flex items-center justify-center">
                                  <User className="h-5 w-5 text-brand-light" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-brand-dark">{person.name}</div>
                              <div className="flex items-center space-x-2 text-sm text-brand-light">
                                <span className="flex items-center">
                                  <Phone className="mr-1 h-3 w-3" />
                                  {person.phone}
                                </span>
                                <span className="flex items-center">
                                  <Mail className="mr-1 h-3 w-3" />
                                  {person.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="text-sm text-brand-dark">{person.role}</div>
                        </td>
                        <td className="table-cell">
                          <span className={`badge ${getStatusColor(person.status)}`}>
                            {getStatusText(person.status)}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="text-sm">
                            <div className="font-medium text-brand-dark">{person.team}</div>
                            <div className="flex items-center text-brand-light">
                              <MapPin className="mr-1 h-3 w-3" />
                              {person.zone}
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="text-sm text-brand-dark">{person.lastPing}</div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button
                              title="Ping"
                              className="p-1.5 text-brand-light hover:text-brand-teal hover:bg-brand-teal/10 rounded"
                              onClick={() => alert(`Ping sent to ${person.name}`)}
                            >
                              <Bell className="h-4 w-4" />
                            </button>
                            <button
                              title="More"
                              className="p-1.5 text-brand-light hover:text-brand-dark hover:bg-brand-light rounded"
                              onClick={() => handleEditPerson(person)}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Quick Stats</h3>
            </div>
            <div className="card-body">
              <dl className="grid grid-cols-1 gap-4">
                <div className="bg-brand-light rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Total People</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">{people.length}</dd>
                </div>
                <div className="bg-brand-teal/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Active</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">{activeCount}</dd>
                </div>
                <div className="bg-brand-gold/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Idle</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">{idleCount}</dd>
                </div>
                <div className="bg-brand-coral/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Needs Attention</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">{needsAttentionCount}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="card mt-6">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Add New Person</h3>
            </div>
            <div className="card-body">
              <p className="text-sm text-brand-light mb-4">
                Add a new person to the system to start tracking their status and sending pings.
              </p>
              <button 
                onClick={handleAddPerson}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Person
              </button>
            </div>
          </div>

          <div className="card mt-6">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Team Distribution</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-brand-teal mr-2" />
                    <span className="text-sm text-brand-dark">Worship Team</span>
                  </div>
                  <span className="text-sm font-medium text-brand-dark">8 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-brand-teal mr-2" />
                    <span className="text-sm text-brand-dark">Kitchen Team</span>
                  </div>
                  <span className="text-sm font-medium text-brand-dark">4 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-brand-teal mr-2" />
                    <span className="text-sm text-brand-dark">Medical Team</span>
                  </div>
                  <span className="text-sm font-medium text-brand-dark">2 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-brand-teal mr-2" />
                    <span className="text-sm text-brand-dark">Registration Team</span>
                  </div>
                  <span className="text-sm font-medium text-brand-dark">3 members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PersonForm
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        person={selectedPerson}
        teams={teams}
        zones={zones}
      />
    </div>
  )
}