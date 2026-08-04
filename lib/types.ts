export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
}

export interface Contact {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Team {
  name: string
  members: number
}

export interface Label {
  text: string
  color: 'blue' | 'gray' | 'green'
}

export interface Message {
  id: string
  sender: User
  text: string
  timestamp: string
  isOwn: boolean
  isSent?: boolean
}

export interface Chat {
  id: string
  user: User
  lastMessage: string
  timestamp: string
  unread: boolean
  messages: Message[]
  assignee: User
  team: Team
  contact: Contact
  labels: Label[]
  notes: string
}

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

export type LoadingState = 'idle' | 'selecting' | 'loading' | 'skeleton' | 'flying' | 'populating' | 'ready'
