'use client'
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateList'
import Image from 'next/image'
import { Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface PROPS {
  selectedTemplate?: TEMPLATE
  userFormInput: any
  loading: boolean
}

function FormSectionComp({ selectedTemplate, loading, userFormInput }: PROPS) {
  const [formData, setFormData] = useState<any>({})

  const onSubmit = (e: any) => {
    e.preventDefault()
    userFormInput(formData)
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Template header */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white/20 rounded-xl border border-white/30">
            {/* @ts-ignore */}
            <Image src={selectedTemplate?.icon} alt="icon" width={32} height={32} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">{selectedTemplate?.name}</h2>
            <p className="text-violet-200 text-xs mt-0.5 capitalize">{selectedTemplate?.category}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-violet-100 leading-relaxed">{selectedTemplate?.desc}</p>
      </div>

      {/* Form */}
      <form className="p-6 space-y-5" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">
              {item.label}
              {item.required && <span className="text-primary ml-1">*</span>}
            </label>

            {item.field === 'input' ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="rounded-xl border-border bg-muted/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder={`Enter ${item.label.toLowerCase()}...`}
              />
            ) : item.field === 'textarea' ? (
              <div className="relative">
                <Textarea
                  name={item.name}
                  required={item?.required}
                  rows={5}
                  maxLength={2000}
                  onChange={handleInputChange}
                  className="rounded-xl border-border bg-muted/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder={`Enter ${item.label.toLowerCase()}...`}
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">
                  max 2000 chars
                </span>
              </div>
            ) : null}
          </div>
        ))}

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 rounded-xl font-semibold text-base bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-md transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Content
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}

export default FormSectionComp
