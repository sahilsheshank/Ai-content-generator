'use client'
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyButton({ aiResponse }: { aiResponse: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
        copied
          ? 'bg-green-500/10 text-green-600 border-green-500/30'
          : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default CopyButton
