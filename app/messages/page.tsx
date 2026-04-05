'use client'

import { useState, useEffect } from 'react'

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      name: 'Sarah Jenkins',
      time: '2m ago',
      message: 'Hey! I\'ve updated the floral arrangements for the Main Ballroom. Let me know if the budget works...',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVC630s7QZe98aTo1awlm7GFWiuwcNk8wBme10WGu9yiOxoHlhkXYqPaBesbKnCM3iIivjn38jAz6-oKsL7d4HSQ8koLYMGTwPbmXnynscAe3_TpqNAIZr9OfCwv0uO0pvc0aV2COVjxtkFuUbmoracPSccFii9FjL_1dBV3DxmXS8q8bZuVZobBSXklloKJD8hmeKq0W8G1QDVlohfufNQPpod52AADRVzvjkjFFZz5kt3Ktp_YUwb5dcS5vot4_S4xgK32Mn060',
      unread: true,
      source: 'slack',
      channel: '#event-planning'
    },
    {
      name: 'Marcus Thorne',
      time: '1h ago',
      message: 'The lighting rig rental agreement has been signed by the vendor. Ready for deployment on Saturday.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPpuHf24H6yw6UTBQBlvY-S139vzqMfyAyn_SjBAwhzILcbZBiPeM3DcpT1DvBQvM3qWwDTefbvVprBmYlKyi3CNGZ3d7jCoKTLPoCrVhtyTWhql0iWgivsyNBXNiHWEOBe4FrUlzv9y9l2evqAsujZT7gnhT-GH8ji6ulkkqsygZEO0rQfm8iCbTcbrCGJtYMf3hWMkcNxIsQpabOEUiafS13jgFHNcs2v7ZWLjjzeAp9U5-XA-Aw1X1unB-gyXxrRZeOU6WiqyA',
      unread: false,
      source: 'slack',
      channel: '#technical'
    }
  ])

  const categories = [
    { name: 'All Messages', count: 18 },
    { name: 'Direct Messages', count: 12 },
    { name: 'Announcements', count: 6 },
    { name: 'Slack Events', count: 8 }
  ]

  // Simulate receiving Slack webhook messages
  useEffect(() => {
    const slackMessages = [
      {
        name: 'Slack Bot',
        time: 'Just now',
        message: 'New event created: "Team Standup Meeting" in #general',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVC630s7QZe98aTo1awlm7GFWiuwcNk8wBme10WGu9yiOxoHlhkXYqPaBesbKnCM3iIivjn38jAz6-oKsL7d4HSQ8koLYMGTwPbmXnynscAe3_TpqNAIZr9OfCwv0uO0pvc0aV2COVjxtkFuUbmoracPSccFii9FjL_1dBV3DxmXS8q8bZuVZobBSXklloKJD8hmeKq0W8G1QDVlohfufNQPpod52AADRVzvjkjFFZz5kt3Ktp_YUwb5dcS5vot4_S4xgK32Mn060',
        unread: true,
        source: 'slack-webhook',
        channel: '#general',
        event: 'channel_created'
      },
      {
        name: 'Alex Thompson',
        time: '5m ago',
        message: 'Equipment check completed for Zone B. All systems operational.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUgTAKAS8k5fAzr3e5Bz47-TKPxavIV1IqkxAbR5urFyrsEyqnbNe6K_zI2KJb8rziqiNY-znmL2xNzq-gqNo_c4p9GbbUsGycmg5vcRAe1TQiO9LRenkmhNXgoYY2oLDnn-__-Ec149Rp-_GNj7nnO3n342PBWqqbWebiuiHTJ0m0diP4Wtnc6gTZ1_sz8j9wz6ucxGVeSGc_zXp_JN81R_nq13KXfm48TMSJyuv0_SlOQMX9aAHV2NhE7DeQbiVpXCFijwjd0WU',
        unread: true,
        source: 'slack',
        channel: '#operations'
      },
      {
        name: 'Slack Bot',
        time: '15m ago',
        message: 'User @david.miller joined the channel #security',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVC630s7QZe98aTo1awlm7GFWiuwcNk8wBme10WGu9yiOxoHlhkXYqPaBesbKnCM3iIivjn38jAz6-oKsL7d4HSQ8koLYMGTwPbmXnynscAe3_TpqNAIZr9OfCwv0uO0pvc0aV2COVjxtkFuUbmoracPSccFii9FjL_1dBV3DxmXS8q8bZuVZobBSXklloKJD8hmeKq0W8G1QDVlohfufNQPpod52AADRVzvjkjFFZz5kt3Ktp_YUwb5dcS5vot4_S4xgK32Mn060',
        unread: false,
        source: 'slack-webhook',
        channel: '#security',
        event: 'member_joined_channel'
      }
    ]

    // Simulate receiving webhook messages
    const timer = setTimeout(() => {
      setMessages(prev => [...slackMessages, ...prev])
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">Messages</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Messages Received
              </h2>
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase bg-surface-container-low px-2 py-1 rounded">2 NEW</span>
            </div>
            
             <div className="space-y-4">
               {messages.map((msg, index) => (
                 <div key={index} className="group bg-surface-container-lowest p-5 rounded-xl flex items-start gap-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-outline-variant/10">
                   <div className="relative">
                     <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                       <img alt={msg.name} className="w-full h-full object-cover" src={msg.image} />
                     </div>
                     {msg.source === 'slack-webhook' && (
                       <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                         <span className="material-symbols-outlined text-white text-xs">bolt</span>
                       </div>
                     )}
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-start mb-1">
                       <div className="flex items-center gap-2">
                         <h3 className="font-bold text-on-surface">{msg.name}</h3>
                         {msg.source === 'slack' && (
                           <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">Slack</span>
                         )}
                         {msg.source === 'slack-webhook' && (
                           <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-0.5 rounded">Webhook</span>
                         )}
                       </div>
                       <span className="text-xs font-medium text-on-surface-variant">{msg.time}</span>
                     </div>
                     <p className="text-sm text-on-surface-variant leading-relaxed mb-2">{msg.message}</p>
                     {msg.channel && (
                       <div className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-xs text-on-surface-variant">tag</span>
                         <span className="text-xs text-on-surface-variant">{msg.channel}</span>
                       </div>
                     )}
                   </div>
                   {msg.unread && (
                     <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                   )}
                 </div>
               ))}
             </div>
          </section>
        </div>
        
         <div className="lg:col-span-4 space-y-6">
           <div className="bg-surface-container-low p-6 rounded-3xl">
             <h3 className="font-bold text-sm mb-4 tracking-tight">CATEGORIES</h3>
             <div className="space-y-2">
               <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-outline-variant/5">
                 <span className="text-sm font-medium">All Messages</span>
                 <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold">{categories[0].count}</span>
               </button>
               {categories.slice(1).map((category, index) => (
                 <button key={index} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white transition-colors rounded-xl group">
                   <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">{category.name}</span>
                   <span className="text-[10px] font-bold opacity-40 group-hover:opacity-100">{category.count}</span>
                 </button>
               ))}
             </div>
           </div>

           <div className="bg-surface-container-low p-6 rounded-3xl">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-sm tracking-tight">SLACK INTEGRATION</h3>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                 <span className="text-xs font-bold text-success">Connected</span>
               </div>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-on-surface-variant">Webhook Status</span>
                 <span className="text-xs font-bold bg-success/10 text-success px-2 py-0.5 rounded">Active</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-on-surface-variant">Event Subscriptions</span>
                 <span className="text-xs font-bold">8 events</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-on-surface-variant">Last Sync</span>
                 <span className="text-xs font-bold">Just now</span>
               </div>
               <div className="pt-4 border-t border-surface-container">
                 <button className="w-full text-sm font-bold text-primary hover:bg-primary/5 py-2 rounded-lg transition-colors">
                   Manage Integration
                 </button>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  )
}