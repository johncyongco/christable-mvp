'use client'

interface AnnouncementDetailModalProps {
  isOpen: boolean
  onClose: () => void
  announcement?: {
    id: string
    title: string
    content: string
    author: string
    date: string
    priority: 'high' | 'medium' | 'low'
    category: string
  }
}

export default function AnnouncementDetailModal({ isOpen, onClose, announcement }: AnnouncementDetailModalProps) {
  if (!isOpen) return null

  // Default announcement data if none provided
  const data = announcement || {
    id: '1',
    title: 'Summer Youth Camp Update',
    content: `Hello Everyone!

We are finalizing the logistics for this year's Summer Youth Camp. Please take note of the following critical scheduling and logistical updates to ensure a smooth departure.

Key Logistic Updates:
• Medical clearance forms must be submitted by this Friday at 5:00 PM.
• Packing list has been updated to include heavy bedding due to cooler night forecasts.
• Transport buses will be parked at the South Gate, not the Main Entrance.`,
    author: 'Event Coordinator',
    date: 'April 6, 2024',
    priority: 'high' as const,
    category: 'Event Updates'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-error-container text-on-error-container'
      case 'medium': return 'bg-tertiary-container text-on-tertiary-container'
      case 'low': return 'bg-surface-container-high text-on-surface-variant'
      default: return 'bg-surface-container-high text-on-surface-variant'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority'
      case 'medium': return 'Medium Priority'
      case 'low': return 'Low Priority'
      default: return 'Standard'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Modal Header */}
          <div className="bg-primary p-8 text-on-primary">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${getPriorityColor(data.priority)}`}>
                      {getPriorityText(data.priority)}
                    </span>
                    <span className="text-primary-fixed text-sm">{data.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{data.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-primary-fixed hover:text-white"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-primary-fixed text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">person</span>
                <span>{data.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>{data.date}</span>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="bg-surface-container-lowest px-8 pt-8 pb-6">
            <div className="prose max-w-none text-on-surface-variant leading-relaxed space-y-6">
              <div className="whitespace-pre-line text-on-surface-variant">
                {data.content}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <span className="font-bold text-on-surface">Dates & Time</span>
                  </div>
                  <p className="text-sm mb-2">July 15 - July 22, 2024</p>
                  <p className="text-sm text-on-surface-variant">Departure: 8:00 AM Sharp</p>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-secondary">location_on</span>
                    <span className="font-bold text-on-surface">Location</span>
                  </div>
                  <p className="text-sm mb-2">North Pine Valley Ridge</p>
                  <button className="text-sm text-primary font-medium hover:underline">
                    View Map Directions
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="font-bold text-on-surface flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary-container rounded-full"></span>
                  Key Logistic Updates
                </h4>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>Medical clearance forms must be submitted by this Friday at 5:00 PM.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>Packing list has been updated to include heavy bedding due to cooler night forecasts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span>Transport buses will be parked at the South Gate, not the Main Entrance.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-8 py-6 bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-on-surface-variant font-bold px-4 py-2 hover:bg-surface-container-high rounded-lg transition-colors">
                <span className="material-symbols-outlined">share</span>
                Share
              </button>
              <button className="flex items-center gap-2 text-on-surface-variant font-bold px-4 py-2 hover:bg-surface-container-high rounded-lg transition-colors">
                <span className="material-symbols-outlined">bookmark</span>
                Save
              </button>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={onClose}
                className="flex-1 md:flex-none border-2 border-outline-variant/30 text-on-surface-variant font-bold px-6 py-2.5 rounded-full hover:bg-white transition-colors"
              >
                Close
              </button>
              <button className="flex-1 md:flex-none bg-primary text-on-primary font-bold px-8 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                View in Thread
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}