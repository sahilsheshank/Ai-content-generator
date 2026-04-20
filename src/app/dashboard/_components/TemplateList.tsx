'use client'
import React, { useEffect, useState } from 'react'
import templates from '@/app/(data)/templates'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
  name: string,
  desc: string,
  icon: string,
  category: string,
  slug: string,
  aiPrompt: string,
  form?: FORM[]
}

export interface FORM {
  label: string,
  field: string,
  name: string,
  required?: boolean
}

// Derive unique categories
const allCategories = ['All', ...Array.from(new Set(templates.map(t => t.category)))]

function TemplateList({ UserSearchInput }: any) {
  const [templateList, setTemplateList] = useState(templates)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    let filtered = templates
    if (activeCategory !== 'All') {
      filtered = filtered.filter(t => t.category === activeCategory)
    }
    if (UserSearchInput) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(UserSearchInput.toLowerCase()) ||
        item.desc.toLowerCase().includes(UserSearchInput.toLowerCase())
      )
    }
    setTemplateList(filtered)
  }, [UserSearchInput, activeCategory])

  return (
    <div className="px-6 py-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 capitalize ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground mb-4">
        {templateList.length} template{templateList.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {templateList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templateList.map((item: TEMPLATE) => (
            <TemplateCard key={item.slug} {...item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No templates found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      )}
    </div>
  )
}

export default TemplateList
