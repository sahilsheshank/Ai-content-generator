'use client'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, FileText, ClipboardCopy } from 'lucide-react'

interface Props {
  aiOutput: string
  loading?: boolean
}

function OutputSectionComp({ aiOutput, loading }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-semibold text-sm text-foreground">Generated Output</h2>
          {aiOutput && !loading && (
            <span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 font-semibold px-2 py-0.5 rounded-full border border-green-500/20">
              Ready
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          disabled={!aiOutput || loading}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            copied
              ? 'bg-green-500/10 text-green-600 border-green-500/30'
              : aiOutput && !loading
              ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20'
              : 'bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="p-6 space-y-3 flex-1">
          {[0.75, 1, 0.85, 0.6, 1, 0.9, 0.7].map((w, i) => (
            <div key={i} className="h-4 shimmer rounded-lg" style={{ width: `${w * 100}%` }} />
          ))}
          <p className="text-center text-sm text-muted-foreground pt-6 animate-pulse">
            ✨ AI is crafting your content…
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !aiOutput && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="text-5xl mb-4">✍️</div>
          <p className="font-medium text-sm">Your output will appear here</p>
          <p className="text-xs mt-1 text-muted-foreground/70">Fill in the form and hit Generate</p>
        </div>
      )}

      {/* Rendered markdown output */}
      {!loading && aiOutput && (
        <div className="flex-1 overflow-auto p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6
            prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5
            prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4
            prose-p:text-foreground prose-p:leading-7 prose-p:mb-3
            prose-strong:text-foreground prose-strong:font-semibold
            prose-em:text-muted-foreground
            prose-ul:my-3 prose-li:my-1 prose-li:text-foreground
            prose-ol:my-3
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/40 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
            prose-hr:border-border
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown
              components={{
                // Code blocks with syntax highlighting
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  const language = match?.[1] || 'text'
                  const codeString = String(children).replace(/\n$/, '')

                  if (!inline && (match || codeString.includes('\n'))) {
                    return (
                      <div className="relative group my-4 rounded-xl overflow-hidden border border-border">
                        {/* Language label + copy button */}
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-700">
                          <span className="text-xs text-zinc-400 font-mono font-medium uppercase tracking-wide">
                            {language}
                          </span>
                          <CopyCodeButton code={codeString} />
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            padding: '1rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                          }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    )
                  }

                  // Inline code
                  return (
                    <code
                      className="bg-muted text-primary px-1.5 py-0.5 rounded-md text-[0.82em] font-mono border border-border"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },

                // Custom heading styles with anchor-like appearance
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-foreground mt-6 mb-3 pb-2 border-b border-border">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold text-foreground mt-5 mb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-foreground mt-4 mb-1.5">
                    {children}
                  </h3>
                ),

                // Bullet + ordered lists
                ul: ({ children }) => (
                  <ul className="list-disc list-outside pl-5 my-3 space-y-1.5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside pl-5 my-3 space-y-1.5">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-foreground leading-relaxed">{children}</li>
                ),

                // Blockquote
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 py-1 my-3 bg-primary/5 rounded-r-lg text-muted-foreground italic">
                    {children}
                  </blockquote>
                ),

                // Paragraph
                p: ({ children }) => (
                  <p className="text-foreground leading-7 mb-3">{children}</p>
                ),

                // Horizontal rule
                hr: () => <hr className="border-border my-5" />,

                // Table
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4 rounded-xl border border-border">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2.5 text-left font-semibold text-foreground bg-muted border-b border-border text-xs uppercase tracking-wide">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2.5 text-foreground border-b border-border/50">
                    {children}
                  </td>
                ),
              }}
            >
              {aiOutput}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

// Small copy button for individual code blocks
function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${
        copied ? 'text-green-400' : 'text-zinc-400 hover:text-zinc-200'
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default OutputSectionComp
