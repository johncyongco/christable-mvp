'use client'

import { useState } from 'react'
import { Save, TestTube, Slack, Globe, Bell, Shield, Database, RefreshCw, CheckCircle, XCircle } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Webhook Settings
    n8nWebhookUrl: 'https://your-n8n-instance.com/webhook/123456',
    slackWebhookUrl: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    slackBotToken: 'xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx',
    slackSigningSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    
    // Notification Settings
    enableSlackNotifications: true,
    enableEmailNotifications: false,
    enablePushNotifications: true,
    
    // Event Triggers
    triggerOnPing: true,
    triggerOnSchedule: true,
    triggerOnStatusChange: true,
    triggerOnTeamUpdate: true,
    
    // Security
    requireAuthForWebhooks: true,
    webhookSecret: 'your-secret-key-here',
    
    // Data Sync
    syncInterval: '5', // minutes
    autoSync: true,
  })

  const [testResults, setTestResults] = useState<Record<string, boolean | null>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleToggle = (name: string) => {
    setSettings(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof settings]
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Settings saved successfully!')
    setIsSaving(false)
  }

  const handleTestWebhook = async (webhookType: string) => {
    setIsTesting(true)
    setTestResults(prev => ({ ...prev, [webhookType]: null }))
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Random success/failure for demo
    const isSuccess = Math.random() > 0.3
    setTestResults(prev => ({ ...prev, [webhookType]: isSuccess }))
    
    if (isSuccess) {
      alert(`${webhookType} webhook test successful!`)
    } else {
      alert(`${webhookType} webhook test failed. Please check your configuration.`)
    }
    
    setIsTesting(false)
  }

  const handleTestAll = async () => {
    setIsTesting(true)
    const newResults: Record<string, boolean> = {}
    
    // Test each webhook
    const webhooks = ['n8n', 'slack']
    for (const webhook of webhooks) {
      await new Promise(resolve => setTimeout(resolve, 800))
      newResults[webhook] = Math.random() > 0.3
    }
    
    setTestResults(newResults)
    
    const allSuccessful = Object.values(newResults).every(result => result)
    if (allSuccessful) {
      alert('All webhook tests completed successfully!')
    } else {
      alert('Some webhook tests failed. Please check your configurations.')
    }
    
    setIsTesting(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Settings</h1>
        <p className="mt-1 text-sm text-brand-light">
          Configure system settings, webhooks, notifications, and integration preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Webhook Configuration */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-brand-teal mr-2" />
                  <h3 className="text-lg font-medium text-brand-dark">Webhook Configuration</h3>
                </div>
                <button
                  onClick={handleTestAll}
                  disabled={isTesting}
                  className="btn btn-secondary flex items-center text-sm"
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTesting ? 'Testing...' : 'Test All Webhooks'}
                </button>
              </div>
            </div>
            <div className="card-body space-y-6">
              {/* n8n Webhook */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-brand-teal mr-2" />
                    <h4 className="text-sm font-medium text-brand-dark">n8n Webhook</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {testResults.n8n !== null && (
                      testResults.n8n ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )
                    )}
                    <button
                      onClick={() => handleTestWebhook('n8n')}
                      disabled={isTesting}
                      className="btn btn-secondary text-xs"
                    >
                      Test
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-brand-light mb-1">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      name="n8nWebhookUrl"
                      value={settings.n8nWebhookUrl}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="https://your-n8n-instance.com/webhook/..."
                    />
                    <p className="mt-1 text-xs text-brand-light">
                      URL where n8n automation workflows will receive events
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="triggerOnPing"
                      checked={settings.triggerOnPing}
                      onChange={() => handleToggle('triggerOnPing')}
                      className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                    />
                    <label htmlFor="triggerOnPing" className="ml-2 text-sm text-brand-dark">
                      Trigger on ping events
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="triggerOnSchedule"
                      checked={settings.triggerOnSchedule}
                      onChange={() => handleToggle('triggerOnSchedule')}
                      className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                    />
                    <label htmlFor="triggerOnSchedule" className="ml-2 text-sm text-brand-dark">
                      Trigger on schedule events
                    </label>
                  </div>
                </div>
              </div>

              {/* Slack Webhook */}
              <div className="pt-6 border-t border-brand-light">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Slack className="h-4 w-4 text-brand-teal mr-2" />
                    <h4 className="text-sm font-medium text-brand-dark">Slack Integration</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {testResults.slack !== null && (
                      testResults.slack ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )
                    )}
                    <button
                      onClick={() => handleTestWebhook('slack')}
                      disabled={isTesting}
                      className="btn btn-secondary text-xs"
                    >
                      Test
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-brand-light mb-1">
                      Slack Webhook URL
                    </label>
                    <input
                      type="url"
                      name="slackWebhookUrl"
                      value={settings.slackWebhookUrl}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-light mb-1">
                      Slack Bot Token
                    </label>
                    <input
                      type="password"
                      name="slackBotToken"
                      value={settings.slackBotToken}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="xoxb-..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-light mb-1">
                      Slack Signing Secret
                    </label>
                    <input
                      type="password"
                      name="slackSigningSecret"
                      value={settings.slackSigningSecret}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Signing secret for verification"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="pt-6 border-t border-brand-light">
                <div className="flex items-center mb-3">
                  <Shield className="h-4 w-4 text-brand-teal mr-2" />
                  <h4 className="text-sm font-medium text-brand-dark">Security Settings</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireAuthForWebhooks"
                      checked={settings.requireAuthForWebhooks}
                      onChange={() => handleToggle('requireAuthForWebhooks')}
                      className="h-4 w-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                    />
                    <label htmlFor="requireAuthForWebhooks" className="ml-2 text-sm text-brand-dark">
                      Require authentication for webhooks
                    </label>
                  </div>
                  {settings.requireAuthForWebhooks && (
                    <div>
                      <label className="block text-sm font-medium text-brand-light mb-1">
                        Webhook Secret
                      </label>
                      <input
                        type="password"
                        name="webhookSecret"
                        value={settings.webhookSecret}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Secret key for webhook authentication"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-brand-teal mr-2" />
                <h3 className="text-lg font-medium text-brand-dark">Notification Settings</h3>
              </div>
            </div>
            <div className="card-body space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark">Slack Notifications</p>
                  <p className="text-xs text-brand-light">Send notifications to Slack channels</p>
                </div>
                <button
                  onClick={() => handleToggle('enableSlackNotifications')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
                    settings.enableSlackNotifications ? 'bg-brand-teal' : 'bg-gray-200'
                  }`}
                  role="switch"
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.enableSlackNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark">Email Notifications</p>
                  <p className="text-xs text-brand-light">Send email notifications</p>
                </div>
                <button
                  onClick={() => handleToggle('enableEmailNotifications')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
                    settings.enableEmailNotifications ? 'bg-brand-teal' : 'bg-gray-200'
                  }`}
                  role="switch"
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.enableEmailNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark">Push Notifications</p>
                  <p className="text-xs text-brand-light">Send push notifications to mobile devices</p>
                </div>
                <button
                  onClick={() => handleToggle('enablePushNotifications')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
                    settings.enablePushNotifications ? 'bg-brand-teal' : 'bg-gray-200'
                  }`}
                  role="switch"
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.enablePushNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Data Sync Settings */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-brand-teal mr-2" />
                <h3 className="text-lg font-medium text-brand-dark">Data Sync</h3>
              </div>
            </div>
            <div className="card-body space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark">Auto Sync</p>
                  <p className="text-xs text-brand-light">Automatically sync data with external systems</p>
                </div>
                <button
                  onClick={() => handleToggle('autoSync')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
                    settings.autoSync ? 'bg-brand-teal' : 'bg-gray-200'
                  }`}
                  role="switch"
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.autoSync ? 'translate-x-5' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>

              {settings.autoSync && (
                <div>
                  <label className="block text-sm font-medium text-brand-light mb-1">
                    Sync Interval (minutes)
                  </label>
                  <select
                    name="syncInterval"
                    value={settings.syncInterval}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1">1 minute</option>
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              )}

              <div className="pt-4 border-t border-brand-light">
                <button className="w-full btn btn-secondary flex items-center justify-center">
                  <Database className="h-4 w-4 mr-2" />
                  Manual Sync Now
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Quick Actions</h3>
            </div>
            <div className="card-body space-y-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save All Settings'}
              </button>
              <button className="w-full btn btn-secondary">
                Export Configuration
              </button>
              <button className="w-full btn btn-secondary">
                Reset to Defaults
              </button>
              <button className="w-full btn btn-secondary">
                View API Documentation
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">System Status</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark">n8n Integration</span>
                  <span className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark">Slack Integration</span>
                  <span className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark">Database</span>
                  <span className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark">Last Sync</span>
                  <span className="text-sm text-brand-dark">2 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}