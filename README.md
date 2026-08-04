# BOXpad Inbox / CRM Dashboard Clone

This repository contains a pixel-accurate, production-quality clone of the **BOXpad** (SaaS live-chat + AI-employee customer support platform) Inbox / CRM dashboard.

## Tech Stack
- **Framework**: Next.js 14/15 (App Router)
- **Language**: TypeScript (Fully typed, no `any`)
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion (for state transitions and loading overlays)
- **Icons**: Lucide React

---

## Folder Structure
We have structured the codebase exactly as requested:
```
app/
  layout.tsx
  page.tsx                 // Inbox dashboard route
components/
  layout/
    TopNav.tsx             // Global Top Navbar
    HoneycombIcon.tsx      // Hexagonal navigation / decorative icons
  inbox/
    InboxSidebar.tsx       // Column A (Inbox navigation & categories)
    ConversationList.tsx   // Column B (Search filters & conversations list)
    ConversationListItem.tsx // Column B Individual conversation preview cards
    ChatThread.tsx         // Column C (Active conversation thread)
    MessageBubble.tsx      // Column C Chat message bubble layout
    Composer.tsx           // Column C Bottom input box + icons
    DetailsPanel.tsx       // Column D (Expanded chat/contact details panel)
    CollapsibleSection.tsx // Column D Accordion animation wrapper
  loading/
    LoadingOverlay.tsx     // Step 2 Full-screen radial navy overlay
    SkeletonDashboard.tsx  // Step 3 Pulse skeleton layout
    HexagonFlyIcon.tsx     // Step 4 Flying hexagon translation animation
  ui/
    Avatar.tsx             // Soft background initials-derived avatar bubble
    Badge.tsx              // Notification count badge
    Pill.tsx               // Date divider and label pills
    Dropdown.tsx           // Custom reveal filter dropdown
lib/
  api.ts                   // Typed API client (dummyjson user mapping)
  types.ts                 // Core TypeScript interfaces
  loadingConfig.ts         // Central timing constants for animation transitions
```

---

## Loading State Machine Flow

The application implements a robust state machine driving the dashboard load sequence:

```
[Selecting] ──(selectionDelay: 200ms)──> [Loading (Overlay)] 
                                               │
                                       (API fetch completes)
                                               ▼
                                         [Skeleton] ──(skeletonDelay: 800ms)──> [Flying (Icon animation)]
                                                                                       │
                                                                                (Fly animation completes)
                                                                                       ▼
[Ready (Complete Panels)] <──(4-step staggered populate)── [Populating] ◄──────────────┘
```

1. **Selecting (`selecting`)**: Clicking a nav tab prompts a brief scale/opacity selection transition (200ms).
2. **Loading Overlay (`loading`)**: Visual block showing rotating conic gradient ring, floating hexagons, status info, and drawer preview.
3. **Skeleton State (`skeleton`)**: Full dashboard layout is rendered with pulse placeholders for text fields, avatar slots, and details panels (800ms).
4. **Icon-Fly (`flying`)**: Selected honeycomb icon translates, scales, and fades out dynamically from its header position into the left sidebar header (650ms).
5. **Populating (`populating`)**: Columns fade/slide in sequentially from Column A through Column D (100ms stagger intervals).
6. **Ready (`ready`)**: Full interactive workspace is loaded.

---

## Mandatory API Integration

1. **Conversation List & Users List**: Fetching lists from `https://dummyjson.com/users` dynamically populates Column A's **Users** collapsible group and Column B's **Conversations** scroll list.
2. **Detailed Contact Card**: Clicking a conversation triggers a fetch for details from `https://dummyjson.com/users/{userId}` to populate Column D's **Contact Data** fields, including expanded details revealed by clicking the **"See all"** toggle.

---

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (or the port specified by Turbopack) in your browser.
