'use client'

interface Team {
  id: string
  name: string
  icon: string
  color: string
  memberCount: number
  status: 'active' | 'inactive' | 'overloaded'
}

interface ZoneDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onManageTeams?: () => void
  zone?: {
    id: string
    name: string
    location: string
    capacity: number
    currentOccupancy: number
    status: 'active' | 'inactive' | 'maintenance'
    description?: string
    teams: Team[]
  }
}

export default function ZoneDetailModal({ 
  isOpen, 
  onClose, 
  onManageTeams,
  zone 
}: ZoneDetailModalProps) {
  if (!isOpen) return null

  // Default zone data if none provided
  const data = zone || {
    id: '1',
    name: 'VIP Platinum Lounge',
    location: 'Level 4, North Wing Section A',
    capacity: 250,
    currentOccupancy: 210,
    status: 'active' as const,
    description: 'Premium lounge area for VIP guests with dedicated service teams.',
    teams: [
      {
        id: '1',
        name: 'Tech Support',
        icon: 'construction',
        color: 'bg-primary-fixed text-primary',
        memberCount: 4,
        status: 'active' as const
      },
      {
        id: '2',
        name: 'Catering',
        icon: 'restaurant',
        color: 'bg-tertiary-fixed text-tertiary',
        memberCount: 12,
        status: 'active' as const
      },
      {
        id: '3',
        name: 'Security',
        icon: 'security',
        color: 'bg-secondary-container text-on-secondary-container',
        memberCount: 6,
        status: 'active' as const
      },
      {
        id: '4',
        name: 'Guest Services',
        icon: 'support_agent',
        color: 'bg-surface-container-high text-on-surface-variant',
        memberCount: 8,
        status: 'inactive' as const
      }
    ]
  }

  const occupancyPercentage = Math.round((data.currentOccupancy / data.capacity) * 100)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary text-on-secondary'
      case 'inactive': return 'bg-outline text-on-surface-variant'
      case 'maintenance': return 'bg-error text-on-error'
      default: return 'bg-outline text-on-surface-variant'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'inactive': return 'Inactive'
      case 'maintenance': return 'Under Maintenance'
      default: return 'Unknown'
    }
  }

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary'
      case 'inactive': return 'bg-outline'
      case 'overloaded': return 'bg-error animate-pulse'
      default: return 'bg-outline'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Modal Header */}
          <div className="px-8 py-6 flex items-center justify-between bg-surface-container-lowest">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full"></div>
              <span className="text-sm font-bold tracking-widest text-primary uppercase">Zone Details</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant">close</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="px-8 pb-10 space-y-10 overflow-y-auto max-h-[70vh]">
            {/* Zone Identity */}
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-on-surface tracking-tighter leading-none">
                {data.name}
              </h2>
              <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{data.location}</span>
              </div>
              {data.description && (
                <p className="text-on-surface-variant mt-4">{data.description}</p>
              )}
            </div>

            {/* Zone Metrics Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between h-32">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Current Occupancy
                </span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-primary">{occupancyPercentage}%</span>
                  <span className="text-sm text-on-surface-variant mb-1">
                    / {data.capacity} Capacity
                  </span>
                </div>
                <div className="mt-2 w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${occupancyPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between h-32">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                  <span className={`text-xl font-bold ${getStatusColor(data.status)}`}>
                    {getStatusText(data.status)}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-on-surface-variant">
                    {data.currentOccupancy} people currently in zone
                  </p>
                </div>
              </div>
            </div>

            {/* Assigned Teams Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-on-surface">Assigned Teams</h3>
                {onManageTeams && (
                  <button 
                    onClick={onManageTeams}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    Manage Teams
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.teams.map((team) => (
                  <div 
                    key={team.id}
                    className="group p-4 bg-white border border-outline-variant/20 rounded-xl hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-lg ${team.color} flex items-center justify-center`}>
                      <span className="material-symbols-outlined">{team.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-on-surface">{team.name}</p>
                        <span className={`w-2 h-2 rounded-full ${getTeamStatusColor(team.status)}`}></span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        {team.memberCount} {team.memberCount === 1 ? 'Member' : 'Members'}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-surface-container">
              <h4 className="text-sm font-bold text-on-surface mb-4">Quick Actions</h4>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span className="text-sm">View Live Feed</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-sm">history</span>
                  <span className="text-sm">View Activity Log</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span className="text-sm">Export Data</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-error-container text-on-error-container rounded-lg hover:bg-error-container/90 transition-colors">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span className="text-sm">Lock Zone</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-8 py-6 bg-surface-container-low flex items-center justify-between gap-4">
            <button 
              onClick={onClose}
              className="flex-1 border-2 border-outline-variant/30 text-on-surface-variant font-bold px-6 py-2.5 rounded-full hover:bg-white transition-colors"
            >
              Close
            </button>
            <button className="flex-1 bg-primary text-on-primary font-bold px-8 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              Edit Zone Details
              <span className="material-symbols-outlined text-base">edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}