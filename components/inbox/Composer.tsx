import React, { useState } from 'react'
import { Image, Play, ClipboardList, Smile, CornerUpLeft, Zap, Mic, Send } from 'lucide-react'

interface ComposerProps {
  onSendMessage: (text: string) => void
}

export function Composer({ onSendMessage }: ComposerProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSendMessage(text)
    setText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!text.trim()) return
      onSendMessage(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-150 bg-white shrink-0">
      <div className="relative flex items-center mb-3">
        <input
          type="text"
          placeholder="Type something…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 rounded-2xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:bg-white transition-all font-semibold text-slate-900 placeholder-gray-400"
        />
        {text.trim() && (
          <button
            type="submit"
            className="absolute right-3 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all active:scale-95 shadow-sm"
          >
            <Send size={12} />
          </button>
        )}
      </div>

      {/* Icon Row */}
      <div className="flex items-center justify-between px-1">
        {/* Left Side Actions */}
        <div className="flex items-center gap-3 text-gray-400">
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <Image size={15} />
          </button>
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <Play size={15} />
          </button>
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <ClipboardList size={15} />
          </button>
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <Smile size={15} />
          </button>
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <CornerUpLeft size={15} />
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 text-gray-400">
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <Zap size={15} />
          </button>
          <button type="button" className="p-1 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            <Mic size={15} />
          </button>
        </div>
      </div>
    </form>
  )
}
export default Composer
