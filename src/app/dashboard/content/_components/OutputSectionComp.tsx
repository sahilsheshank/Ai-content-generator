'use client'
import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { Copy, Check, FileText } from 'lucide-react'

interface Props {
  aiOutput: string
  loading?: boolean
}

function OutputSectionComp({ aiOutput, loading }: Props) {
  const editorRef = useRef<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance()
      instance.setMarkdown(aiOutput || '')
    }
  }, [aiOutput])

  const handleCopy = () => {
    const text = editorRef.current?.getInstance()?.getMarkdown() || ''
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-semibold text-sm text-foreground">Generated Output</h2>
          {aiOutput && (
            <span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 font-semibold px-2 py-0.5 rounded-full border border-green-500/20">
              Ready
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          disabled={!aiOutput}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            copied
              ? 'bg-green-500/10 text-green-600 border-green-500/30'
              : aiOutput
              ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20'
              : 'bg-muted text-muted-foreground border-border cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Loading skeleton overlay */}
      {loading && (
        <div className="px-6 py-6 space-y-3">
          <div className="h-4 shimmer rounded-lg w-3/4" />
          <div className="h-4 shimmer rounded-lg w-full" />
          <div className="h-4 shimmer rounded-lg w-5/6" />
          <div className="h-4 shimmer rounded-lg w-2/3" />
          <div className="h-4 shimmer rounded-lg w-full" />
          <div className="h-4 shimmer rounded-lg w-4/5" />
          <div className="h-4 shimmer rounded-lg w-3/4" />
          <div className="h-4 shimmer rounded-lg w-full" />
          <p className="text-center text-sm text-muted-foreground pt-4 animate-pulse">
            ✨ AI is crafting your content...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !aiOutput && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="text-5xl mb-4">✍️</div>
          <p className="font-medium text-sm">Your output will appear here</p>
          <p className="text-xs mt-1">Fill in the form and hit Generate</p>
        </div>
      )}

      {/* Editor (always mounted, hidden during loading/empty) */}
      <div className={loading || !aiOutput ? 'hidden' : 'flex-1'}>
        <Editor
          ref={editorRef}
          initialValue="Your result will appear here"
          initialEditType="wysiwyg"
          height="600px"
          useCommandShortcut={true}
          onChange={() => {}}
        />
      </div>
    </div>
  )
}

export default OutputSectionComp
