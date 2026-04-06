'use client'

interface EventDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit?: () => void
  onViewSchedule?: () => void
  event?: {
    id: string
    title: string
    description: string
    date: string
    duration: string
    venue: string
    capacity: number
    currentParticipants: number
    status: 'active' | 'upcoming' | 'completed'
    backgroundImage?: string
  }
}

export default function EventDetailModal({ 
  isOpen, 
  onClose, 
  onEdit, 
  onViewSchedule,
  event 
}: EventDetailModalProps) {
  if (!isOpen) return null

  // Default event data if none provided
  const data = event || {
    id: '1',
    title: 'Summer Youth Camp 2024',
    description: 'Regional gathering at Pinecrest Reserve. Total of 1,248 participants currently checked in across 12 sectors. This year\'s focus is on sustainable financial systems and collaborative curation for future events.',
    date: 'June 15-20, 2024',
    duration: '6 days',
    venue: 'Pinecrest Reserve',
    capacity: 1500,
    currentParticipants: 1248,
    status: 'active' as const,
    backgroundImage: null
  }

  const capacityPercentage = Math.round((data.currentParticipants / data.capacity) * 100)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary-container text-on-secondary-container'
      case 'upcoming': return 'bg-tertiary-container text-on-tertiary-container'
      case 'completed': return 'bg-surface-container-high text-on-surface-variant'
      default: return 'bg-surface-container-high text-on-surface-variant'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'upcoming': return 'Upcoming'
      case 'completed': return 'Completed'
      default: return 'Unknown'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          {/* Modal Content */}
          <div className="flex flex-col md:flex-row">
            {/* Left: Image/Background */}
            <div className="md:w-2/5 bg-primary p-8 text-on-primary relative overflow-hidden">
              {data.backgroundImage ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${data.backgroundImage})` }}
                >
                  <div className="absolute inset-0 bg-primary/80"></div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container"></div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(data.status)}`}>
                      {getStatusText(data.status)}
                    </span>
                    <span className="text-primary-fixed text-sm font-bold">Featured Event</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-primary-fixed hover:text-white"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>

                <div className="mt-12">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full w-fit mb-4">
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    <span className="text-xs font-bold">{capacityPercentage}% Capacity</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Event Details</h3>
                  <p className="text-primary-fixed text-sm">
                    {data.currentParticipants.toLocaleString()} of {data.capacity.toLocaleString()} participants
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                  {data.title}
                </h1>
                <p className="text-on-surface-variant font-medium">Regional Finance & Strategy Summit</p>
              </div>

              {/* Metadata Bento Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="bg-surface-container-low p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Date & Duration</p>
                    <p className="text-sm font-bold text-on-surface">{data.date}</p>
                    <p className="text-xs text-on-surface-variant">{data.duration}</p>
                  </div>
                </div>

                <div className="bg-surface-container-low p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Venue</p>
                    <p className="text-sm font-bold text-on-surface">{data.venue}</p>
                    <button className="text-xs text-primary font-medium hover:underline mt-1">
                      View on Map
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-4">Event Overview</h3>
                <p className="text-on-surface-variant leading-relaxed text-lg font-medium">
                  {data.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-surface-container-low p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline mb-1">Teams</p>
                  <p className="text-2xl font-bold text-on-surface">42</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline mb-1">Sectors</p>
                  <p className="text-2xl font-bold text-on-surface">12</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline mb-1">Staff</p>
                  <p className="text-2xl font-bold text-on-surface">156</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline mb-1">Activities</p>
                  <p className="text-2xl font-bold text-on-surface">24</p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-col md:flex-row items-center gap-4 pt-8 border-t border-surface-container">
                {onViewSchedule && (
                  <button 
                    onClick={onViewSchedule}
                    className="flex-1 bg-primary text-on-primary py-4 px-8 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Schedule</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                )}
                {onEdit && (
                  <button 
                    onClick={onEdit}
                    className="flex-1 bg-surface-container-high text-on-surface py-4 px-8 rounded-full font-bold text-sm tracking-wide hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Edit Event</span>
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="flex-1 border-2 border-outline-variant/30 text-on-surface-variant py-4 px-8 rounded-full font-bold text-sm tracking-wide hover:bg-surface-container-low transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}