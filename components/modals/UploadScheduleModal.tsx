'use client'

import { useState } from 'react'

interface UploadScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export default function UploadScheduleModal({ isOpen, onClose, onUpload }: UploadScheduleModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploading(true)
      
      // In a real app, this would:
      // 1. Upload the file to server
      // 2. Parse the schedule file (CSV, Excel, etc.)
      // 3. Extract schedule items
      // 4. Insert into database with current timezone
      
      console.log('Uploading schedule file:', file.name)
      
      // Mock parsing logic
      const mockParsedSchedules = [
        {
          title: 'Team Meeting',
          scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
          location: 'Conference Room A',
          team: 'Leadership'
        },
        {
          title: 'Equipment Check',
          scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
          location: 'Main Stage',
          team: 'Technical'
        }
      ]
      
      console.log('Parsed schedules:', mockParsedSchedules)
      console.log('Using current timezone for scheduling')
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      onUpload(file)
      setFile(null)
      onClose()
      
    } catch (error) {
      console.error('Failed to upload schedule:', error)
    } finally {
      setUploading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Upload Schedule</h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-on-surface-variant mb-4">
                  Upload a schedule file (CSV, Excel) to automatically import schedule items. 
                  Items will be placed on the timeline using the current timezone set in Settings.
                </p>
                
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">upload_file</span>
                    <p className="text-sm text-on-surface-variant mb-2">
                      {file ? file.name : 'Drag & drop or click to select file'}
                    </p>
                    <p className="text-xs text-on-surface-variant mb-4">
                      Supported formats: CSV, Excel, JSON
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls,.json"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="px-4 py-2 bg-surface-container-low text-on-surface rounded-lg font-medium hover:bg-surface-container-high transition-colors">
                        Select File
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-4 rounded-lg">
                <h4 className="font-medium text-on-surface mb-2">Upload Notes</h4>
                <ul className="text-sm text-on-surface-variant space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>Schedule items will be parsed and added to the timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>Current timezone from Settings will be used for scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>Duplicate items will be skipped</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-on-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm"
            >
              {uploading ? 'Uploading...' : 'Upload & Parse Schedule'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-outline-variant shadow-sm px-4 py-2 bg-surface-container-lowest text-base font-medium text-on-surface-variant hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}