import React, { useState, useEffect } from 'react'
import { PanelRightClose, Tag, Plus, User, Users, Clipboard, AlertCircle } from 'lucide-react'
import { Chat, DummyUser } from '@/lib/types'
import { CollapsibleSection } from './CollapsibleSection'
import { Pill } from '../ui/Pill'
import { Avatar } from '../ui/Avatar'
import { fetchSingleUserDetail } from '@/lib/api'

interface DetailsPanelProps {
  chat: Chat | null
  onClose: () => void
  onAddLabel: (chatId: string, labelText: string) => void
  onSaveNotes: (chatId: string, notes: string) => void
}

export function DetailsPanel({ chat, onClose, onAddLabel, onSaveNotes }: DetailsPanelProps) {
  const [showAllFields, setShowAllFields] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newLabelText, setNewLabelText] = useState('')
  const [isAddingLabel, setIsAddingLabel] = useState(false)

  // API user details hook state
  const [apiUserDetail, setApiUserDetail] = useState<DummyUser | null>(null)
  const [isFetchingDetail, setIsFetchingDetail] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Fetch single user detail when selected chat changes
  useEffect(() => {
    if (!chat) return

    setApiUserDetail(null)
    setFetchError(null)

    // Extract numerical ID from the chat.id (e.g. chat-1 -> 1)
    const rawId = chat.id.replace(/\D/g, '')
    const userId = parseInt(rawId, 10)

    if (isNaN(userId)) return

    setIsFetchingDetail(true)
    fetchSingleUserDetail(userId)
      .then((data) => {
        setApiUserDetail(data)
      })
      .catch((err) => {
        setFetchError('Failed to fetch details')
        console.error(err)
      })
      .finally(() => {
        setIsFetchingDetail(false)
      })
  }, [chat])

  // Synchronize internal note text with active chat
  useEffect(() => {
    if (chat) {
      setNoteText(chat.notes || '')
    }
  }, [chat])

  if (!chat) return null

  // Fallback values mapping either fetched details or active chat contact
  const firstName = apiUserDetail?.firstName || chat.contact.firstName
  const lastName = apiUserDetail?.lastName || chat.contact.lastName
  const email = apiUserDetail?.email || chat.contact.email
  const phone = apiUserDetail?.phone || chat.contact.phone
  
  // Additional details fetched from API
  const age = apiUserDetail?.age
  const gender = apiUserDetail?.gender
  const bloodGroup = apiUserDetail?.bloodGroup
  const birthDate = apiUserDetail?.birthDate

  const handleNoteSave = () => {
    onSaveNotes(chat.id, noteText)
    setIsAddingNote(false)
  }

  const handleLabelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabelText.trim()) return
    onAddLabel(chat.id, newLabelText.trim())
    setNewLabelText('')
    setIsAddingLabel(false)
  }

  return (
    <div className="w-full md:w-[340px] border-l border-gray-200 bg-white flex flex-col h-full shrink-0 select-none overflow-y-auto">
      {/* Header */}
      <div className="h-14 px-5 border-b border-gray-150 flex items-center justify-between shrink-0 bg-white">
        <h3 className="text-sm font-extrabold text-slate-900 leading-none">
          Details
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-slate-800 transition-all active:scale-95"
        >
          <PanelRightClose size={16} />
        </button>
      </div>

      {/* Accordion Panels */}
      <div className="flex-1 overflow-y-auto bg-white">
        
        {/* Section 1: Chat Data */}
        <CollapsibleSection title="Chat Data" defaultOpen={true}>
          <div className="space-y-3 pt-1">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Assignee</span>
              <div className="flex items-center gap-2 mt-1">
                <Avatar initials={chat.assignee.initials} name={chat.assignee.name} size="xs" />
                <span className="text-xs font-bold text-slate-800">{chat.assignee.name}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Team</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Users size={12} />
                </div>
                <span className="text-xs font-bold text-slate-800">{chat.team.name}</span>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 2: Contact Data */}
        <CollapsibleSection title="Contact Data" defaultOpen={true}>
          <div className="space-y-3 pt-1 relative">
            {isFetchingDetail && (
              <div className="absolute right-0 top-0 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">First Name</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{firstName}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Last Name</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{lastName}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Phone number</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Email</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5 break-all">{email}</p>
            </div>

            {/* Extra Fields revealed by "See all" */}
            {showAllFields && (
              <div className="space-y-3 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
                {age && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Age</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{age}</p>
                  </div>
                )}
                {gender && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Gender</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5 capitalize">{gender}</p>
                  </div>
                )}
                {bloodGroup && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Blood Group</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{bloodGroup}</p>
                  </div>
                )}
                {birthDate && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Birth Date</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{birthDate}</p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setShowAllFields(!showAllFields)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline pt-1 block"
            >
              {showAllFields ? 'See less' : 'See all'}
            </button>
          </div>
        </CollapsibleSection>

        {/* Section 3: Contact Labels */}
        <CollapsibleSection title="Contact Labels" defaultOpen={true}>
          <div className="flex flex-wrap gap-1.5 items-center pt-1">
            {chat.labels.map((label, idx) => (
              <Pill key={idx} variant="outline" color="blue" className="gap-1 pl-2">
                <Tag size={10} className="shrink-0" />
                <span>{label.text}</span>
              </Pill>
            ))}

            {isAddingLabel ? (
              <form onSubmit={handleLabelSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  autoFocus
                  placeholder="Label..."
                  value={newLabelText}
                  onChange={(e) => setNewLabelText(e.target.value)}
                  className="border border-gray-200 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:border-blue-500 w-16"
                />
                <button type="submit" className="text-[10px] font-bold text-blue-600">Add</button>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingLabel(true)}
                className="w-6 h-6 rounded-full border border-blue-500 hover:bg-blue-50 flex items-center justify-center text-blue-500 transition-all shrink-0 active:scale-90"
              >
                <Plus size={12} />
              </button>
            )}
          </div>
        </CollapsibleSection>

        {/* Section 4: Notes */}
        <CollapsibleSection title="Notes" defaultOpen={true}>
          <div className="space-y-2.5 pt-1">
            {isAddingNote ? (
              <div className="space-y-1.5">
                <textarea
                  placeholder="Write note details…"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full text-xs p-2 border border-amber-200 rounded-lg bg-amber-50/50 focus:outline-none focus:border-amber-400 font-medium"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsAddingNote(false)}
                    className="px-2 py-1 text-[10px] font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNoteSave}
                    className="px-2 py-1 text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300 rounded hover:bg-amber-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAddingNote(true)}
                  className="w-full text-left bg-amber-50/40 border border-amber-200/50 hover:bg-amber-50/80 rounded-xl p-3 text-xs text-gray-400 cursor-pointer font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Clipboard size={12} />
                  <span>Add a note</span>
                </button>

                {chat.notes && (
                  <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 text-xs text-slate-800 font-bold shadow-sm relative group">
                    <p className="leading-relaxed whitespace-pre-wrap">{chat.notes}</p>
                    <button
                      onClick={() => setIsAddingNote(true)}
                      className="absolute top-2 right-2 text-[10px] font-bold text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </CollapsibleSection>

        {/* Section 5: Other Chats */}
        <CollapsibleSection title="Other Chats" defaultOpen={true}>
          <div className="pt-1">
            <div className="p-3 rounded-xl border border-gray-150 bg-white hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="text-xs font-bold text-slate-800 leading-none mb-0.5">Fit4Life</p>
                  <p className="text-[10px] text-gray-500 truncate leading-none">On my way!</p>
                </div>
              </div>
              <span className="text-[9px] text-gray-400 font-bold whitespace-nowrap self-start mt-0.5">08/08/25</span>
            </div>
          </div>
        </CollapsibleSection>

      </div>
    </div>
  )
}
export default DetailsPanel
