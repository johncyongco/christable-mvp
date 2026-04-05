'use client'

import { useState } from 'react'
import UploadFloorplanModal from '@/components/modals/UploadFloorplanModal'
import AddZoneModal from '@/components/modals/AddZoneModal'

export default function VenueMapPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAddZoneModal, setShowAddZoneModal] = useState(false)
  const zones = [
    {
      name: 'Session Hall',
      color: 'border-primary'
    },
    {
      name: 'Kitchen',
      color: 'border-outline-variant/20'
    },
    {
      name: 'Prayer Room',
      color: 'border-outline-variant/20'
    }
  ]

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
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 border-2 border-primary/40 rounded-lg backdrop-blur-[2px] pointer-events-auto cursor-pointer hover:bg-primary/20 transition-all flex items-center justify-center">
                <span className="text-primary font-bold text-xs uppercase tracking-widest font-headline">Main Stage</span>
              </div>
              
              <div className="absolute top-1/2 right-1/3 w-40 h-24 bg-secondary/10 border-2 border-secondary/40 rounded-lg backdrop-blur-[2px] pointer-events-auto cursor-pointer hover:bg-secondary/20 transition-all flex items-center justify-center">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest font-headline">Exhibition Hall A</span>
              </div>
              
              <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-tertiary/10 border-2 border-tertiary/40 rounded-full backdrop-blur-[2px] pointer-events-auto cursor-pointer hover:bg-tertiary/20 transition-all flex items-center justify-center">
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
          onSave={(data) => {
            console.log('New zone added:', data)
            setShowAddZoneModal(false)
          }}
        />
      )}
    </div>
  )