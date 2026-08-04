import { Chat, User } from '@/types'

const currentUser: User = {
  id: '1',
  name: 'Michael Johnson',
  email: 'michael@example.com',
  initials: 'MJ',
}

const jamesWest: User = {
  id: '2',
  name: 'James West',
  email: 'james@example.com',
  initials: 'JW',
}

export const mockChats: Chat[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Olivia Mckinsey',
      email: 'olivia.mckinsey@gmail.com',
      initials: 'OM',
    },
    lastMessage: 'Oh my god 😭 I\'ll try it ASAP, thank...',
    timestamp: '23:23',
    unread: true,
    assignee: jamesWest,
    team: {
      name: 'Sales Team',
      members: 7,
    },
    contact: {
      firstName: 'Olivia',
      lastName: 'Mckinsey',
      email: 'olivia.mckinsey@gmail.com',
      phone: '+1 (312) 555-0134',
    },
    labels: [
      { text: 'Closed Won', color: 'blue' },
      { text: 'Chicago', color: 'gray' },
    ],
    notes: 'Strong potential for future upgrades',
    messages: [
      {
        id: 'm1',
        sender: { id: 'u1', name: 'Olivia Mckinsey', email: 'olivia@example.com', initials: 'OM' },
        text: 'Hi, I recently joined Fit4Life and I\'m trying to access my workout plan, but I can\'t login. Can you help?',
        timestamp: '23:08',
        isOwn: false,
      },
      {
        id: 'm2',
        sender: currentUser,
        text: 'Hello Olivia 👋 I\'m Michael, your AI customer support assistant. Let\'s fix this quickly. Could you confirm the email address?',
        timestamp: '23:08',
        isOwn: true,
      },
      {
        id: 'm3',
        sender: { id: 'u1', name: 'Olivia Mckinsey', email: 'olivia@example.com', initials: 'OM' },
        text: 'Yes, it\'s olivia.mckinsey@gmail.com',
        timestamp: '23:16',
        isOwn: false,
      },
      {
        id: 'm4',
        sender: currentUser,
        text: 'Thanks! Looks like your reset wasn\'t completed. I\'ve sent a new link - please check your inbox.',
        timestamp: '23:16',
        isOwn: true,
      },
      {
        id: 'm5',
        sender: { id: 'u1', name: 'Olivia Mckinsey', email: 'olivia@example.com', initials: 'OM' },
        text: 'I see it. resetting now...',
        timestamp: '23:17',
        isOwn: false,
      },
      {
        id: 'm6',
        sender: { id: 'u1', name: 'Olivia Mckinsey', email: 'olivia@example.com', initials: 'OM' },
        text: 'Done! I\'m logged in. Thanks!',
        timestamp: '23:20',
        isOwn: false,
      },
      {
        id: 'm7',
        sender: currentUser,
        text: 'Perfect 🎉 Your plan is ready under "My Programs". Since you\'re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium',
        timestamp: '23:20',
        isOwn: true,
      },
      {
        id: 'm8',
        sender: { id: 'u1', name: 'Olivia Mckinsey', email: 'olivia@example.com', initials: 'OM' },
        text: 'Oh my god 😭 I\'ll try it ASAP, thank you so much!!',
        timestamp: '23:23',
        isOwn: false,
      },
    ],
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Sara Williams',
      email: 'sara@example.com',
      initials: 'SW',
    },
    lastMessage: 'Good Evening, Emily! Hope you are...',
    timestamp: '23:16',
    unread: false,
    assignee: jamesWest,
    team: { name: 'Sales Team', members: 7 },
    contact: {
      firstName: 'Sara',
      lastName: 'Williams',
      email: 'sara@example.com',
      phone: '+1 (555) 123-4567',
    },
    labels: [],
    notes: '',
    messages: [],
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Frank Thompson',
      email: 'frank@example.com',
      initials: 'FT',
    },
    lastMessage: 'Thank you for signing up Frank! If t...',
    timestamp: '22:28',
    unread: false,
    assignee: jamesWest,
    team: { name: 'Customer Support', members: 16 },
    contact: {
      firstName: 'Frank',
      lastName: 'Thompson',
      email: 'frank@example.com',
      phone: '+1 (555) 234-5678',
    },
    labels: [],
    notes: '',
    messages: [],
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Grace Lee',
      email: 'grace@example.com',
      initials: 'GL',
    },
    lastMessage: 'I am sending you the report right a...',
    timestamp: '20:43',
    unread: false,
    assignee: jamesWest,
    team: { name: 'Sales Team', members: 7 },
    contact: {
      firstName: 'Grace',
      lastName: 'Lee',
      email: 'grace@example.com',
      phone: '+1 (555) 345-6789',
    },
    labels: [],
    notes: '',
    messages: [],
  },
]

export const mockTeams = [
  { name: 'Sales', count: 7 },
  { name: 'Customer Support', count: 16 },
]

export const currentUserData = currentUser
