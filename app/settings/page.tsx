'use client'

export default function SettingsPage() {
  const webhooks = [
    {
      name: 'Discord Bot Notifications',
      url: 'https://discord.com/api/webhooks/9412...',
      status: 'Active',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      icon: 'chat'
    },
    {
      name: 'Zapier Automation Workflow',
      url: 'https://hooks.zapier.com/v/9213/b...',
      status: 'Testing',
      statusColor: 'bg-surface-container-high text-on-surface-variant',
      icon: 'hub'
    }
  ]

  return (
    <div className="ml-64 p-8 min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Settings</h2>
          <p className="text-on-surface-variant text-lg">Manage your account preferences and system configurations.</p>
        </header>
        
        <div className="flex items-center gap-8 mb-8 overflow-x-auto pb-2 border-b border-surface-container">
          <button className="flex items-center gap-2 pb-4 text-primary font-bold border-b-2 border-primary whitespace-nowrap">
            <span className="material-symbols-outlined">tune</span>
            General
          </button>
          <button className="flex items-center gap-2 pb-4 text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined">webhook</span>
            Webhook
          </button>
          <button className="flex items-center gap-2 pb-4 text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined">verified_user</span>
            Security
          </button>
          <button className="flex items-center gap-2 pb-4 text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined">notifications_active</span>
            Notifications
          </button>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 space-y-6">
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-on-surface">Platform Preferences</h3>
                <button className="text-primary font-semibold text-sm hover:underline">Save Changes</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Display Language</label>
                  <select className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface">
                    <option>English (United States)</option>
                    <option>Spanish (ES)</option>
                    <option>French (FR)</option>
                    <option>German (DE)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Timezone</label>
                  <select className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface">
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT+00:00) London</option>
                  </select>
                </div>
              </div>
              <div className="mt-10 border-t border-surface-container-low pt-8">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 block">Interface Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-primary scale-125">light_mode</span>
                    <span className="text-sm font-bold text-primary">Light</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-surface-container-high hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant scale-125">dark_mode</span>
                    <span className="text-sm font-bold text-on-surface-variant">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-surface-container-high hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant scale-125">settings_brightness</span>
                    <span className="text-sm font-bold text-on-surface-variant">System</span>
                  </button>
                </div>
              </div>
            </section>
            
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Webhooks</h3>
                  <p className="text-sm text-on-surface-variant">Outgoing notifications to external services.</p>
                </div>
                <button className="bg-primary text-white py-2 px-6 rounded-full font-bold flex items-center gap-2 hover:bg-primary/90 transition-all">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Webhook
                </button>
              </div>
              <div className="space-y-4">
                {webhooks.map((webhook, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${webhook.icon === 'chat' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'} rounded-lg flex items-center justify-center`}>
                        <span className="material-symbols-outlined">{webhook.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">{webhook.name}</h4>
                        <p className="text-xs text-on-surface-variant">{webhook.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 ${webhook.statusColor} text-[10px] font-bold rounded-full uppercase`}>{webhook.status}</span>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>security</span>
                <h3 className="text-xl font-bold text-on-surface">Security Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-surface-container-low border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-base font-bold text-on-surface">Two-Factor Authentication</h4>
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold uppercase">Active</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">Your account is secured via an Authenticator App.</p>
                  <button className="text-sm font-bold text-primary hover:underline">Manage methods</button>
                </div>
                <button className="flex items-center justify-between p-6 rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">password</span>
                    <span className="text-base font-bold text-on-surface">Change Password</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>
            </section>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-10">
          <section className="relative h-48 rounded-xl overflow-hidden group max-w-sm ml-auto">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcXgNrd06U6eOZRY7G1tRVBZSPwTo5AOb00jPuLsQpt17B2yWrfRMuYNHZAyfm2clv-tKdtzadfcCTw0bOqWwg2kqjWcea2b7NCoSgvDPn4y0FYw3XPrwn4zlsnsoqQtkqf9CbRkpMtjKWwMhhPTjy9qQyeOI2fnyIJ1Uk6AAXiJBsYa1-OVrSGHOk2lDobzXue8IqFX5kMI0Nx4XhiFtQ46e90sMJrMpKvb9r5UXcqT-92QpJI4NfxPmLg6IuRcnxRfvOKQ5KR5I" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-lg leading-tight">Need help with Venue Setup?</h4>
              <p className="text-white/70 text-xs mb-3">Our support team is available 24/7</p>
              <button className="bg-white text-primary text-xs font-bold py-2 px-4 rounded-full w-max shadow-lg">Contact Support</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}