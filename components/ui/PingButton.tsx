'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, User, Users, MapPin, MessageSquare, Megaphone, CheckSquare } from 'lucide-react'
import PingModal from '../forms/PingForm'

const pingActions = [
  { id: 'person', label: 'Ping Person', icon: User, color: 'bg-brand-teal/20 text-brand-teal' },
  { id: 'team', label: 'Ping Team', icon: Users, color: 'bg-brand-teal/20 text-brand-teal' },
  { id: 'area', label: 'Ping Area', icon: MapPin, color: 'bg-brand-teal/20 text-brand-teal' },
  { id: 'broadcast', label: 'Broadcast', icon: Megaphone, color: 'bg-brand-teal/20 text-brand-teal' },
  { id: 'task', label: 'Assign Task', icon: CheckSquare, color: 'bg-brand-teal/20 text-brand-teal' },
]

export default function PingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId)
    setIsOpen(true)
    setShowActions(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowActions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowActions(!showActions)}
           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-brand-white bg-brand-teal hover:bg-brand-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
        >
          <span>Actions</span>
          <svg className={`ml-2 -mr-1 h-5 w-5 text-white transition-transform ${showActions ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Actions dropdown */}
        {showActions && (
                 <div className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-brand-white ring-1 ring-black ring-opacity-5 divide-y divide-brand-light z-10">
            <div className="py-1">
               <div className="px-4 py-2 text-xs font-semibold text-brand-dark uppercase tracking-wider">
                 Quick Actions
               </div>
              {pingActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.id)}
                     className="group flex items-center w-full px-4 py-3 text-sm text-brand-dark hover:bg-brand-light hover:text-brand-dark"
                  >
                    <div className={`mr-3 rounded-lg p-2 ${action.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <PingModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setSelectedAction(null)
        }}
        defaultAction={selectedAction}
      />
    </>
  )
}