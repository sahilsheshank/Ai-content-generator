import React from 'react'
import { TEMPLATE } from './TemplateList'
import Link from 'next/link'
import {
  ArrowRight, Code2, FileCode, Bug, RefreshCw, Heading1, FileText,
  Lightbulb, TrendingUp, AlignLeft, Tag, Wand2, SmilePlus, Instagram,
  Hash, Camera, BookCheck, Megaphone, ShoppingBag, Sparkles,
  type LucideIcon,
} from 'lucide-react'

interface IconConfig {
  icon: LucideIcon
  color: string
  bg: string
}

const ICON_MAP: Record<string, IconConfig> = {
  'write-code':                   { icon: Code2,        color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/20' },
  'explain-code':                  { icon: FileCode,     color: '#6366f1', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  'code-bug-detector':             { icon: Bug,          color: '#ef4444', bg: 'bg-red-500/10 border-red-500/20' },
  'rewrite-article':               { icon: RefreshCw,    color: '#14b8a6', bg: 'bg-teal-500/10 border-teal-500/20' },
  'generate-blog-title':           { icon: Heading1,     color: '#8b5cf6', bg: 'bg-violet-500/10 border-violet-500/20' },
  'blog-content-generation':       { icon: FileText,     color: '#a855f7', bg: 'bg-purple-500/10 border-purple-500/20' },
  'blog-topic-idea':               { icon: Lightbulb,    color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/20' },
  'youtube-seo-title':             { icon: TrendingUp,   color: '#ef4444', bg: 'bg-red-500/10 border-red-500/20' },
  'youtube-description':           { icon: AlignLeft,    color: '#dc2626', bg: 'bg-red-600/10 border-red-600/20' },
  'youtube-tag':                   { icon: Tag,          color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20' },
  'text-improver':                 { icon: Wand2,        color: '#ec4899', bg: 'bg-pink-500/10 border-pink-500/20' },
  'add-emoji-to-text':             { icon: SmilePlus,    color: '#eab308', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  'instagram-post-generator':      { icon: Instagram,    color: '#e1306c', bg: 'bg-pink-500/10 border-pink-500/20' },
  'instagram-hash-tag-generator':  { icon: Hash,         color: '#d946ef', bg: 'bg-fuchsia-500/10 border-fuchsia-500/20' },
  'instagram-post-idea-generator': { icon: Camera,       color: '#8b5cf6', bg: 'bg-purple-500/10 border-purple-500/20' },
  'english-grammer-checker':       { icon: BookCheck,    color: '#22c55e', bg: 'bg-green-500/10 border-green-500/20' },
  'tagline-generator':             { icon: Megaphone,    color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/20' },
  'product-description':           { icon: ShoppingBag,  color: '#2563eb', bg: 'bg-blue-600/10 border-blue-600/20' },
}

const FALLBACK: IconConfig = { icon: Sparkles, color: '#8b5cf6', bg: 'bg-violet-500/10 border-violet-500/20' }

function TemplateCard(item: TEMPLATE) {
  const { icon: Icon, color, bg } = ICON_MAP[item.slug] ?? FALLBACK

  return (
    <Link href={'/dashboard/content/' + item?.slug}>
      <div className="group relative bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 cursor-pointer h-full
                      hover:border-primary/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

        {/* Icon */}
        <div className={`relative w-12 h-12 flex items-center justify-center rounded-2xl border ${bg}`}>
          <Icon className="w-6 h-6" style={{ color }} strokeWidth={2} />
        </div>

        {/* Category badge */}
        <span className="inline-block w-fit text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border capitalize">
          {item.category}
        </span>

        {/* Name + desc */}
        <div className="flex-1">
          <h2 className="font-semibold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
            {item.name}
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-medium">AI powered</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Use <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default TemplateCard
