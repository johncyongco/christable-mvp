"use client";

import { useState, useEffect } from "react";
import { MapPin, Upload, Edit2, Trash2, Save, X, Plus, Users, Target } from "lucide-react";

interface Zone {
  id: string;
  name: string;
  color: string;
  peopleCount: number;
  coordinates: [number, number][];
}

export default function MapPage() {
  const [zones, setZones] = useState<Zone[]>([
    { id: "1", name: "Session Hall", color: "brand-teal", peopleCount: 8, coordinates: [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]] },
    { id: "2", name: "Kitchen", color: "brand-coral", peopleCount: 4, coordinates: [[51.52, -0.08], [51.53, -0.09], [51.53, -0.07]] },
    { id: "3", name: "First Aid Station", color: "brand-gold", peopleCount: 2, coordinates: [[51.515, -0.07], [51.516, -0.08], [51.517, -0.07]] },
    { id: "4", name: "Registration Desk", color: "brand-purple", peopleCount: 3, coordinates: [[51.508, -0.11], [51.509, -0.12], [51.51, -0.11]] },
  ]);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mapImage, setMapImage] = useState<string | null>(null);

  const handleUploadMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setMapImage(event.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateZone = () => {
    if (!newZoneName.trim()) return;
    
    const newZone: Zone = {
      id: Date.now().toString(),
      name: newZoneName,
      color: ["brand-teal", "brand-coral", "brand-gold", "brand-purple"][zones.length % 4],
      peopleCount: 0,
      coordinates: [[51.5 + Math.random() * 0.03, -0.12 + Math.random() * 0.04]]
    };
    
    setZones([...zones, newZone]);
    setNewZoneName("");
    setIsDrawing(true);
  };

  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
    if (selectedZone?.id === id) {
      setSelectedZone(null);
    }
  };

  const handleAssignPeople = (zoneId: string) => {
    // In a real app, this would open a modal to assign people
    alert(`Assign people to zone ${zoneId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Venue Map & Zones</h1>
        <p className="mt-1 text-sm text-gray-600">
          Upload venue maps, draw zones, assign people to zones, and coordinate by location
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card border border-gray-200 rounded-lg shadow-sm">
            <div className="card-header bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Venue Map Editor</h3>
                <div className="flex items-center space-x-3">
                  <label className="btn btn-primary cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Floorplan
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadMap}
                    />
                  </label>
                  <button 
                    className={`btn ${isDrawing ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => setIsDrawing(!isDrawing)}
                  >
                    {isDrawing ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Stop Drawing
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Draw Zone
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="relative bg-gray-100 rounded-b-lg h-96">
                {mapImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={mapImage} 
                      alt="Venue Map" 
                      className="w-full h-full object-contain"
                    />
                    {isDrawing && (
                      <div className="absolute inset-0 border-2 border-dashed border-brand-teal pointer-events-none">
                        <div className="absolute top-4 left-4 bg-brand-teal text-white px-3 py-1 rounded-md text-sm">
                          Click to add polygon points
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <div className="text-center">
                      <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                        <MapPin className="h-full w-full" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Map Uploaded</h3>
                      <p className="text-sm text-gray-500 mb-6 max-w-md">
                        Upload a venue floorplan image to enable interactive zone drawing and location-based coordination.
                      </p>
                      <div className="space-y-3">
                        <label className="btn btn-primary cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Floorplan Image
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUploadMap}
                          />
                        </label>
                        <div className="text-xs text-gray-500">
                          Supported formats: JPG, PNG, SVG (max 10MB)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Zone markers */}
                {zones.map(zone => (
                  <div
                    key={zone.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                      selectedZone?.id === zone.id ? 'z-10' : 'z-0'
                    }`}
                    style={{
                      left: `${50 + Math.random() * 40}%`,
                      top: `${30 + Math.random() * 40}%`,
                    }}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className={`flex flex-col items-center ${selectedZone?.id === zone.id ? 'scale-110' : ''}`}>
                      <div className={`h-10 w-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${zone.color === 'brand-teal' ? 'bg-brand-teal' : zone.color === 'brand-coral' ? 'bg-brand-coral' : zone.color === 'brand-gold' ? 'bg-brand-gold' : 'bg-brand-purple'}`}>
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div className="mt-1 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                        {zone.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Zone Drawing Controls */}
          {isDrawing && (
            <div className="mt-4 card border border-gray-200 rounded-lg shadow-sm">
              <div className="card-header bg-white border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Drawing New Zone</h3>
              </div>
              <div className="card-body p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone Name
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newZoneName}
                        onChange={(e) => setNewZoneName(e.target.value)}
                        placeholder="Enter zone name (e.g., Main Stage, VIP Lounge)"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
                      />
                      <button
                        onClick={handleCreateZone}
                        disabled={!newZoneName.trim()}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Create Zone
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Click on the map to add polygon points for your zone boundary.</p>
                    <p className="mt-1">Double-click to complete the polygon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="card border border-gray-200 rounded-lg shadow-sm">
            <div className="card-header bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Zone Management</h3>
                <span className="text-sm text-gray-500">{zones.length} zones</span>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="divide-y divide-gray-200">
                {zones.map(zone => (
                  <div 
                    key={zone.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedZone?.id === zone.id ? 'bg-brand-teal/5' : ''
                    }`}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-3 w-3 rounded-full ${
                          zone.color === 'brand-teal' ? 'bg-brand-teal' : 
                          zone.color === 'brand-coral' ? 'bg-brand-coral' : 
                          zone.color === 'brand-gold' ? 'bg-brand-gold' : 'bg-brand-purple'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            {zone.peopleCount} people assigned
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignPeople(zone.id);
                          }}
                          className="text-sm text-brand-teal hover:text-brand-teal/80"
                        >
                          Assign
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteZone(zone.id);
                          }}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setIsDrawing(true)}
                  className="w-full btn btn-secondary justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Zone
                </button>
              </div>
            </div>
          </div>

          {/* Selected Zone Details */}
          {selectedZone && (
            <div className="card border border-gray-200 rounded-lg shadow-sm">
              <div className="card-header bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Zone Details</h3>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="card-body p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`h-4 w-4 rounded-full ${
                        selectedZone.color === 'brand-teal' ? 'bg-brand-teal' : 
                        selectedZone.color === 'brand-coral' ? 'bg-brand-coral' : 
                        selectedZone.color === 'brand-gold' ? 'bg-brand-gold' : 'bg-brand-purple'
                      }`}></div>
                      <h4 className="text-lg font-medium text-gray-900">{selectedZone.name}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Zone ID</div>
                        <div className="font-medium">{selectedZone.id}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">People Assigned</div>
                        <div className="font-medium">{selectedZone.peopleCount}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h5>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAssignPeople(selectedZone.id)}
                        className="w-full btn btn-secondary justify-start text-sm"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Assign People
                      </button>
                      <button className="w-full btn btn-secondary justify-start text-sm">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Zone
                      </button>
                      <button className="w-full btn btn-primary justify-start text-sm">
                        <Target className="h-4 w-4 mr-2" />
                        Ping Zone
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card border border-gray-200 rounded-lg shadow-sm">
            <div className="card-header bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body p-6">
              <div className="space-y-3">
                <button className="w-full btn btn-secondary justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Bulk Assign People
                </button>
                <button className="w-full btn btn-secondary justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Export Zone Data
                </button>
                <button className="w-full btn btn-secondary justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Zone Analytics
                </button>
                <button className="w-full btn btn-primary justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Ping All Zones
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}