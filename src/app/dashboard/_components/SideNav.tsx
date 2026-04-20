'use client'
import React from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const menuList = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'History', icon: FileClock, path: '/dashboard/History' },
  { name: 'Settings', icon: Settings, path: '/dashboard/setting' },
]

function SideNav() {
  const path = usePathname()

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <span className="text-lg font-bold gradient-text">Handy AI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-4 mb-3">
          Menu
        </p>
        {menuList.map((menu) => {
          const isActive = path === menu.path
          return (
            <Link href={menu.path} key={menu.name}>
              <div className={`sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}>
                <menu.icon className="h-4 w-4 flex-shrink-0" />
                <span>{menu.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Upgrade banner */}
      <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-semibold">Go Pro</span>
        </div>
        <p className="text-xs text-violet-200 mb-3">Unlock unlimited generations</p>
        <button className="w-full bg-white text-violet-700 text-xs font-bold py-2 rounded-lg hover:bg-violet-50 transition-colors">
          Upgrade — $9.99/mo
        </button>
      </div>

      {/* User */}
      <div className="px-5 py-4 border-t border-border flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">My Account</p>
          <p className="text-[11px] text-muted-foreground">Manage profile</p>
        </div>
      </div>
    </div>
  )
}

export default SideNav
