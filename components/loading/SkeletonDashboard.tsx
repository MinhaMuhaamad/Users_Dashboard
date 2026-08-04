import React from 'react'

export function SkeletonDashboard() {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden animate-pulse">
      
      {/* TopNav Skeleton */}
      <div className="h-14 border-b border-gray-200 bg-white flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="h-5 w-20 bg-gray-200 rounded-md" />
          
          {/* Tabs */}
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-5 w-[1px] bg-gray-200" />
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-1">
              <div className="h-3.5 w-24 bg-gray-200 rounded" />
              <div className="h-2 w-12 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Columns Area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Column A - Inbox navigation (~260px) */}
        <div className="w-[260px] border-r border-gray-200 bg-white p-4 flex flex-col gap-6 shrink-0 h-full">
          <div className="h-6 w-16 bg-gray-200 rounded mb-1" />

          {/* List items */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
                {i > 1 && <div className="h-4 w-6 bg-gray-100 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Teams collapsible */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 w-12 bg-gray-200 rounded" />
              <div className="h-3 w-3 bg-gray-200 rounded" />
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between pl-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full" />
                  <div className="h-3.5 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-6 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>

          {/* Users collapsible */}
          <div className="space-y-2 flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="h-3 w-10 bg-gray-200 rounded" />
              <div className="h-3 w-3 bg-gray-200 rounded" />
            </div>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center justify-between pl-2 py-0.5">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded" />
                  <div className="h-3.5 w-28 bg-gray-200 rounded" />
                </div>
                {i % 2 === 0 && <div className="h-4 w-5 bg-gray-100 rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Column B - Conversation list (~480px) */}
        <div className="w-[480px] border-r border-gray-200 bg-white flex flex-col shrink-0 h-full">
          {/* Header */}
          <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-5 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-8 w-8 bg-gray-100 rounded" />
          </div>

          {/* Search bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="h-9 w-full bg-gray-100 rounded-lg" />
          </div>

          {/* Filters */}
          <div className="px-4 py-2 border-b border-gray-200 flex justify-between">
            <div className="h-4 w-12 bg-gray-100 rounded" />
            <div className="h-4 w-12 bg-gray-100 rounded" />
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                    <div className="h-3 w-10 bg-gray-100 rounded" />
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column C - Active chat thread (flexible) */}
        <div className="flex-1 bg-gray-50 flex flex-col h-full">
          {/* Header */}
          <div className="h-14 px-6 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div className="h-5 w-36 bg-gray-200 rounded" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-100 rounded" />
              <div className="h-8 w-8 bg-gray-100 rounded" />
              <div className="h-8 w-8 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto flex flex-col justify-end">
            <div className="flex justify-center">
              <div className="h-6 w-28 bg-gray-200 rounded-full" />
            </div>

            {/* Message bubbles */}
            <div className="space-y-4">
              {/* Incoming message */}
              <div className="flex flex-col items-start max-w-[70%] gap-1">
                <div className="h-3 w-16 bg-gray-200 rounded ml-1" />
                <div className="bg-white border border-gray-200 rounded-2xl p-4 w-80 space-y-2">
                  <div className="h-3.5 w-full bg-gray-200 rounded" />
                  <div className="h-3.5 w-4/5 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Outgoing message */}
              <div className="flex flex-col items-end max-w-[70%] ml-auto gap-1">
                <div className="h-3 w-16 bg-gray-200 rounded mr-1" />
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 w-72 space-y-2">
                  <div className="h-3.5 w-full bg-blue-200/50 rounded" />
                  <div className="h-3.5 w-2/3 bg-blue-200/50 rounded" />
                </div>
              </div>

              {/* Incoming message */}
              <div className="flex flex-col items-start max-w-[70%] gap-1">
                <div className="h-3 w-16 bg-gray-200 rounded ml-1" />
                <div className="bg-white border border-gray-200 rounded-2xl p-4 w-44 space-y-2">
                  <div className="h-3.5 w-full bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="p-4 bg-white border-t border-gray-200 shrink-0 space-y-3">
            <div className="h-10 w-full bg-gray-100 rounded-full" />
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-gray-200 rounded" />
                <div className="h-5 w-5 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Column D - Contact details (~340px) */}
        <div className="w-[340px] border-l border-gray-200 bg-white flex flex-col shrink-0 h-full">
          {/* Header */}
          <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-100 rounded" />
          </div>

          {/* Detail Panels list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-4 bg-gray-150 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-gray-100 rounded" />
                  <div className="h-3.5 w-5/6 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
export default SkeletonDashboard
