import { User, Chat, DummyUser, ApiResponse, Message, Label } from './types'

// Generate a soft color for avatar backgrounds based on initials/id
const AVATAR_COLORS = [
  'bg-pink-500 text-white',
  'bg-purple-500 text-white',
  'bg-yellow-500 text-white animate-text-dark', // yellow should look good
  'bg-blue-500 text-white',
  'bg-orange-500 text-white',
  'bg-teal-500 text-white',
  'bg-indigo-500 text-white',
  'bg-rose-500 text-white',
]

export function getAvatarColor(id: string | number): string {
  const numId = typeof id === 'number' ? id : parseInt(id.replace(/\D/g, '') || '0', 10)
  return AVATAR_COLORS[numId % AVATAR_COLORS.length]
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

// Current User Details
export const currentUser: User = {
  id: 'current-user-michael',
  name: 'Michael Johnson',
  email: 'michael.johnson@boxpad.com',
  initials: 'MJ',
}

// Fit4Life Reset Chat Script (Hardcoded active thread for Olivia Mckinsey)
export const oliviaMessages: Message[] = [
  {
    id: 'olivia-msg-1',
    sender: { id: 'olivia-user', name: 'Olivia Mckinsey', email: 'olivia.Mckinsey@gmail.com', initials: 'OM' },
    text: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
    timestamp: '23:08',
    isOwn: false,
  },
  {
    id: 'olivia-msg-2',
    sender: currentUser,
    text: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
    timestamp: '23:08',
    isOwn: true,
    isSent: true,
  },
  {
    id: 'olivia-msg-3',
    sender: { id: 'olivia-user', name: 'Olivia Mckinsey', email: 'olivia.Mckinsey@gmail.com', initials: 'OM' },
    text: "Yes, it's olivia.Mckinsey@gmail.com",
    timestamp: '23:16',
    isOwn: false,
  },
  {
    id: 'olivia-msg-4',
    sender: currentUser,
    text: "Thanks! Looks like your reset wasn't completed. I've sent a new link – please check your inbox.",
    timestamp: '23:16',
    isOwn: true,
    isSent: true,
  },
  {
    id: 'olivia-msg-5',
    sender: { id: 'olivia-user', name: 'Olivia Mckinsey', email: 'olivia.Mckinsey@gmail.com', initials: 'OM' },
    text: "I see it. resetting now…",
    timestamp: '23:17',
    isOwn: false,
  },
  {
    id: 'olivia-msg-6',
    sender: { id: 'olivia-user', name: 'Olivia Mckinsey', email: 'olivia.Mckinsey@gmail.com', initials: 'OM' },
    text: "Done! I'm logged in. Thanks!",
    timestamp: '23:20',
    isOwn: false,
  },
  {
    id: 'olivia-msg-7',
    sender: currentUser,
    text: "Perfect 🎉 Your plan is ready under \"My Programs\". Since you're starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium",
    timestamp: '23:20',
    isOwn: true,
    isSent: true,
  },
  {
    id: 'olivia-msg-8',
    sender: { id: 'olivia-user', name: 'Olivia Mckinsey', email: 'olivia.Mckinsey@gmail.com', initials: 'OM' },
    text: "Oh my god 😍 I'll try it ASAP, thank you so much!!",
    timestamp: '23:23',
    isOwn: false,
  },
]

// Seed Names from user prompt
const SEED_CHAT_DATA = [
  { name: 'Olivia Mckinsey', lastMsg: "Oh my god 😍 I'll try it ASAP, thank..", time: '23:23' },
  { name: 'Sara Williams', lastMsg: 'Good Evening, Emily! Hope you are...', time: '23:16' },
  { name: 'Frank Thompson', lastMsg: 'Thank you for signing up Frank! If t...', time: '22:28' },
  { name: 'Grace Lee', lastMsg: 'I am sending you the report right a...', time: '20:43' },
  { name: 'Henry Adams', lastMsg: 'Thank you for filling out our survey!', time: '17:37' },
  { name: 'Isabella Martinez', lastMsg: 'I will update you soon Isabella!', time: '16:01' },
  { name: 'James Brown', lastMsg: 'Hello James! Let\'s collaborate on...', time: '13:44' },
  { name: 'Katherine White', lastMsg: 'Hi Katherine, looking forward to our...', time: '09:02' },
  { name: 'Lucas Green', lastMsg: 'Hey Lucas! Ready for the holiday...', time: 'Yesterday' },
]

export async function fetchUsersAndChats(): Promise<Chat[]> {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=30')
    if (!response.ok) {
      throw new Error(`API fetch error: ${response.statusText}`)
    }
    const data: ApiResponse<DummyUser> = await response.json()
    const apiUsers = data.users

    // Map dummyjson users to seed conversations/structure
    const chats: Chat[] = apiUsers.slice(0, 9).map((apiUser, idx) => {
      const seed = SEED_CHAT_DATA[idx] || {
        name: `${apiUser.firstName} ${apiUser.lastName}`,
        lastMsg: 'Hey! Let\'s catch up later.',
        time: 'Yesterday',
      }

      const nameParts = seed.name.split(' ')
      const firstName = nameParts[0] || apiUser.firstName
      const lastName = nameParts.slice(1).join(' ') || apiUser.lastName

      const userObj: User = {
        id: `user-${apiUser.id}`,
        name: seed.name,
        email: apiUser.email,
        initials: getInitials(firstName, lastName),
      }

      // Olivia has the custom message array, others have simpler ones
      const chatMessages: Message[] =
        idx === 0
          ? oliviaMessages
          : [
              {
                id: `msg-${apiUser.id}-1`,
                sender: userObj,
                text: 'Hello Michael, can we discuss my registration?',
                timestamp: '10:00',
                isOwn: false,
              },
              {
                id: `msg-${apiUser.id}-2`,
                sender: currentUser,
                text: `Hi ${firstName}! Sure, how can I help?`,
                timestamp: '10:02',
                isOwn: true,
                isSent: true,
              },
              {
                id: `msg-${apiUser.id}-3`,
                sender: userObj,
                text: seed.lastMsg,
                timestamp: seed.time === 'Yesterday' ? '18:00' : seed.time,
                isOwn: false,
              },
            ]

      const labels: Label[] =
        idx === 0
          ? [
              { text: 'Closed Won', color: 'blue' },
              { text: 'Chicago', color: 'blue' },
            ]
          : []

      return {
        id: `chat-${apiUser.id}`,
        user: userObj,
        lastMessage: seed.lastMsg,
        timestamp: seed.time,
        unread: idx === 0 || idx === 1 || idx === 7, // mock some unreads
        messages: chatMessages,
        assignee: {
          id: 'user-james-west',
          name: 'James West',
          email: 'james.west@boxpad.com',
          initials: 'JW',
        },
        team: {
          name: idx % 2 === 0 ? 'Sales Team' : 'Customer Support',
          members: idx % 2 === 0 ? 7 : 16,
        },
        contact: {
          firstName,
          lastName,
          email: apiUser.email,
          phone: apiUser.phone,
        },
        labels,
        notes: idx === 0 ? 'Strong potential for future upgrades' : '',
      }
    })

    return chats
  } catch (error) {
    console.error('Error fetching users and chats:', error)
    throw error
  }
}

export async function fetchSingleUserDetail(userId: number): Promise<DummyUser> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`)
    if (!response.ok) {
      throw new Error(`API detail fetch error: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching single user detail:', error)
    throw error
  }
}
