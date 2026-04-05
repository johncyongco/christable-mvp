'use client'

interface PersonnelDirectoryModalProps {
  isOpen: boolean
  onClose: () => void
  onPersonClick: (person: any) => void
}

const personnel = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.c@christable.com',
    role: 'Logistics Lead',
    team: 'Operations',
    status: 'On Duty',
    statusColor: 'bg-secondary',
    phone: '+1 (555) 123-4567',
    slackUserId: 'U1234567890',
    slackChannelId: 'C1234567890',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnYUXgF8Mw8wN6BGxRbjrvwC4UloMpCHxYNw0Ev-vChjsuRHfKDDJqv0bl6_UKuZeufpZMcyOw3TsTt4rC9qxOejwpktKVq0Ros5BhtEvBJVe16ClFJEopkcGE7grhuw8wvlVh9Kxpdq_JSjbd-BynelA-5MnTcysQOddfKdRIcOGDAdbxkn7GrCOC5CwdGWlmSl7_q43T4EQAroOpI4NKQDBUKa_hueT4x8qTfdOmtcnvKuNcNJ-_SlYt9TRKr6ahnXH1NlWLoa4'
  },
  {
    id: '2',
    name: 'Marcus Jensen',
    email: 'm.jensen@christable.com',
    role: 'Medical Officer',
    team: 'Health & Safety',
    status: 'Roaming',
    statusColor: 'bg-primary',
    phone: '+1 (555) 234-5678',
    slackUserId: 'U2345678901',
    slackChannelId: 'C2345678901',
    image: null
  },
  {
    id: '3',
    name: 'David Miller',
    email: 'd.miller@christable.com',
    role: 'Security',
    team: 'Perimeter',
    status: 'Available',
    statusColor: 'bg-outline-variant',
    phone: '+1 (555) 345-6789',
    slackUserId: 'U3456789012',
    slackChannelId: 'C3456789012',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdqF5mVj3FpwMoK3p4SYwowFijpbdS4dQ5ddd7s2UJELXpohJbgqKh2idfdhuIzva0bQA9NyWCbKLvP1vZNTPnj0OWiNonl7vtDBMADpWpeCNpY3DLIhCjxzRZcToU3KmRARgnz1MNfuMwW8OfmaKft4_0kwRYyzASc-05C-StKurJ1kzyuVPcLjYsk81p0115huDnK_dFMybWYdUC_d4VDAD5fdKgSemw8ioWb3aqC22ChPRUunVT1_zELg-hyN4wXg52H5AflAI'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@christable.com',
    role: 'Logistics Lead',
    team: 'Supply Chain',
    status: 'On Duty',
    statusColor: 'bg-secondary',
    phone: '+1 (555) 456-7890',
    slackUserId: 'U4567890123',
    slackChannelId: 'C4567890123',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbERxoHAFOE8fSr1NKUJwtsQMcdEL5cU7n4zpew3d1LvaHinx4ZZOn7M1pFOlOtuYeWB8g7mnFSVrLb2Dy0H38bIPgUyAux7yQzwuCH4pcPI0ZL6poTh5807NPEhltUSWaLGhzGd3vyNk1DsTFrOeW3PUUMCQ8N22UBgxn1lpTX8L_Gtnu4Qibbr8GbjznTUX4HtJaIu4hIxazq7v_iIUkW-GXBTbprZsYtcz54UEG3XzPn4RlVx-S5zlrcbrO0IaZmEWQHjtlqCE'
  }
]

export default function PersonnelDirectoryModal({ isOpen, onClose, onPersonClick }: PersonnelDirectoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-on-surface/75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-surface-container-lowest rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="bg-surface-container-lowest px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-on-surface">Personnel Directory</h3>
                <p className="text-on-surface-variant mt-1">All active personnel across all teams</p>
              </div>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="text-on-surface-variant text-[11px] uppercase tracking-widest bg-surface-container-low/50">
                    <th className="px-6 py-4 font-bold">Name</th>
                    <th className="px-6 py-4 font-bold">Role</th>
                    <th className="px-6 py-4 font-bold">Team</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {personnel.map((person) => (
                    <tr 
                      key={person.id} 
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                      onClick={() => onPersonClick(person)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {person.image ? (
                            <img alt={person.name} className="w-9 h-9 rounded-full object-cover" src={person.image} />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                              {person.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-sm text-on-surface">{person.name}</p>
                            <p className="text-xs text-on-surface-variant">{person.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">{person.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-on-surface-variant">{person.team}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${person.statusColor}`}></span>
                          <span className="text-xs font-semibold uppercase">{person.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-on-surface-variant">{person.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-1.5 rounded-lg hover:bg-surface-container-highest transition-colors opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              alert(`Ping sent to ${person.name}`)
                            }}
                          >
                            <span className="material-symbols-outlined text-xl text-primary">notifications</span>
                          </button>
                          <button 
                            className="p-1 rounded-lg hover:bg-surface-container-highest transition-colors opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              onPersonClick(person)
                            }}
                          >
                            <span className="material-symbols-outlined text-xl">visibility</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-on-surface-variant">
                Showing {personnel.length} of {personnel.length} personnel
              </div>
              <div className="flex items-center gap-3">
                <button className="text-sm font-bold text-primary hover:underline">
                  Export to CSV
                </button>
                <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">
                  Add New Person
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}