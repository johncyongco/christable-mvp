'use client'

import { useState } from 'react'
import ContactSupportModal from '@/components/modals/ContactSupportModal'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    language: 'English (United States)',
    timezone: '(GMT-08:00) Pacific Time',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      slack: true,
      sms: false
    }
  })

  const [showContactSupport, setShowContactSupport] = useState(false)
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
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 pb-4 whitespace-nowrap ${
              activeTab === 'general' 
                ? 'text-primary font-bold border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-on-surface transition-colors'
            }`}
          >
            <span className="material-symbols-outlined">tune</span>
            General
          </button>
          <button 
            onClick={() => setActiveTab('webhook')}
            className={`flex items-center gap-2 pb-4 whitespace-nowrap ${
              activeTab === 'webhook' 
                ? 'text-primary font-bold border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-on-surface transition-colors'
            }`}
          >
            <span className="material-symbols-outlined">webhook</span>
            Webhook
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 pb-4 whitespace-nowrap ${
              activeTab === 'security' 
                ? 'text-primary font-bold border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-on-surface transition-colors'
            }`}
          >
            <span className="material-symbols-outlined">verified_user</span>
            Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 pb-4 whitespace-nowrap ${
              activeTab === 'notifications' 
                ? 'text-primary font-bold border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-on-surface transition-colors'
            }`}
          >
            <span className="material-symbols-outlined">notifications_active</span>
            Notifications
          </button>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 space-y-6">
            {activeTab === 'general' && (
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-on-surface">Platform Preferences</h3>
                  <button 
                    onClick={() => {
                      console.log('Settings saved:', settings)
                      alert('Settings saved successfully!')
                    }}
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    Save Changes
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Display Language</label>
                    <select 
                      value={settings.language}
                      onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                    >
                      <option>English (United States)</option>
                      <option>Spanish (ES)</option>
                      <option>French (FR)</option>
                      <option>German (DE)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Timezone</label>
                    <select 
                      value={settings.timezone}
                      onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                    >
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) London</option>
                      <option>(GMT+01:00) Central European Time</option>
                      <option>(GMT+08:00) Singapore</option>
                    </select>
                  </div>
                </div>
                <div className="mt-10 border-t border-surface-container-low pt-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 block">Interface Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'light' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-surface-container-high hover:bg-surface-container'
                      }`}
                    >
                      <span className={`material-symbols-outlined scale-125 ${
                        settings.theme === 'light' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>light_mode</span>
                      <span className={`text-sm font-bold ${
                        settings.theme === 'light' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>Light</span>
                    </button>
                    <button 
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'dark' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-surface-container-high hover:bg-surface-container'
                      }`}
                    >
                      <span className={`material-symbols-outlined scale-125 ${
                        settings.theme === 'dark' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>dark_mode</span>
                      <span className={`text-sm font-bold ${
                        settings.theme === 'dark' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>Dark</span>
                    </button>
                    <button 
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'system' }))}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'system' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-surface-container-high hover:bg-surface-container'
                      }`}
                    >
                      <span className={`material-symbols-outlined scale-125 ${
                        settings.theme === 'system' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>settings_brightness</span>
                      <span className={`text-sm font-bold ${
                        settings.theme === 'system' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>System</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'webhook' && (
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
            )}

            {activeTab === 'security' && (
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
            )}

            {activeTab === 'notifications' && (
              <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-on-surface">Notification Settings</h3>
                  <button 
                    onClick={() => {
                      console.log('Notification settings saved:', settings.notifications)
                      alert('Notification settings saved!')
                    }}
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    Save Changes
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div>
                      <h4 className="font-bold text-on-surface">Email Notifications</h4>
                      <p className="text-sm text-on-surface-variant">Receive updates via email</p>
                    </div>
                    <button 
                      onClick={() => setSettings(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, email: !prev.notifications.email }
                      }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.email ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        settings.notifications.email ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div>
                      <h4 className="font-bold text-on-surface">Push Notifications</h4>
                      <p className="text-sm text-on-surface-variant">Receive browser notifications</p>
                    </div>
                    <button 
                      onClick={() => setSettings(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, push: !prev.notifications.push }
                      }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.push ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        settings.notifications.push ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div>
                      <h4 className="font-bold text-on-surface">Slack Notifications</h4>
                      <p className="text-sm text-on-surface-variant">Receive updates in Slack</p>
                    </div>
                    <button 
                      onClick={() => setSettings(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, slack: !prev.notifications.slack }
                      }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.slack ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        settings.notifications.slack ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div>
                      <h4 className="font-bold text-on-surface">SMS Notifications</h4>
                      <p className="text-sm text-on-surface-variant">Receive text message alerts</p>
                    </div>
                    <button 
                      onClick={() => setSettings(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, sms: !prev.notifications.sms }
                      }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.sms ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        settings.notifications.sms ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-10">
          <section className="relative h-48 rounded-xl overflow-hidden group max-w-sm ml-auto">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcXgNrd06U6eOZRY7G1tRVBZSPwTo5AOb00jPuLsQpt17B2yWrfRMuYNHZAyfm2clv-tKdtzadfcCTw0bOqWwg2kqjWcea2b7NCoSgvDPn4y0FYw3XPrwn4zlsnsoqQtkqf9CbRkpMtjKWwMhhPTjy9qQyeOI2fnyIJ1Uk6AAXiJBsYa1-OVrSGHOk2lDobzXue8IqFX5kMI0Nx4XhiFtQ46e90sMJrMpKvb9r5UXcqT-92QpJI4NfxPmLg6IuRcnxRfvOKQ5KR5I" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-lg leading-tight">Need help with Venue Setup?</h4>
              <p className="text-white/70 text-xs mb-3">Our support team is available 24/7</p>
              <button 
                onClick={() => setShowContactSupport(true)}
                className="bg-white text-primary text-xs font-bold py-2 px-4 rounded-full w-max shadow-lg hover:bg-white/90 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </section>
        </div>
      </div>

      <ContactSupportModal
        isOpen={showContactSupport}
        onClose={() => setShowContactSupport(false)}
      />
    </div>
  )
}