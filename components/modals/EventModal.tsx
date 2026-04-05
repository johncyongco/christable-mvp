'use client'

import { useState } from 'react'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  initialData?: {
    title: string
    description: string
    backgroundImage: string | null
  }
}

export default function EventModal({ isOpen, onClose, onSave, initialData }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    date: '',
    type: 'Conference',
    venue: '',
    description: initialData?.description || '',
    backgroundImage: initialData?.backgroundImage || null as string | null
  })

  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.backgroundImage || null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setPreviewImage(imageUrl)
        setFormData(prev => ({ ...prev, backgroundImage: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const eventTypes = ['Conference', 'Workshop', 'Seminar', 'Festival', 'Concert', 'Sports Event', 'Corporate Event', 'Wedding', 'Other']

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Create New Event</h3>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Image Upload Preview */}
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Event Background Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center">
                    {previewImage ? (
                      <div className="relative">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(null)
                            setFormData(prev => ({ ...prev, backgroundImage: null }))
                          }}
                          className="absolute top-2 right-2 bg-error text-on-error p-1.5 rounded-full"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">image</span>
                        <p className="text-sm text-on-surface-variant mb-2">Drag & drop or click to upload</p>
                        <p className="text-xs text-on-surface-variant mb-4">Recommended: 1920x1080px, JPG or PNG</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="backgroundImage"
                    />
                    <label
                      htmlFor="backgroundImage"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined">upload</span>
                      Choose Image
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Event Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                      required
                    >
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Venue *
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                      placeholder="Enter venue name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface resize-none"
                    placeholder="Describe your event..."
                    required
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
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}