'use client'
import React, { useRef, useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateList'
import { Loader2, Sparkles, ImagePlus, X, Info } from 'lucide-react'
import {
  Code2, FileCode, Bug, RefreshCw, Heading1, FileText,
  Lightbulb, TrendingUp, AlignLeft, Tag, Wand2, SmilePlus, Instagram,
  Hash, Camera, BookCheck, Megaphone, ShoppingBag, type LucideIcon,
} from 'lucide-react'

interface PROPS {
  selectedTemplate?: TEMPLATE
  userFormInput: (data: any, imageData?: { base64: string; mimeType: string }) => void
  loading: boolean
}

interface IconConfig { icon: LucideIcon; color: string; bg: string }

const ICON_MAP: Record<string, IconConfig> = {
  'write-code':                   { icon: Code2,        color: '#3b82f6', bg: 'bg-blue-500/15 border-blue-500/25' },
  'explain-code':                  { icon: FileCode,     color: '#6366f1', bg: 'bg-indigo-500/15 border-indigo-500/25' },
  'code-bug-detector':             { icon: Bug,          color: '#ef4444', bg: 'bg-red-500/15 border-red-500/25' },
  'rewrite-article':               { icon: RefreshCw,    color: '#14b8a6', bg: 'bg-teal-500/15 border-teal-500/25' },
  'generate-blog-title':           { icon: Heading1,     color: '#8b5cf6', bg: 'bg-violet-500/15 border-violet-500/25' },
  'blog-content-generation':       { icon: FileText,     color: '#a855f7', bg: 'bg-purple-500/15 border-purple-500/25' },
  'blog-topic-idea':               { icon: Lightbulb,    color: '#f59e0b', bg: 'bg-amber-500/15 border-amber-500/25' },
  'youtube-seo-title':             { icon: TrendingUp,   color: '#ef4444', bg: 'bg-red-500/15 border-red-500/25' },
  'youtube-description':           { icon: AlignLeft,    color: '#dc2626', bg: 'bg-red-600/15 border-red-600/25' },
  'youtube-tag':                   { icon: Tag,          color: '#f97316', bg: 'bg-orange-500/15 border-orange-500/25' },
  'text-improver':                 { icon: Wand2,        color: '#ec4899', bg: 'bg-pink-500/15 border-pink-500/25' },
  'add-emoji-to-text':             { icon: SmilePlus,    color: '#eab308', bg: 'bg-yellow-500/15 border-yellow-500/25' },
  'instagram-post-generator':      { icon: Instagram,    color: '#e1306c', bg: 'bg-pink-500/15 border-pink-500/25' },
  'instagram-hash-tag-generator':  { icon: Hash,         color: '#d946ef', bg: 'bg-fuchsia-500/15 border-fuchsia-500/25' },
  'instagram-post-idea-generator': { icon: Camera,       color: '#8b5cf6', bg: 'bg-purple-500/15 border-purple-500/25' },
  'english-grammer-checker':       { icon: BookCheck,    color: '#22c55e', bg: 'bg-green-500/15 border-green-500/25' },
  'tagline-generator':             { icon: Megaphone,    color: '#f97316', bg: 'bg-orange-500/15 border-orange-500/25' },
  'product-description':           { icon: ShoppingBag,  color: '#2563eb', bg: 'bg-blue-600/15 border-blue-600/25' },
}
const FALLBACK: IconConfig = { icon: Sparkles, color: '#8b5cf6', bg: 'bg-violet-500/15 border-violet-500/25' }

function FormSectionComp({ selectedTemplate, loading, userFormInput }: PROPS) {
  const [formData, setFormData] = useState<any>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageData, setImageData] = useState<{ base64: string; mimeType: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { icon: Icon, color, bg } = ICON_MAP[selectedTemplate?.slug ?? ''] ?? FALLBACK

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    userFormInput(formData, imageData ?? undefined)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      // result = "data:image/jpeg;base64,xxxx"
      const base64 = result.split(',')[1]
      setImageData({ base64, mimeType: file.type })
      setImagePreview(result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageData(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Template identity header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl border ${bg} flex-shrink-0`}>
          <Icon className="w-5 h-5" style={{ color }} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h2 className="font-bold text-sm text-foreground leading-tight truncate">
            {selectedTemplate?.name}
          </h2>
          <p className="text-[11px] text-muted-foreground capitalize mt-0.5">
            {selectedTemplate?.category}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {selectedTemplate?.desc}
        </p>
      </div>

      {/* Form fields */}
      <form onSubmit={onSubmit} className="flex flex-col flex-1 p-5 gap-5">
        {selectedTemplate?.form?.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1">
              {item.label}
              {item.required && <span className="text-primary">*</span>}
            </label>

            {item.field === 'input' ? (
              <input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                placeholder={`Enter ${item.name.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition-all"
              />
            ) : item.field === 'textarea' ? (
              <div className="relative">
                <textarea
                  name={item.name}
                  required={item?.required}
                  rows={6}
                  maxLength={2000}
                  onChange={handleInputChange}
                  placeholder={`Enter ${item.name.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] text-muted-foreground/60 select-none">
                  max 2000
                </span>
              </div>
            ) : null}
          </div>
        ))}

        {/* ── Image upload ── */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <ImagePlus className="w-3.5 h-3.5 text-muted-foreground" />
            Attach Image
            <span className="text-[10px] font-normal text-muted-foreground ml-1">(optional — Gemini will analyse it)</span>
          </label>

          {imagePreview ? (
            /* Preview */
            <div className="relative w-full rounded-xl overflow-hidden border border-border group">
              <img src={imagePreview} alt="preview" className="w-full max-h-48 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur rounded-lg border border-border text-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2">
                <p className="text-white text-xs font-medium">Image attached</p>
              </div>
            </div>
          ) : (
            /* Drop zone */
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl py-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ImagePlus className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold">Click to upload image</p>
                <p className="text-[11px] text-muted-foreground/70 mt-0.5">PNG, JPG, WEBP · max 10 MB</p>
              </div>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Generate button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-auto w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm
                     bg-gradient-to-r from-violet-600 to-indigo-600 text-white
                     hover:from-violet-700 hover:to-indigo-700
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg transition-all duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Content
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default FormSectionComp
