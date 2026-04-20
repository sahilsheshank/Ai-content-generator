import React from 'react'
import { TEMPLATE } from './TemplateList'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categoryColors: Record<string, string> = {
  'Coding':       'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'blog':         'bg-green-500/10 text-green-600 dark:text-green-400',
  'youtube':      'bg-red-500/10 text-red-600 dark:text-red-400',
  'marketing':    'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'email':        'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  'social-media': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'writing':      'bg-teal-500/10 text-teal-600 dark:text-teal-400',
}

function getCategoryColor(category: string) {
  const lower = category?.toLowerCase()
  for (const key of Object.keys(categoryColors)) {
    if (lower?.includes(key.toLowerCase())) return categoryColors[key]
  }
  return 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
}

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={'/dashboard/content/' + item?.slug}>
      <div className="group relative bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 cursor-pointer h-full hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

        <div className="relative">
          {/* Icon + category */}
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-muted border border-border">
              <Image src={item.icon} alt="icon" width={28} height={28} />
            </div>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
          </div>

          <h2 className="font-semibold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">
            {item.name}
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.desc}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-border flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Use template <ArrowRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </Link>
  )
}

export default TemplateCard
