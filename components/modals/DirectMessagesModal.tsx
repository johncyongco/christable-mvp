'use client'

import { useState } from 'react'

interface Message {
  id: string
  sender: string
  senderRole: string
  senderAvatar?: string
  content: string
  timestamp: string
  isCurrentUser: boolean
}

interface Conversation {
  id: string
  name: string
  role: string
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unread: boolean
  online: boolean
}

interface Message {
  id: string
  sender: string
  senderRole: string
  senderAvatar?: string
  content: string
  timestamp: string
  isCurrentUser: boolean
}

interface DirectMessagesModalProps {
  isOpen: boolean
  onClose: () => void
  onSendMessage?: (message: string, conversationId: string) => void
}

export default function DirectMessagesModal({ isOpen, onClose, onSendMessage }: DirectMessagesModalProps) {
  const [activeConversation, setActiveConversation] = useState<string>('1')
  const [messageInput, setMessageInput] = useState('')

  // Mock conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'Medical Officer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHsVzqByGGiewm1ukn2VnWsg_d761UK2_ZBCbvkQgWx35MtuhAOBgav5RXnClLGCCgTYvUaTCIqGALrfObXvk8YpP9zY6ukiQeBrQngfewZ_Hq-lnnTNV5uB9B9lX7cpgLkMM6xDsWAIYYJl0fkSNe7Glugq4XNi5b12r02dC_OK_SfTfVUkvG0C-h96LsSYGuRW27D5byQyfCO0YaRXmm-0dwa1nzw-k7ZBP9xauOEtAxJHw4FovnDr8u0HiXeKhZZcZXk909JWY',
      lastMessage: 'The portfolio rebalancing is complete...',
      lastMessageTime: '10:42 AM',
      unread: true,
      online: true
    },
    {
      id: '2',
      name: 'Alex Thompson',
      role: 'Security Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD8-M1O_X2Eh-wkwPZBBScg1nDAWhJ8dOEE3s5Iq5VzY4QnQ-mxGbVpoFOx5PNAhyTw0mDf0FrC_hI1WXj8oT53F4Cup4S8tMuJW5PPxzKwp2q0fc0cldLlrK4amadAhKeRWQDAqYNfrxOU1Tj7jiqm-qzyOgnigTgxs0j4zNYeJDPdAyEyypQghHfW2X0LICs0uRFOn1olW-HIbp1Nj4r35GMDCM8tvOHlIvNq4CCWjdIUVgvMCervaKfIiq5oINA0WNJdYLRK50',
      lastMessage: 'Sent a document for review.',
      lastMessageTime: '9:15 AM',
      unread: false,
      online: false
    },
    {
      id: '3',
      name: 'James Doherty',
      role: 'Logistics Manager',
      avatar: undefined,
      lastMessage: 'Can we schedule a call for Friday?',
      lastMessageTime: 'Yesterday',
      unread: false,
      online: true
    }
  ]

  // Mock messages
  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Jenkins',
      senderRole: 'Medical Officer',
      senderAvatar: conversations[0].avatar,
      content: 'Hi there! The medical supplies have been delivered to Sector 7.',
      timestamp: '10:30 AM',
      isCurrentUser: false
    },
    {
      id: '2',
      sender: 'You',
      senderRole: 'Event Coordinator',
      senderAvatar: undefined,
      content: 'Great! Were all the emergency kits included?',
      timestamp: '10:35 AM',
      isCurrentUser: true
    },
    {
      id: '3',
      sender: 'Sarah Jenkins',
      senderRole: 'Medical Officer',
      senderAvatar: conversations[0].avatar,
      content: 'Yes, all 12 emergency kits are accounted for. We also received the additional bandages you requested.',
      timestamp: '10:42 AM',
      isCurrentUser: false
    }
  ]

  const activeConv = conversations.find(c => c.id === activeConversation)

  const handleSendMessage = () => {
    if (messageInput.trim() && onSendMessage) {
      onSendMessage(messageInput, activeConversation)
      setMessageInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full h-[80vh]">
          <div className="flex h-full">
            {/* Thread List Sidebar */}
            <section className="w-80 bg-surface-container-low flex flex-col border-r border-outline-variant/20">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-on-surface">Conversations</h2>
                  <button
                    onClick={onClose}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                  <input 
                    className="w-full pl-10 pr-4 py-2 bg-surface-container-high rounded-xl text-sm border-none focus:ring-2 focus:ring-primary/40" 
                    placeholder="Search threads..." 
                    type="text"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {conversations.map((conv) => (
                  <div 
                    key={conv.id}
                    onClick={() => setActiveConversation(conv.id)}
                    className={`p-3 rounded-xl flex items-center gap-4 cursor-pointer transition-colors ${
                      activeConversation === conv.id 
                        ? 'bg-surface-container-lowest shadow-sm' 
                        : 'hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="relative">
                      {conv.avatar ? (
                        <img alt={conv.name} className="w-12 h-12 rounded-full object-cover" src={conv.avatar || undefined} />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary font-bold text-sm">
                          {conv.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-sm font-bold truncate ${
                          conv.unread ? 'text-on-surface' : 'text-on-surface-variant'
                        }`}>
                          {conv.name}
                        </h3>
                        <span className="text-[10px] text-on-surface-variant uppercase font-medium">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant truncate">{conv.lastMessage}</p>
                      {conv.unread && (
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-1"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Chat Area */}
            <section className="flex-1 flex flex-col bg-surface-container-lowest">
              {/* Header */}
              <header className="h-16 px-8 flex items-center justify-between border-b border-surface-container-high">
                <div className="flex items-center gap-4">
                  {activeConv && (
                    <>
                      <div className="relative">
                        {activeConv.avatar ? (
                          <img alt={activeConv.name} className="w-10 h-10 rounded-full object-cover" src={activeConv.avatar || undefined} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary font-bold text-sm">
                            {activeConv.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        {activeConv.online && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-on-surface">
                          {activeConv.name} 
                          <span className="text-xs font-medium text-on-surface-variant ml-2">
                            ({activeConv.role})
                          </span>
                        </h2>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${activeConv.online ? 'bg-secondary' : 'bg-outline'}`}></span>
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                            {activeConv.online ? 'Active Now' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">videocam</span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">call</span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </header>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 ${msg.isCurrentUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="flex-shrink-0">
                      {msg.senderAvatar ? (
                        <img alt={msg.sender} className="w-8 h-8 rounded-full object-cover" src={msg.senderAvatar} />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold">
                          {msg.sender.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className={`max-w-[70%] ${msg.isCurrentUser ? 'text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-on-surface">{msg.sender}</span>
                        <span className="text-[10px] text-on-surface-variant">{msg.timestamp}</span>
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        msg.isCurrentUser 
                          ? 'bg-primary text-on-primary rounded-br-none' 
                          : 'bg-surface-container-low text-on-surface rounded-bl-none'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-surface-container-high p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1 bg-surface-container-low rounded-2xl p-2">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full bg-transparent border-none resize-none focus:outline-none text-on-surface p-2"
                      rows={2}
                    />
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-lg">attach_file</span>
                        </button>
                        <button className="p-1.5 text-on-surface-variant hover:text-primary">
                          <span className="material-symbols-outlined text-lg">image</span>
                        </button>
                      </div>
                      <button 
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm ${
                          messageInput.trim()
                            ? 'bg-primary text-on-primary hover:bg-primary/90'
                            : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                        }`}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}