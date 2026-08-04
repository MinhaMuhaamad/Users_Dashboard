// API Integration for fetching user data from dummy APIs
import { User, Chat } from '@/types'

export interface DummyUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  username: string
}

export interface ApiResponse<T> {
  users: T[]
  total: number
  skip: number
  limit: number
}

// Base URLs for dummy APIs
const DUMMYJSON_API = 'https://dummyjson.com/users'
const REQRES_API = 'https://reqres.in/api/users'

// Generate a color for avatar based on index
const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA']

function getColorForIndex(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

// Extract initials from name
function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

// Fetch users from dummyjson API
export async function fetchUsersFromDummyJSON(): Promise<DummyUser[]> {
  try {
    const response = await fetch(`${DUMMYJSON_API}?limit=30&select=id,firstName,lastName,email,phone,image,username`)
    if (!response.ok) {
      throw new Error('Failed to fetch users from dummyjson')
    }
    const data: ApiResponse<DummyUser> = await response.json()
    return data.users
  } catch (error) {
    console.error('[API] Error fetching from dummyjson:', error)
    throw error
  }
}

// Fetch users from reqres API
export async function fetchUsersFromReqres(): Promise<DummyUser[]> {
  try {
    const response = await fetch(`${REQRES_API}?per_page=12`)
    if (!response.ok) {
      throw new Error('Failed to fetch users from reqres')
    }
    const data: any = await response.json()
    
    // Transform reqres response to match DummyUser interface
    return data.data.map((user: any) => ({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: '',
      image: user.avatar,
      username: `${user.first_name}${user.last_name}`.toLowerCase(),
    }))
  } catch (error) {
    console.error('[API] Error fetching from reqres:', error)
    throw error
  }
}

// Transform API response to Chat objects for use in the app
export function transformApiUserToChat(apiUser: DummyUser, index: number, currentUser: User): Chat {
  const color = getColorForIndex(index)
  const initials = getInitials(apiUser.firstName, apiUser.lastName)
  
  return {
    id: `chat-${apiUser.id}`,
    user: {
      id: `user-${apiUser.id}`,
      name: `${apiUser.firstName} ${apiUser.lastName}`,
      email: apiUser.email,
      initials: initials,
    },
    lastMessage: `Hey, thanks for reaching out!`,
    timestamp: `${String((Math.random() * 23) | 0).padStart(2, '0')}:${String((Math.random() * 59) | 0).padStart(2, '0')}`,
    unread: Math.random() > 0.7,
    assignee: currentUser,
    team: {
      name: Math.random() > 0.5 ? 'Sales Team' : 'Customer Support',
      members: Math.random() > 0.5 ? 7 : 16,
    },
    contact: {
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      email: apiUser.email,
      phone: apiUser.phone || '+1 (555) 000-0000',
    },
    labels: [],
    notes: '',
    messages: [
      {
        id: `m-${apiUser.id}-1`,
        sender: {
          id: `user-${apiUser.id}`,
          name: `${apiUser.firstName} ${apiUser.lastName}`,
          email: apiUser.email,
          initials: initials,
        },
        text: `Hi there! I need some help with my account.`,
        timestamp: `${String((Math.random() * 23) | 0).padStart(2, '0')}:${String((Math.random() * 59) | 0).padStart(2, '0')}`,
        isOwn: false,
      },
      {
        id: `m-${apiUser.id}-2`,
        sender: currentUser,
        text: `Hello! I'm here to help. What seems to be the issue?`,
        timestamp: `${String((Math.random() * 23) | 0).padStart(2, '0')}:${String((Math.random() * 59) | 0).padStart(2, '0')}`,
        isOwn: true,
      },
    ],
  }
}

// Fetch single user details
export async function fetchUserDetails(userId: number): Promise<DummyUser> {
  try {
    const response = await fetch(`${DUMMYJSON_API}/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user details')
    }
    return await response.json()
  } catch (error) {
    console.error('[API] Error fetching user details:', error)
    throw error
  }
}
