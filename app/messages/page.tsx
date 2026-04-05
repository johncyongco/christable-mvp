export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Messages</h1>
        <p className="mt-1 text-sm text-brand-light">
          View messages synced from Slack via event subscription webhook
        </p>
      </div>

       <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-brand-teal" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-brand-teal">Slack Integration</h3>
            <div className="mt-2 text-sm text-brand-teal">
              <p>
                Messages are automatically synced from Slack via event subscription webhook. 
                When a message is sent in a Slack channel, it appears here. Announcements or 
                pinged messages to individuals create conversation threads when UserID and 
                Channel ID match the person's Slack integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Recent Messages</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="border border-brand-light rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-brand-teal/20 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-brand-teal">WT</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark">Worship Team</h4>
                          <p className="text-xs text-brand-light">Session starting in 10 minutes</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-brand-dark">
                        Please ensure all audio equipment is tested and ready. Worship leaders should be at the stage 5 minutes before start time.
                      </p>
                    </div>
                    <div className="text-xs text-brand-light">15 min ago</div>
                  </div>
                </div>

                <div className="border border-brand-light rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-brand-teal/20 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-brand-teal">KT</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark">Kitchen Team</h4>
                          <p className="text-xs text-brand-light">Snack break reminder</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-brand-dark">
                        Snack break in 30 minutes. Please have refreshments ready at the dining area by 3:00 PM.
                      </p>
                    </div>
                    <div className="text-xs text-brand-light">45 min ago</div>
                  </div>
                </div>

                <div className="border border-brand-light rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-brand-coral/20 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-brand-coral">MT</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark">Medical Team</h4>
                          <p className="text-xs text-brand-light">First aid station update</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-brand-dark">
                        First aid station is fully stocked and ready. We have two medical staff on duty at all times.
                      </p>
                    </div>
                    <div className="text-xs text-brand-light">2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-brand-dark">Message Statistics</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-dark">Total Messages Sent</span>
                    <span className="text-lg font-bold text-brand-teal">142</span>
                  </div>
                  <div className="mt-1 h-2 bg-brand-light rounded-full overflow-hidden">
                    <div className="h-full bg-brand-teal rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-dark">Team Messages</span>
                    <span className="text-lg font-bold text-brand-teal">89</span>
                  </div>
                  <div className="mt-1 h-2 bg-brand-light rounded-full overflow-hidden">
                    <div className="h-full bg-brand-teal rounded-full" style={{ width: '63%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-dark">Individual Messages</span>
                    <span className="text-lg font-bold text-brand-teal">53</span>
                  </div>
                  <div className="mt-1 h-2 bg-brand-light rounded-full overflow-hidden">
                    <div className="h-full bg-brand-teal rounded-full" style={{ width: '37%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-dark">Messages Today</span>
                    <span className="text-lg font-bold text-brand-teal">24</span>
                  </div>
                  <div className="mt-1 h-2 bg-brand-light rounded-full overflow-hidden">
                    <div className="h-full bg-brand-teal rounded-full" style={{ width: '17%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}