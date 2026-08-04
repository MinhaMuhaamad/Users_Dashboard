'use client'

import { useState, useEffect } from 'react'
import { Chat, User } from '@/types'
import { fetchUsersFromDummyJSON, transformApiUserToChat } from '@/lib/api'
import { mockChats, currentUserData } from '@/lib/mock-data'

export interface UseChatsState {
  chats: Chat[]
  isLoading: boolean
  error: Error | null
  hasLoaded: boolean
}

export function useChatsWithApi(): UseChatsState {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadChats() {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Fetch real data from dummy API
        const apiUsers = await fetchUsersFromDummyJSON()

        if (!isMounted) return

        // Transform API users into Chat objects
        const apiChats: Chat[] = apiUsers.slice(0, 12).map((user, index) =>
          transformApiUserToChat(user, index, currentUserData)
        )

        // Combine mock chats (featured conversations) with API-fetched chats
        const combinedChats = [...mockChats, ...apiChats]

        setChats(combinedChats)
        setHasLoaded(true)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load chats'))
          // Fall back to mock data on error
          setChats(mockChats)
          setHasLoaded(true)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadChats()

    return () => {
      isMounted = false
    }
  }, [])

  return { chats, isLoading, error, hasLoaded }
}
