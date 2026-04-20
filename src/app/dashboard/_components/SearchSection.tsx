'use client'
import { Search, Sparkles } from 'lucide-react'
import React from 'react'

function SearchSection({ onSearchInput }: any) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-6 py-14 text-white">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          25+ AI Templates
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
          What would you like to create?
        </h1>
        <p className="text-violet-200 text-base mb-8">
          Choose a template below or search for exactly what you need.
        </p>

        {/* Search input */}
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-lg mx-auto border border-white/20">
          <Search className="w-5 h-5 text-violet-500 flex-shrink-0" />
          <input
            onChange={(e) => onSearchInput(e.target.value)}
            type="text"
            placeholder="Search templates — blog, code, email..."
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection
