'use client'

import { MapPin, Users, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { useState } from 'react'

  const zones = [
    { id: '1', name: 'Session Hall', label: 'Main Hall', color: 'bg-brand-teal', peopleCount: 8 },
    { id: '2', name: 'Kitchen', label: 'Food Prep', color: 'bg-brand-teal', peopleCount: 4 },
    { id: '3', name: 'First Aid Station', label: 'Medical', color: 'bg-brand-coral', peopleCount: 2 },
    { id: '4', name: 'Registration Desk', label: 'Check-in', color: 'bg-brand-gold', peopleCount: 3 },
    { id: '5', name: 'Activity Hall', label: 'Workshops', color: 'bg-brand-teal', peopleCount: 0 },
    { id: '6', name: 'Dining Area', label: 'Eating', color: 'bg-brand-teal', peopleCount: 0 },
  ]

export default function VenueMapPreview() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Venue Map & Zones</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="btn btn-secondary">
              <Maximize2 className="mr-2 h-4 w-4" />
              Full Map
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        {/* Map Container */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          {/* Mock Map Image */}
          <div 
            className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          >
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-sm text-gray-600">Venue Map Preview</p>
              <p className="text-xs text-gray-500">Upload a floorplan image to enable zone drawing</p>
            </div>
            
            {/* Mock Zone Overlays */}
            <div className="absolute inset-0">
              {/* Session Hall Zone */}
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3">
                <div className="absolute inset-0 border-2 border-primary-500 border-dashed rounded-lg bg-primary-50 bg-opacity-30"></div>
                <div className="absolute -top-2 -left-2 px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded">
                  Session Hall
                </div>
              </div>
              
              {/* Kitchen Zone */}
              <div className="absolute top-2/3 left-1/6 w-1/4 h-1/4">
                <div className="absolute inset-0 border-2 border-success-500 border-dashed rounded-lg bg-success-50 bg-opacity-30"></div>
                <div className="absolute -top-2 -left-2 px-2 py-1 bg-success-500 text-white text-xs font-medium rounded">
                  Kitchen
                </div>
              </div>
              
              {/* First Aid Zone */}
              <div className="absolute top-1/3 right-1/4 w-1/6 h-1/6">
                <div className="absolute inset-0 border-2 border-danger-500 border-dashed rounded-lg bg-danger-50 bg-opacity-30"></div>
                <div className="absolute -top-2 -left-2 px-2 py-1 bg-danger-500 text-white text-xs font-medium rounded">
                  First Aid
                </div>
              </div>
            </div>
          </div>
          
          {/* Zoom Level Indicator */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-sm px-3 py-1.5 text-sm">
            {Math.round(zoom * 100)}%
          </div>
        </div>
        
        {/* Zones Legend */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Zones Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {zones.map((zone) => (
              <div key={zone.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${zone.color} mr-2`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                      <div className="text-xs text-gray-500">{zone.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-1 h-3 w-3" />
                    {zone.peopleCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        

      </div>
    </div>
  )
}