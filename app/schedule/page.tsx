'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Bell, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'

const schedules = [
  {
    id: '1',
    title: 'Worship Session',
    description: 'Main worship session with full band',
    startTime: '2024-04-05T14:00:00',
    endTime: '2024-04-05T15:30:00',
    zone: 'Session Hall',
    team: 'Worship Team',
    reminder: '15 minutes before',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Break & Snacks',
    description: 'Coffee break with light snacks',
    startTime: '2024-04-05T15:30:00',
    endTime: '2024-04-05T16:00:00',
    zone: 'Kitchen',
    team: 'Kitchen Team',
    reminder: '5 minutes before',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Team Building',
    description: 'Team building activities for all staff',
    startTime: '2024-04-05T16:30:00',
    endTime: '2024-04-05T18:00:00',
    zone: 'Activity Hall',
    team: 'All Teams',
    reminder: '30 minutes before',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Morning Briefing',
    description: 'Daily morning briefing for team leads',
    startTime: '2024-04-05T08:00:00',
    endTime: '2024-04-05T08:30:00',
    zone: 'Conference Room',
    team: 'Team Leads',
    reminder: '10 minutes before',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Equipment Setup',
    description: 'Audio and video equipment setup',
    startTime: '2024-04-05T09:00:00',
    endTime: '2024-04-05T10:30:00',
    zone: 'Session Hall',
    team: 'Technical Team',
    reminder: '15 minutes before',
    status: 'completed',
  },
  {
    id: '6',
    title: 'Registration Open',
    description: 'Participant registration begins',
    startTime: '2024-04-05T10:00:00',
    endTime: '2024-04-05T12:00:00',
    zone: 'Registration Desk',
    team: 'Registration Team',
    reminder: '5 minutes before',
    status: 'completed',
  },
]

const teams = ['Worship Team', 'Kitchen Team', 'Medical Team', 'Registration Team', 'Technical Team', 'Security Team', 'All Teams', 'Team Leads']
const zones = ['Session Hall', 'Kitchen', 'First Aid Station', 'Registration Desk', 'Activity Hall', 'Conference Room', 'Parking Lot']

export default function SchedulePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [filter, setFilter] = useState('all')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    zone: '',
    team: '',
    reminder: '15',
  })

  const handleAddSchedule = () => {
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      zone: '',
      team: '',
      reminder: '15',
    })
    setSelectedSchedule(null)
    setIsEditMode(false)
    setIsAddModalOpen(true)
  }

  const handleEditSchedule = (schedule: any) => {
    setFormData({
      title: schedule.title,
      description: schedule.description,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      zone: schedule.zone,
      team: schedule.team,
      reminder: schedule.reminder.replace(' minutes before', '').replace(' minutes before', ''),
    })
    setSelectedSchedule(schedule)
    setIsEditMode(true)
    setIsAddModalOpen(true)
  }

  const handleDeleteSchedule = (schedule: any) => {
    if (confirm(`Are you sure you want to delete "${schedule.title}"?`)) {
      alert(`Schedule "${schedule.title}" deleted successfully!`)
    }
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setSelectedSchedule(null)
    setIsEditMode(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const action = isEditMode ? 'updated' : 'created'
    alert(`Schedule "${formData.title}" ${action} successfully!`)
    handleCloseModal()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredSchedules = filter === 'all' 
    ? schedules 
    : filter === 'upcoming' 
      ? schedules.filter(s => s.status === 'upcoming')
      : schedules.filter(s => s.status === 'completed')

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Schedule Management</h1>
          <p className="mt-1 text-sm text-brand-light">
            Create, manage, and monitor event schedules with automated reminders and triggers
          </p>
        </div>
        <button 
          onClick={handleAddSchedule}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-brand-dark">
                  Schedule Calendar ({filteredSchedules.length})
                </h3>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="form-select text-sm"
                >
                  <option value="all">All Schedules</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {filteredSchedules.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-brand-light" />
                  <h3 className="mt-2 text-sm font-medium text-brand-dark">No schedules found</h3>
                  <p className="mt-1 text-sm text-brand-light">
                    {filter === 'upcoming' 
                      ? 'You have no upcoming schedules' 
                      : 'No schedules match your filter'}
                  </p>
                  <button 
                    onClick={handleAddSchedule}
                    className="mt-4 btn btn-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Schedule
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSchedules.map((schedule) => (
                    <div 
                      key={schedule.id} 
                      className={`border rounded-lg p-4 ${
                        schedule.status === 'completed' 
                          ? 'border-brand-light bg-brand-light/20' 
                          : 'border-brand-teal/30 bg-brand-teal/5'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-brand-teal mr-2" />
                              <h4 className="font-medium text-brand-dark">{schedule.title}</h4>
                              {schedule.status === 'upcoming' && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-brand-teal/20 text-brand-teal rounded">
                                  Upcoming
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                title="Edit"
                                className="p-1 text-brand-light hover:text-brand-teal hover:bg-brand-teal/10 rounded"
                                onClick={() => handleEditSchedule(schedule)}
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                title="Delete"
                                className="p-1 text-brand-light hover:text-brand-coral hover:bg-brand-coral/10 rounded"
                                onClick={() => handleDeleteSchedule(schedule)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                title="More"
                                className="p-1 text-brand-light hover:text-brand-dark hover:bg-brand-light rounded"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="mt-1 text-sm text-brand-light">{schedule.description}</p>
                          
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-brand-light mr-2" />
                              <div>
                                <div className="text-sm font-medium text-brand-dark">
                                  {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                                </div>
                                <div className="text-xs text-brand-light">{formatDate(schedule.startTime)}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-brand-light mr-2" />
                              <div>
                                <div className="text-sm font-medium text-brand-dark">{schedule.zone}</div>
                                <div className="text-xs text-brand-light">Zone</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-brand-light mr-2" />
                              <div>
                                <div className="text-sm font-medium text-brand-dark">{schedule.team}</div>
                                <div className="text-xs text-brand-light">Team</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 text-brand-light mr-2" />
                              <div>
                                <div className="text-sm font-medium text-brand-dark">{schedule.reminder}</div>
                                <div className="text-xs text-brand-light">Reminder</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Quick Stats</h3>
            </div>
            <div className="card-body">
              <dl className="space-y-4">
                <div className="bg-brand-light rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Total Schedules</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">{schedules.length}</dd>
                </div>
                <div className="bg-brand-teal/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Upcoming</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">
                    {schedules.filter(s => s.status === 'upcoming').length}
                  </dd>
                </div>
                <div className="bg-brand-gold/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">Completed Today</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">
                    {schedules.filter(s => s.status === 'completed').length}
                  </dd>
                </div>
                <div className="bg-brand-coral/10 rounded-lg p-4">
                  <dt className="text-sm font-medium text-brand-light">With Reminders</dt>
                  <dd className="mt-1 text-3xl font-semibold text-brand-dark">
                    {schedules.filter(s => s.reminder).length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Create New Schedule</h3>
            </div>
            <div className="card-body">
              <p className="text-sm text-brand-light mb-4">
                Create a new schedule with automated reminders and team assignments.
              </p>
              <button 
                onClick={handleAddSchedule}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Schedule
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Today's Timeline</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {schedules
                  .filter(s => s.status === 'upcoming')
                  .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                  .slice(0, 3)
                  .map((schedule) => (
                    <div key={schedule.id} className="border-l-4 border-brand-teal pl-4 py-2">
                      <div className="text-sm font-medium text-brand-dark">{schedule.title}</div>
                      <div className="text-sm text-brand-light">{formatTime(schedule.startTime)}</div>
                      <div className="text-xs text-brand-light">{schedule.zone} • {schedule.team}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Schedule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-brand-dark bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-brand-dark">
                    {isEditMode ? 'Edit Schedule' : 'Add New Schedule'}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-brand-light hover:text-brand-dark"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-light mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter schedule title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-light mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="form-textarea"
                        placeholder="Describe the schedule..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-light mb-1">
                          Start Time *
                        </label>
                        <input
                          type="datetime-local"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-light mb-1">
                          End Time *
                        </label>
                        <input
                          type="datetime-local"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-light mb-1">
                          Zone
                        </label>
                        <select
                          name="zone"
                          value={formData.zone}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select zone...</option>
                          {zones.map(zone => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-light mb-1">
                          Team
                        </label>
                        <select
                          name="team"
                          value={formData.team}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select team...</option>
                          {teams.map(team => (
                            <option key={team} value={team}>{team}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-light mb-1">
                        Reminder (minutes before)
                      </label>
                      <select
                        name="reminder"
                        value={formData.reminder}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="5">5 minutes before</option>
                        <option value="10">10 minutes before</option>
                        <option value="15">15 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">60 minutes before</option>
                        <option value="0">No reminder</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn btn-primary"
                    >
                      {isEditMode ? 'Update Schedule' : 'Create Schedule'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}