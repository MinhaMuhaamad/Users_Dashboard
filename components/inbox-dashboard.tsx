'use client'

import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import { TopNav, navItems } from './layout/TopNav'
import { InboxSidebar } from './inbox/InboxSidebar'
import { ConversationList } from './inbox/ConversationList'
import { ChatThread } from './inbox/ChatThread'
import { DetailsPanel } from './inbox/DetailsPanel'
import { LoadingOverlay } from './loading/LoadingOverlay'
import { SkeletonDashboard } from './loading/SkeletonDashboard'
import { HexagonFlyIcon } from './loading/HexagonFlyIcon'
import { fetchUsersAndChats, currentUser } from '@/lib/api'
import { loadingConfig } from '@/lib/loadingConfig'
import { Chat, LoadingState, Message } from '@/lib/types'

export function InboxDashboard() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  
  // Layout States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('inbox')
  
  // State Machine for loading sequence
  const [loadingState, setLoadingState] = useState<LoadingState>('loading')
  const [expandProgress, setExpandProgress] = useState(0)
  const [visibleColumns, setVisibleColumns] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  
  // Fly Animation Rects
  const [startRect, setStartRect] = useState<DOMRect | null>(null)
  const [endRect, setEndRect] = useState<DOMRect | null>(null)

  // Fetch initial chats
  const loadData = async (bypassMinTimer = false) => {
    const startTime = Date.now()
    try {
      setError(null)
      const data = await fetchUsersAndChats()
      setChats(data)
      if (data.length > 0 && !selectedChatId) {
        setSelectedChatId(data[0].id)
      }

      // Maintain minimum loading timer for UX animation
      const elapsed = Date.now() - startTime
      const delay = bypassMinTimer ? 0 : Math.max(0, loadingConfig.minLoadingTime - elapsed)
      
      setTimeout(() => {
        setLoadingState('loaded')
      }, delay)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Network error'))
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Handle wheel scrolling and touch swipe events to expand the dashboard
  useEffect(() => {
    if (loadingState !== 'loaded') {
      setExpandProgress(0)
      return
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setExpandProgress((prev) => {
          const next = Math.min(1, prev + e.deltaY * 0.0018)
          if (next >= 0.98) {
            setLoadingState('skeleton')
            return 1
          }
          return next
        })
      } else if (e.deltaY < 0) {
        setExpandProgress((prev) => Math.max(0, prev + e.deltaY * 0.0018))
      }
    }

    let startY = 0
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0
      const delta = startY - currentY
      if (delta > 0) {
        setExpandProgress((prev) => {
          const next = Math.min(1, prev + delta * 0.004)
          if (next >= 0.98) {
            setLoadingState('skeleton')
            return 1
          }
          return next
        })
      } else if (delta < 0) {
        setExpandProgress((prev) => Math.max(0, prev + delta * 0.004))
      }
      startY = currentY
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [loadingState])

  // Handle active loading states:
  // When entering 'skeleton' state, wait for skeletonDelay, then transition to 'flying'
  useEffect(() => {
    if (loadingState === 'skeleton') {
      const timer = setTimeout(() => {
        // Query coordinates for the flying animation before initiating flight
        const tabEl = document.getElementById(`nav-item-${activeTab}`)
        const destEl = document.getElementById('inbox-header')

        if (tabEl && destEl) {
          setStartRect(tabEl.getBoundingClientRect())
          setEndRect(destEl.getBoundingClientRect())
        }

        setLoadingState('flying')
      }, loadingConfig.skeletonDelay)

      return () => clearTimeout(timer)
    }
  }, [loadingState, activeTab])

  // Handle progressive populating of columns
  useEffect(() => {
    if (loadingState === 'populating') {
      setVisibleColumns(0)
      
      // Staggered column load: A -> B -> C -> D
      const timer1 = setTimeout(() => setVisibleColumns(1), loadingConfig.staggerInterval)
      const timer2 = setTimeout(() => setVisibleColumns(2), loadingConfig.staggerInterval * 2)
      const timer3 = setTimeout(() => setVisibleColumns(3), loadingConfig.staggerInterval * 3)
      const timer4 = setTimeout(() => {
        setVisibleColumns(4)
        setLoadingState('ready')
      }, loadingConfig.staggerInterval * 4)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [loadingState])

  // Trigger loading sequence when clicking tabs
  const handleTabSelect = (tabId: string) => {
    if (tabId === activeTab) return
    
    // Step 1: Selection State
    setActiveTab(tabId)
    setLoadingState('selecting')

    setTimeout(() => {
      // Step 2: Overlay
      setLoadingState('loading')
      loadData(true)
    }, loadingConfig.selectionDelay)
  }

  // Active chat methods
  const handleSendMessage = (chatId: string, text: string) => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id !== chatId) return chat

        const newMessage: Message = {
          id: `msg-sent-${Date.now()}`,
          sender: currentUser,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
          isSent: true,
        }

        return {
          ...chat,
          lastMessage: text,
          timestamp: newMessage.timestamp,
          messages: [...chat.messages, newMessage]
        }
      })
    )
  }

  const handleAddLabel = (chatId: string, labelText: string) => {
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id !== chatId) return chat
        const labelExists = chat.labels.some(l => l.text.toLowerCase() === labelText.toLowerCase())
        if (labelExists) return chat
        return {
          ...chat,
          labels: [...chat.labels, { text: labelText, color: 'blue' }]
        }
      })
    )
  }

  const handleSaveNotes = (chatId: string, notes: string) => {
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id !== chatId) return chat
        return {
          ...chat,
          notes
        }
      })
    )
  }

  // Selected chat details
  const selectedChat = chats.find(c => c.id === selectedChatId) || null

  // Find active icon for flight animation
  const activeNavItem = navItems.find(item => item.id === activeTab)
  const activeIcon = activeNavItem ? activeNavItem.icon : Inbox

  // Check if we show actual column content or skeletons based on progressive population
  const renderColumn = (colIndex: number, component: React.ReactNode) => {
    const isVisible = loadingState === 'ready' || (loadingState === 'populating' && visibleColumns >= colIndex)
    
    return (
      <div 
        className={`h-full flex transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {component}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 overflow-hidden font-sans relative">
      
      {/* Overlay Step 2 */}
      <AnimatePresence>
        {(loadingState === 'loading' || loadingState === 'loaded') && (
          <LoadingOverlay
            activeTab={activeTab}
            error={error}
            isLoading={loadingState === 'loading'}
            chats={chats}
            selectedChatId={selectedChatId}
            onExpand={() => setLoadingState('skeleton')}
            expandProgress={expandProgress}
          />
        )}
      </AnimatePresence>

      {/* Fly Icon Step 4 */}
      {loadingState === 'flying' && (
        <HexagonFlyIcon
          startRect={startRect}
          endRect={endRect}
          icon={activeIcon}
          onComplete={() => setLoadingState('populating')}
        />
      )}

      {/* Top Navbar */}
      <TopNav
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
        currentUser={currentUser}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Render Skeletons behind the panels during skeleton and populating phases */}
        {(loadingState === 'skeleton' || loadingState === 'flying' || loadingState === 'populating') && (
          <div className="absolute inset-0 z-10 bg-slate-50">
            <SkeletonDashboard />
          </div>
        )}

        {/* Dashboard Columns */}
        <div className="flex flex-1 min-h-0 bg-white">
          {/* Column A */}
          {isSidebarOpen && renderColumn(1, 
            <InboxSidebar chats={chats} selectedChatId={selectedChatId} />
          )}

          {/* Column B */}
          {renderColumn(2, 
            <ConversationList
              chats={chats}
              selectedChatId={selectedChatId}
              onSelectChat={setSelectedChatId}
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          )}

          {/* Column C */}
          {renderColumn(3, 
            <ChatThread
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              isDetailsOpen={isDetailsOpen}
              onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)}
            />
          )}

          {/* Column D */}
          {isDetailsOpen && renderColumn(4, 
            <DetailsPanel
              chat={selectedChat}
              onClose={() => setIsDetailsOpen(false)}
              onAddLabel={handleAddLabel}
              onSaveNotes={handleSaveNotes}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default InboxDashboard
