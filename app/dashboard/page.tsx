export default function DashboardPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#1d1b31] p-10 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[320px]">
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
            <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Summer Youth Camp 2024</h2>
            <p className="text-indigo-100 text-lg font-medium mb-8 max-w-lg leading-relaxed">
              Regional gathering at Pinecrest Reserve. Total of 1,248 participants currently checked in across 12 sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-transform flex items-center gap-2">
                <span>Actions</span>
                <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">calendar_today</span>
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metric Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Card 1 */}
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
          <p className="text-3xl font-black text-on-surface">1,248</p>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">grid_view</span>
            </div>
            <span className="text-slate-400 font-bold text-xs bg-surface-container px-2 py-1 rounded-md">~0%</span>
          </div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Teams</h3>
          <p className="text-3xl font-black text-on-surface">42</p>
        </div>

        {/* Metric Card 3 */}
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
          <p className="text-3xl font-black text-on-surface">18</p>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow ring-2 ring-error/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="text-white font-bold text-[10px] bg-error px-2 py-1 rounded-md uppercase animate-pulse">Critical</span>
          </div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">On-site Alerts</h3>
          <p className="text-3xl font-black text-error">2</p>
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
            <button className="text-sm font-bold text-primary flex items-center gap-1">
              View All Directory
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personnel Card 1 */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 hover:bg-surface-container-high transition-colors">
              <img 
                alt="Alex Thompson" 
                className="w-14 h-14 rounded-xl object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUgTAKAS8k5fAzr3e5Bz47-TKPxavIV1IqkxAbR5urFyrsEyqnbNe6K_zI2KJb8rziqiNY-znmL2xNzq-gqNo_c4p9GbbUsGycmg5vcRAe1TQiO9LRenkmhNXgoYY2oLDnn-__-Ec149Rp-_GNj7nnO3n342PBWqqbWebiuiHTJ0m0diP4Wtnc6gTZ1_sz8j9wz6ucxGVeSGc_zXp_JN81R_nq13KXfm48TMSJyuv0_SlOQMX9aAHV2NhE7DeQbiVpXCFijwjd0WU"
              />
              <div className="flex-1">
                <p className="font-bold text-on-surface">Alex Thompson</p>
                <p className="text-xs text-on-surface-variant mb-2">Logistics Lead</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Available</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
              </button>
            </div>

            {/* Personnel Card 2 */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 hover:bg-surface-container-high transition-colors">
              <img 
                alt="Sarah Jenkins" 
                className="w-14 h-14 rounded-xl object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk4QTq4CMiUgloVXr8mRBY8qliU7DEbDSkaKJM8v6KkLhbgk5WQm_WmRcSCwBrVMzrwJl4LIGSjEX5O1-cLWp9lbGBGXyABzRxeVXVeeiscmJYM12rJnOLYMGoB2CjWhGA2gqkGbX_0_dOd1Ceq_sbLoY5dZwlAQH5M9RLjOH8VMYrqYjvcB3xgjygYgA2AYFZUM_EvFqyE71tDz1wNOFdcvDZt1EU2Mq3rvE2hr-0II3uhTkG77Ho09wFr49SstlfnpZX-CzJaE8"
              />
              <div className="flex-1">
                <p className="font-bold text-on-surface">Sarah Jenkins</p>
                <p className="text-xs text-on-surface-variant mb-2">Medical Officer</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">On Duty</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
              </button>
            </div>

            {/* Personnel Card 3 */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4 hover:bg-surface-container-high transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">security</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-on-surface">Safety Crew Alpha</p>
                <p className="text-xs text-on-surface-variant mb-2">8 Members Deployed</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Roaming</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">radio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}