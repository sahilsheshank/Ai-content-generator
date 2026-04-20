'use client'
import { Search, Moon, Sun, Bell } from 'lucide-react'
import React from 'react'
import { useTheme } from 'next-themes'
import { UserButton } from '@clerk/nextjs'

function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border px-6 h-16 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="flex items-center gap-2.5 bg-muted rounded-xl px-3 py-2 border border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search templates..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* User */}
        <div className="md:hidden">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default Header
