'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EventModal from '@/components/modals/EventModal'
import EventDetailModal from '@/components/modals/EventDetailModal'
import PersonnelDirectoryModal from '@/components/modals/PersonnelDirectoryModal'
import PersonnelDetailsModal from '@/components/modals/PersonnelDetailsModal'
import DirectMessagesModal from '@/components/modals/DirectMessagesModal'
import { fetchDashboardData, type User } from '@/lib/services/dashboard-service'

export default function DashboardPage() {
  const router = useRouter()
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showEventDetail, setShowEventDetail] = useState(false)
  const [showPersonnelDirectory, setShowPersonnelDirectory] = useState(false)
  const [showPersonnelDetails, setShowPersonnelDetails] = useState(false)
  const [showDirectMessages, setShowDirectMessages] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [chatRecipient, setChatRecipient] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [activePersonnel, setActivePersonnel] = useState<User[]>([])
  
  const [eventData, setEventData] = useState({
    title: 'Summer Youth Camp 2024',
    description: 'Regional gathering at Pinecrest Reserve. Total of 1,248 participants currently checked in across 12 sectors.',
    backgroundImage: null as string | null
  })

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true)
      try {
        const data = await fetchDashboardData()
        setDashboardData(data)
        setActivePersonnel(data.activePersonnel)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDashboardData()
  }, [])

  const handleViewSchedule = () => {
    router.push('/schedule')
  }

  const handleCreateNewEvent = () => {
    setShowEventModal(true)
  }

  const handleEventSave = (data: any) => {
    setEventData({
      title: data.title,
      description: data.description,
      backgroundImage: data.backgroundImage
    })
    setShowEventModal(false)
  }

  const handleSeeAllDirectory = () => {
    setShowPersonnelDirectory(true)
  }

  const handlePersonClick = (person: User) => {
    setSelectedPerson(person)
    setShowPersonnelDetails(true)
  }

  const handlePersonnelSave = (data: any) => {
    console.log('Personnel updated:', data)
    setShowPersonnelDetails(false)
  }

  const handleChatClick = (personName: string) => {
    setChatRecipient(personName)
    setShowDirectMessages(true)
  }

  // Personnel data will come from API

  return (
    <>
      {/* Hero Section */}
      <section className="mb-8">
        <div 
          className="relative overflow-hidden rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[320px]"
          style={eventData.backgroundImage ? { 
            backgroundImage: `url(${eventData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : { backgroundColor: '#1d1b31' }}
        >
          {/* Overlay for background image */}
          {eventData.backgroundImage && (
            <div className="absolute inset-0 bg-black/50"></div>
          )}
          
          {/* Abstract Background Ornament */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-primary to-transparent"></div>
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path className="text-primary" d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Event
            </div>
             <h2 
               onClick={() => setShowEventDetail(true)}
               className="text-5xl font-black text-white mb-4 tracking-tight hover:opacity-90 cursor-pointer transition-opacity"
             >
               {eventData.title}
             </h2>
            <p className="text-indigo-100 text-lg font-medium mb-8 max-w-lg leading-relaxed">
              {eventData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                  className="bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <span>Actions</span>
                  <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                </button>
                
                {showActionsDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/15 z-50">
                    <div className="py-2">
                      <button 
                        onClick={handleCreateNewEvent}
                        className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                        Create New Event
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">download</span>
                        Export Data
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">print</span>
                        Print Report
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">settings</span>
                        Event Settings
                      </button>
                      <div className="border-t border-surface-container my-1"></div>
                      <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">power_settings_new</span>
                        End Event
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleViewSchedule}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">calendar_today</span>
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metric Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Card 1 - Total People */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <span className="text-secondary font-bold text-xs bg-secondary-container px-2 py-1 rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12%
            </span>
          </div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total People</h3>
          {isLoading ? (
            <div className="h-10 bg-surface-container-high rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-black text-on-surface">{dashboardData?.stats?.totalUsers || 0}</p>
          )}
        </div>

        {/* Metric Card 2 - Total Teams */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">grid_view</span>
            </div>
            <span className="text-slate-400 font-bold text-xs bg-surface-container px-2 py-1 rounded-md">~0%</span>
          </div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Teams</h3>
          {isLoading ? (
            <div className="h-10 bg-surface-container-high rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-black text-on-surface">{dashboardData?.stats?.totalTeams || 0}</p>
          )}
        </div>

        {/* Metric Card 3 - Active Schedules */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">event_available</span>
            </div>
            <span className="text-secondary font-bold text-xs bg-secondary-container px-2 py-1 rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +4%
            </span>
          </div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Schedules</h3>
          {isLoading ? (
            <div className="h-10 bg-surface-container-high rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-black text-on-surface">{dashboardData?.stats?.totalSchedules || 0}</p>
          )}
        </div>

        {/* Metric Card 4 - On-site Alerts */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow ring-2 ring-error/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="text-white font-bold text-[10px] bg-error px-2 py-1 rounded-md uppercase animate-pulse">Critical</span>
          </div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">On-site Alerts</h3>
          {isLoading ? (
            <div className="h-10 bg-surface-container-high rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-black text-error">{dashboardData?.stats?.recentPings || 0}</p>
          )}
        </div>
      </section>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Live Venue Map */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-on-surface mb-1">Live Venue Map</h3>
              <p className="text-sm text-on-surface-variant">Real-time status tracking for Pinecrest Reserve</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                <span className="material-symbols-outlined">zoom_out</span>
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                <span className="material-symbols-outlined">layers</span>
              </button>
            </div>
          </div>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 group">
            <img 
              alt="Venue Map" 
              className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcq1gsCD0n5RcDYS97BvGyQYxWYRypZ20kwbHPr59OD7PYLSHTrmMBvaE_ODpwz1tbt72_mVHBDzYebSji0nH6stmvE3nFUMTVTK77LB6qcEkopNcqrLx_Zy-EJcAw5pY6D07D3QIcvGMc1_rheACSSFLAV2lPHkXl0J9lq7qernDdB3OMnGVemua5AGHSZo-kUrKJbUYFUrmXmWkxU2gpwi6KbiFpIBCWzHemf1anFp6bEeHd1MPnsszJitOtuCtH_1rOLItRvAw"
            />
            {/* Hotspots/Pins */}
            <div className="absolute top-[20%] left-[30%] group">
              <div className="w-4 h-4 bg-secondary rounded-full ring-4 ring-secondary/30 animate-ping absolute"></div>
              <div className="w-4 h-4 bg-secondary rounded-full relative"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Main Stage: CLEAR
              </div>
            </div>
            <div className="absolute top-[45%] left-[65%] group">
              <div className="w-4 h-4 bg-error rounded-full ring-4 ring-error/30 animate-pulse absolute"></div>
              <div className="w-4 h-4 bg-error rounded-full relative"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Equipment Alert: HUB B
              </div>
            </div>
            <div className="absolute top-[70%] left-[45%] group">
              <div className="w-4 h-4 bg-yellow-400 rounded-full ring-4 ring-yellow-400/30 absolute"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full relative"></div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-3xl p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-on-surface">Activity Feed</h3>
            <span className="material-symbols-outlined text-slate-400">history</span>
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex gap-4 relative">
              <div className="absolute left-2.5 top-8 bottom-0 w-[1px] bg-slate-100"></div>
              <div className="z-10 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>check</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Registration Complete</p>
                <p className="text-xs text-on-surface-variant mb-1">Sector 7 finalized intake process.</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">2 min ago</p>
              </div>
            </div>
            <div className="flex gap-4 relative">
              <div className="absolute left-2.5 top-8 bottom-0 w-[1px] bg-slate-100"></div>
              <div className="z-10 w-5 h-5 rounded-full bg-error-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>priority_high</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Equipment Alert</p>
                <p className="text-xs text-on-surface-variant mb-1">Power fluctuation reported in Hub B.</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">15 min ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="z-10 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>update</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Schedule Adjusted</p>
                <p className="text-xs text-on-surface-variant mb-1">Lunch shift 2 moved to 12:45 PM.</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">42 min ago</p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors uppercase tracking-widest">
            View Full Audit Log
          </button>
        </div>

        {/* Active Personnel */}
        <div className="col-span-12 bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-on-surface mb-1">Active Personnel</h3>
              <p className="text-sm text-on-surface-variant">3 teams currently deployed on ground</p>
            </div>
             <button 
               onClick={handleSeeAllDirectory}
               className="text-sm font-bold text-primary flex items-center gap-1 hover:text-primary/80 transition-colors"
             >
               See All Directory
               <span className="material-symbols-outlined text-lg">chevron_right</span>
             </button>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 animate-pulse">
                    <div className="w-14 h-14 rounded-xl bg-surface-container-high"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
                      <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                      <div className="h-2 bg-surface-container-high rounded w-1/4"></div>
                    </div>
                  </div>
                ))
              ) : activePersonnel.length > 0 ? (
                activePersonnel.slice(0, 3).map((person) => (
                  <div 
                    key={person.id}
                    onClick={() => handlePersonClick(person)}
                    className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    {person.imageUrl ? (
                      <img 
                        alt={person.name} 
                        className="w-14 h-14 rounded-xl object-cover" 
                        src={person.imageUrl}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface">
                        <span className="text-2xl font-bold">{person.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{person.name}</p>
                      <p className="text-xs text-on-surface-variant mb-2">{person.role}</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          person.status === 'active' || person.status === 'Active' ? 'bg-success' :
                          person.status === 'busy' || person.status === 'Busy' ? 'bg-warning' : 'bg-outline'
                        }`}></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {person.status === 'active' || person.status === 'Active' ? 'Available' : 
                           person.status === 'busy' || person.status === 'Busy' ? 'Busy' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the card click
                        handleChatClick(person.name)
                      }}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">chat_bubble</span>
                    </button>
                  </div>
                ))
              ) : (
                // Fallback when no personnel data
                <div className="col-span-3 text-center py-8 text-on-surface-variant">
                  No active personnel data available
                </div>
              )}
            </div>
        </div>
      </div>

       {/* Modals */}
      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          onSave={handleEventSave}
          initialData={eventData}
        />
      )}

      {showPersonnelDirectory && (
        <PersonnelDirectoryModal
          isOpen={showPersonnelDirectory}
          onClose={() => setShowPersonnelDirectory(false)}
          onPersonClick={handlePersonClick}
        />
      )}

       {selectedPerson && showPersonnelDetails && (
        <PersonnelDetailsModal
          isOpen={showPersonnelDetails}
          onClose={() => setShowPersonnelDetails(false)}
          onSave={handlePersonnelSave}
          personnel={selectedPerson}
        />
       )}

       {showDirectMessages && (
        <DirectMessagesModal
          isOpen={showDirectMessages}
          onClose={() => setShowDirectMessages(false)}
          onSendMessage={(message, conversationId) => {
            console.log(`Message to ${chatRecipient}:`, message, 'conversation:', conversationId)
          }}
        />
       )}

       {showEventDetail && (
        <EventDetailModal
          isOpen={showEventDetail}
          onClose={() => setShowEventDetail(false)}
          onEdit={() => {
            console.log('Edit event clicked')
            setShowEventDetail(false)
            setShowEventModal(true)
          }}
          onViewSchedule={handleViewSchedule}
          event={{
            id: '1',
            title: eventData.title,
            description: eventData.description,
            date: 'July 15-20, 2024',
            duration: '6 days',
            venue: 'Pinecrest Reserve',
            capacity: 1500,
            currentParticipants: 1248,
            status: 'active' as const,
            backgroundImage: eventData.backgroundImage || undefined
          }}
        />
       )}
     </>
   )
 }