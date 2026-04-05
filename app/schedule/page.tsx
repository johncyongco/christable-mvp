'use client'

import { useState } from 'react'
import AddScheduleModal from '@/components/modals/AddScheduleModal'

export default function SchedulePage() {
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false)
  const timelineEvents = [
    {
      time: '09:00',
      period: 'Morning',
      title: 'Vendor Arrival & Load-in',
      location: 'Service Entrance B',
      color: 'bg-secondary',
      borderColor: 'border-secondary',
      people: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDyDt0r9YtJOfF80PQ1BX3Tpod3EV-DiNIrjQmqYzXQQ0SAFOpA9qRP1x9aj7xoZMxHLnTHxbz2Lrk5imWInizeEd6KMCyHXNhdHfOCCaDCPZ1jxrd8A3LgcssDqpfY96kPcKXM3SGwK8uQSrP75iLt7jj9CtQSpfOZktyFc7FZmDcoFy5dmmXmSEtnHOHcb6XKgetM8sws8BlM-2xXCME0ascB29kDeMWylAX4LJeSrgTqnRYsFpqlv57Kt1TSOkJgzah8ghPDLgY',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCdFim1IHqo0zvTnvDh_y_Y3UsdxzwC_jWJXug96iREIKd52yISRs2gN6QbX2AJOyEgJRGh5Uk-VfJZrFghNMuZgeqZZrRTxjRU4fqQjAa93mUdPh_QxN24e4Ek5Kw2qd1PYn9rNGAknE1Xl_ZusfafZQidoh1wAwdlERc74RalmuRTNuPzs9DDwcWaAOEe1G-2Ou4eusnais3AtJ5RPs6izVEgZ-duNrmUYzZBczNCKqmgR3gnHFwILDjhIKgF_a3yNkLs7CXu1_M'
      ]
    },
    {
      time: '11:30',
      period: 'Midday',
      title: 'Keynote Tech Rehearsal',
      location: 'Main Auditorium',
      color: 'bg-primary',
      borderColor: 'border-primary',
      urgent: true
    },
    {
      time: '15:00',
      period: 'Afternoon',
      title: 'Breakout Sessions: Series A',
      location: 'Conference Rooms 1-4',
      color: 'bg-tertiary',
      borderColor: 'border-tertiary'
    }
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline mb-2">Schedule</h2>
          <p className="text-on-surface-variant font-medium">Monday, October 24th • 12 Active Events</p>
        </div>
        <button 
          onClick={() => setShowAddScheduleModal(true)}
          className="flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-on-primary font-bold hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>add_circle</span>
          Add Schedule
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 group hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
            </div>
            <span className="text-xs font-bold text-on-secondary-container px-2 py-1 bg-secondary-container/50 rounded-full uppercase">Live</span>
          </div>
          <p className="text-on-surface-variant font-bold text-xs tracking-wider uppercase mb-1">Completed</p>
          <h3 className="text-3xl font-black text-on-surface">18 <span className="text-sm font-medium text-on-surface-variant">/ 24 Tasks</span></h3>
          <div className="mt-4 w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-[75%]"></div>
          </div>
        </div>
        
        <div className="bg-primary p-6 rounded-xl text-on-primary relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined text-white">bolt</span>
            </div>
          </div>
          <p className="text-primary-fixed text-xs tracking-wider uppercase mb-1">Current Activity</p>
          <h3 className="text-xl font-bold mb-1">Main Stage Lighting Sync</h3>
          <p className="text-primary-fixed text-sm">Venue: Grand Hall A • Staff: 12</p>
        </div>
        
        <div className="bg-tertiary-container p-6 rounded-xl text-on-tertiary-container relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined text-white">schedule</span>
            </div>
          </div>
          <p className="text-tertiary-fixed-dim font-bold text-xs tracking-wider uppercase mb-1">Up Next (14:00)</p>
          <h3 className="text-xl font-bold mb-1">Speaker Briefing</h3>
          <p className="text-tertiary-fixed-dim text-sm">Green Room • With Guest VIPs</p>
        </div>
      </div>
      
      <div className="bg-surface-container-low rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold font-headline">Timeline View</h3>
          <div className="flex gap-2 p-1 bg-surface-container-high rounded-lg">
            <button className="px-4 py-1.5 text-sm font-bold bg-white shadow-sm rounded-md text-primary">Day</button>
            <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">Week</button>
            <button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">Month</button>
          </div>
        </div>
        
        <div className="space-y-6 relative before:content-[''] before:absolute before:left-[111px] before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant/30">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex gap-8 group">
              <div className="w-20 text-right shrink-0 pt-2">
                <p className="text-sm font-black text-on-surface">{event.time}</p>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">{event.period}</p>
              </div>
              <div className="relative pt-2">
                <div className={`absolute left-[-5px] top-4 w-3 h-3 rounded-full border-2 border-surface-container-low ${event.color} ring-4 ${event.color}/10`}></div>
              </div>
              <div className={`flex-1 bg-surface-container-lowest p-6 rounded-lg shadow-sm border-l-4 ${event.borderColor} hover:translate-x-1 transition-transform`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-on-surface mb-1">{event.title}</h4>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {event.location}
                    </p>
                  </div>
                  {event.urgent && (
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">URGENT</span>
                  )}
                  {event.people && (
                    <div className="flex -space-x-2">
                      {event.people.map((person, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                          <img className="w-full h-full object-cover" src={person} alt="" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold">+3</div>
                    </div>
                  )}
                  {!event.people && !event.urgent && (
                    <div className="w-10 h-10 bg-tertiary/5 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary">groups</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex gap-8 items-center -my-2 relative z-10">
            <div className="w-20 text-right shrink-0">
              <p className="text-xs font-black text-primary">14:05</p>
            </div>
            <div className="flex-1 h-[2px] bg-primary relative before:content-[''] before:absolute before:left-[-6px] before:top-[-4px] before:w-2.5 before:h-2.5 before:bg-primary before:rounded-full after:content-['NOW'] after:absolute after:right-0 after:top-[-20px] after:text-[9px] after:font-black after:text-primary"></div>
           </div>
         </div>
       </div>

       {showAddScheduleModal && (
         <AddScheduleModal
           isOpen={showAddScheduleModal}
           onClose={() => setShowAddScheduleModal(false)}
           onSave={(data) => {
             console.log('New schedule added:', data)
             setShowAddScheduleModal(false)
           }}
         />
       )}
     </div>
   )
 }