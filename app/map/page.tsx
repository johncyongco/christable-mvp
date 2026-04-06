'use client'

import { useState, useEffect } from 'react'
import UploadFloorplanModal from '@/components/modals/UploadFloorplanModal'
import AddZoneModal from '@/components/modals/AddZoneModal'
import ZoneDetailModal from '@/components/modals/ZoneDetailModal'
import { useToast } from '@/lib/hooks/useToast'
import { useModal } from '@/lib/hooks/useModal'

interface Team {
  id: string
  name: string
  icon: string
  color: string
  memberCount: number
  status: 'active' | 'inactive' | 'overloaded'
}

interface Zone {
  id: string
  name: string
  location: string
  capacity: number
  currentOccupancy: number
  status: 'active' | 'inactive' | 'maintenance'
  description?: string
  teams: Team[]
  label?: string | null
  polygonData?: any
  venueMapId?: string
  color?: string
  users?: any[]
  schedules?: any[]
  events?: any[]
}

export default function VenueMapPage() {
  const { success, error } = useToast()
  const zoneModal = useModal<Zone>()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAddZoneModal, setShowAddZoneModal] = useState(false)
  const [zones, setZones] = useState<Zone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchZones = async () => {
    try {
      const response = await fetch('/api/zones')
      if (!response.ok) throw new Error('Failed to fetch zones')
      const data = await response.json()
      if (data.success) {
        setZones(data.data)
      }
    } catch (err) {
      error('Error', 'Failed to load zone data')
      console.error('Failed to fetch zones:', err)
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    await fetchZones()
    setIsLoading(false)
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await fetchZones()
    setIsRefreshing(false)
    success('Refreshed', 'Zone data updated')
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleZoneClick = (zone: Zone) => {
    zoneModal.openModal(zone)
  }

  const handleAddZoneSave = async (data: any) => {
    try {
      const response = await fetch('/api/zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to add zone')
      
      const result = await response.json()
      if (result.success) {
        success('Added', `${data.name} zone added successfully`)
        await fetchZones() // Refresh the list
        setShowAddZoneModal(false)
      }
    } catch (err) {
      error('Error', 'Failed to add zone')
      console.error('Failed to add zone:', err)
    }
  }

  const getZoneColor = (index: number) => {
    const colors = [
      'border-primary',
      'border-secondary',
      'border-tertiary',
      'border-error',
      'border-warning',
      'border-success'
    ]
    return colors[index % colors.length]
  }

  const getZoneBgColor = (index: number) => {
    const colors = [
      'bg-primary/10',
      'bg-secondary/10',
      'bg-tertiary/10',
      'bg-error/10',
      'bg-warning/10',
      'bg-success/10'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Venue Map</h2>
      </div>
      
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl">
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setShowUploadModal(true)}
                 className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-semibold transition-transform active:scale-95 shadow-sm font-headline hover:bg-primary/90"
               >
                 <span className="material-symbols-outlined text-[20px]">upload_file</span>
                 Upload Floor Plan
               </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
              <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium transition-colors font-body">
                <span className="material-symbols-outlined text-[20px]">label</span>
                Add Label
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium transition-colors font-body">
                <span className="material-symbols-outlined text-[20px]">draw</span>
                Draw
              </button>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest rounded-full p-1 shadow-sm">
              <button className="p-1.5 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <span className="text-xs font-bold px-1 font-headline">100%</span>
              <button className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined">zoom_out</span>
              </button>
            </div>
          </div>
          
          <div className="relative bg-surface-container-lowest rounded-xl min-h-[600px] overflow-hidden group border border-outline-variant/10 shadow-sm">
            <img alt="Venue Floor Plan" className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz-33EXWuJr-IAeVQ0SCCqSaA0Lv4F4nqYvHDo_NRQB-2z9RUwoFi5VRJUxz40I1FOxsudtqhkVEoewoDs225V2bK0lcrctKkJQ2QVegF3-F9PUbKouw1Z_s7ZKMLoLt_jTaV6pfYyKb7bc2KbXg5GedQGHeUagnOI8L3CwKoFjKpZlOJiN11TFmC_KQXLDkoEaUCfeupSf3shDtjIMXqbOtAys8ympO_ci9iHgOKwmB3z2ihRkMpOZHScVhZRf-4h-BOqH6Y_rAo" />
            
            <div className="absolute inset-0 pointer-events-none">
              <div 
                onClick={() => handleZoneClick({ 
                  id: 'main-stage', 
                  name: 'Main Stage', 
                  location: 'Center Stage Area', 
                  capacity: 5000, 
                  currentOccupancy: 3200, 
                  status: 'active' as const,
                  description: 'Main performance stage with full audio-visual setup',
                  teams: [
                    { id: '1', name: 'Tech Support', icon: 'construction', color: 'bg-primary-fixed text-primary', memberCount: 12, status: 'active' },
                    { id: '2', name: 'Security', icon: 'security', color: 'bg-secondary-fixed text-secondary', memberCount: 8, status: 'active' }
                  ]
                })}
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 border-2 border-primary/40 rounded-lg backdrop-blur-[2px] pointer-events-auto cursor-pointer hover:bg-primary/20 transition-all flex items-center justify-center"
              >
                <span className="text-primary font-bold text-xs uppercase tracking-widest font-headline">Main Stage</span>
              </div>
              
              <div 
                onClick={() => handleZoneClick({ 
                  id: 'exhibition-hall-a', 
                  name: 'Exhibition Hall A', 
                  location: 'North Wing, Level 2', 
                  capacity: 2000, 
                  currentOccupancy: 1500, 
                  status: 'active' as const,
                  description: 'Primary exhibition space for vendor booths',
                  teams: [
                    { id: '3', name: 'Vendor Support', icon: 'storefront', color: 'bg-tertiary-fixed text-tertiary', memberCount: 6, status: 'active' }
                  ]
                })}
                className="absolute top-1/2 right-1/3 w-40 h-24 bg-secondary/10 border-2 border-secondary/40 rounded-lg backdrop-blur-[2px] pointer-events-auto cursor-pointer hover:bg-secondary/20 transition-all flex items-center justify-center"
              >
                <span className="text-secondary font-bold text-xs uppercase tracking-widest font-headline">Exhibition Hall A</span>
              </div>
              
              <div 
                onClick={() => handleZoneClick({ 
                  id: 'cafe', 
                  name: 'Cafe', 
                  location: 'West Wing, Ground Floor', 
                  capacity: 150, 
                  currentOccupancy: 80, 
                  status: 'active' as const,
                  description: 'Coffee shop and refreshment area',
                  teams: [
                    { id: '4', name: 'Food Service', icon: 'restaurant', color: 'bg-error-fixed text-error', memberCount: 4, status: 'active' }
                  ]
                })}
                className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-tertiary/10 border-2 border-tertiary/40 rounded-full backdrop-blur-[2px] pointer-events-auto cursor-pointer hover:bg-tertiary/20 transition-all flex items-center justify-center"
              >
                <span className="text-tertiary font-bold text-xs uppercase tracking-widest text-center font-headline">Cafe</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white shadow-xl rounded-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined">layers</span>
              </button>
              <button className="w-10 h-10 bg-white shadow-xl rounded-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined">straighten</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-3">
           <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-on-surface font-headline">Zone Management</h3>
              <button className="text-primary text-sm font-bold hover:underline font-headline">Edit All</button>
            </div>
            <div className="space-y-4">
              {zones.map((zone, index) => (
                <div key={index} className={`p-3 bg-surface-container-low rounded-lg border-l-4 ${zone.color} transition-transform hover:-translate-y-1`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm font-headline">{zone.name}</h4>
                  </div>
                </div>
              ))}
            </div>
            
             <div className="mt-8 pt-8 border-t border-surface-container">
              <button 
                onClick={() => setShowAddZoneModal(true)}
                className="w-full bg-surface-container-low text-on-surface py-3 rounded-full text-sm font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 font-headline"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                Add a New Zone
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <UploadFloorplanModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={(file) => {
            console.log('Floor plan uploaded:', file)
            setShowUploadModal(false)
          }}
        />
      )}

       {showAddZoneModal && (
        <AddZoneModal
          isOpen={showAddZoneModal}
          onClose={() => setShowAddZoneModal(false)}
          onSave={handleAddZoneSave}
        />
       )}

       {zoneModal.isOpen && zoneModal.data && (
        <ZoneDetailModal
          isOpen={zoneModal.isOpen}
          onClose={zoneModal.closeModal}
          zone={zoneModal.data}
          onManageTeams={() => {
            console.log('Manage teams for zone:', zoneModal.data?.name)
            // This would open a team management modal
          }}
        />
       )}
     </div>
   )
 }