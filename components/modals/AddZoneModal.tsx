'use client'

import { useState } from 'react'

interface AddZoneModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

export default function AddZoneModal({ isOpen, onClose, onSave }: AddZoneModalProps) {
  const [formData, setFormData] = useState({
    zoneName: '',
    color: 'primary',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const colors = [
    { value: 'primary', label: 'Primary', color: 'bg-primary' },
    { value: 'secondary', label: 'Secondary', color: 'bg-secondary' },
    { value: 'tertiary', label: 'Tertiary', color: 'bg-tertiary' },
    { value: 'error', label: 'Error/Alert', color: 'bg-error' },
    { value: 'success', label: 'Success', color: 'bg-success' },
    { value: 'warning', label: 'Warning', color: 'bg-warning' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Add New Zone</h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Zone Name *
                  </label>
                  <input
                    type="text"
                    name="zoneName"
                    value={formData.zoneName}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                    placeholder="Enter zone name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Zone Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          formData.color === color.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-outline-variant hover:border-outline'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                        <span className="text-sm text-on-surface">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface resize-none"
                    placeholder="Add description for this zone..."
                  />
                </div>
              </div>

              <div className="mt-8 flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-surface-container-low text-on-surface py-3.5 rounded-xl font-bold hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                >
                  Add Zone
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}