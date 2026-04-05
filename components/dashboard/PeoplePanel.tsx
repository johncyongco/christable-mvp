'use client'

import { useState } from 'react'
import { User, Phone, Mail, MapPin, Bell, MessageSquare, MoreVertical, X, Users } from 'lucide-react'
import PersonForm from '../forms/PersonForm'

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
  },
]

export default function PeoplePanel() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [showPersonDetails, setShowPersonDetails] = useState(false)
  const [showAllPeople, setShowAllPeople] = useState(false)

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

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
             <h3 className="text-lg font-medium text-brand-dark">People</h3>
            <div className="flex space-x-2">
               <button 
                 onClick={() => setShowAllPeople(true)}
                 className="btn btn-secondary"
               >
                 View All
               </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="btn btn-primary"
              >
                Add Person
              </button>
            </div>
          </div>
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
                  <tr 
                    key={person.id} 
                    className="hover:bg-brand-light cursor-pointer"
                    onClick={() => {
                      setSelectedPerson(person)
                      setShowPersonDetails(true)
                    }}
                  >
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
                        >
                          <Bell className="h-4 w-4" />
                        </button>
                        <button
                          title="Message"
                          className="p-1.5 text-brand-light hover:text-brand-teal hover:bg-brand-teal/10 rounded"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button
                          title="More"
                          className="p-1.5 text-brand-light hover:text-brand-dark hover:bg-brand-light rounded"
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

       <PersonForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        person={selectedPerson}
      />

      {/* Person Details Modal - Clean Redesign */}
      {showPersonDetails && selectedPerson && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-brand-dark bg-opacity-75 transition-opacity" onClick={() => setShowPersonDetails(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-brand-light flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-brand-light" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{selectedPerson.name}</h3>
                      <p className="text-sm text-brand-light">{selectedPerson.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPersonDetails(false)}
                    className="text-brand-light hover:text-brand-light"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Contact Information - Clickable Links */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-brand-light mr-2" />
                      <a href={`tel:${selectedPerson.phone}`} className="text-sm text-brand-teal hover:text-brand-teal">
                        {selectedPerson.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-brand-light mr-2" />
                      <a href={`mailto:${selectedPerson.email}`} className="text-sm text-brand-teal hover:text-brand-teal">
                        {selectedPerson.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Assignment & Status */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-2">Assignment</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 text-brand-light mr-1" />
                        <span className="text-sm text-brand-dark">{selectedPerson.team}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-brand-light mr-1" />
                        <span className="text-sm text-brand-dark">{selectedPerson.zone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-2">Status</h4>
                    <div className="flex flex-wrap gap-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPerson.status)}`}>
                        {getStatusText(selectedPerson.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slack Integration */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-3">Slack Integration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-dark">User ID:</span>
                      <span className="text-sm font-medium text-brand-dark">U1234567890</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-dark">Channel ID:</span>
                      <span className="text-sm font-medium text-brand-dark">C1234567890</span>
                    </div>
                    <div className="text-xs text-brand-light mt-2">
                      <p>Last synced: Just now</p>
                    </div>
                  </div>
                </div>

                {/* Message Box */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-brand-light uppercase tracking-wider mb-3">Send Message</h4>
                  <textarea
                    className="form-textarea w-full text-sm"
                    rows={3}
                    placeholder="Type your message here (optional)..."
                  />
                  <p className="mt-1 text-xs text-brand-light">
                    Leave empty to send default ping: "You are pinged"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowPersonDetails(false)
                      setIsAddModalOpen(true)
                    }}
                    className="flex-1 btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button className="flex-1 btn btn-primary">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Ping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All People Modal */}
      {showAllPeople && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-brand-dark bg-opacity-75 transition-opacity" onClick={() => setShowAllPeople(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark">All People</h3>
                    <p className="text-sm text-brand-light mt-1">Total: {people.length} people</p>
                  </div>
                  <button
                    onClick={() => setShowAllPeople(false)}
                    className="text-brand-light hover:text-brand-light"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Name</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Role</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Team</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Zone</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Last Ping</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-brand-light uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {people.map((person) => (
                        <tr 
                          key={person.id}
                          className="hover:bg-brand-light cursor-pointer"
                          onClick={() => {
                            setSelectedPerson(person)
                            setShowPersonDetails(true)
                            setShowAllPeople(false)
                          }}
                        >
                          <td className="px-3 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-brand-light flex items-center justify-center mr-3">
                                <User className="h-4 w-4 text-brand-light" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-brand-dark">{person.name}</div>
                                <div className="text-xs text-brand-light">{person.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <div className="text-sm text-brand-dark">{person.role}</div>
                          </td>
                          <td className="px-3 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(person.status)}`}>
                              {getStatusText(person.status)}
                            </span>
                          </td>
                          <td className="px-3 py-4">
                            <div className="text-sm text-brand-dark">{person.team}</div>
                          </td>
                          <td className="px-3 py-4">
                            <div className="text-sm text-brand-dark">{person.zone}</div>
                          </td>
                          <td className="px-3 py-4">
                            <div className="text-sm text-brand-dark">{person.lastPing}</div>
                          </td>
                          <td className="px-3 py-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedPerson(person)
                                // Trigger ping for this person
                                alert(`Ping sent to ${person.name}`)
                              }}
                              className="text-brand-teal hover:text-brand-teal text-sm font-medium"
                            >
                              Ping
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowAllPeople(false)}
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