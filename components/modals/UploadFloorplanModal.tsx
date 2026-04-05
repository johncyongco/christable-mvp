'use client'

import { useState } from 'react'

interface UploadFloorplanModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export default function UploadFloorplanModal({ isOpen, onClose, onUpload }: UploadFloorplanModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFile) {
      onUpload(selectedFile)
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
              <h3 className="text-2xl font-bold text-on-surface">Upload Floor Plan</h3>
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
                    Floor Plan Image
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center">
                    {previewImage ? (
                      <div className="relative">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-48 object-contain rounded-lg mb-4"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(null)
                            setSelectedFile(null)
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
                        <p className="text-xs text-on-surface-variant mb-4">Recommended: PNG, JPG, or SVG format</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="floorplanImage"
                    />
                    <label
                      htmlFor="floorplanImage"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined">upload</span>
                      Choose Image
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Floor Plan Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface"
                    placeholder="e.g., Main Level, Basement, Outdoor Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-on-surface resize-none"
                    placeholder="Add description for this floor plan..."
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
                  disabled={!selectedFile}
                  className={`flex-1 py-3.5 rounded-xl font-bold transition-colors ${
                    selectedFile 
                      ? 'bg-primary text-on-primary hover:bg-primary/90' 
                      : 'bg-surface-container text-on-surface-variant cursor-not-allowed'
                  }`}
                >
                  Upload Floor Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}