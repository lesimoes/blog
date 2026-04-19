'use client'

import { useEffect, useState } from 'react'

const sentences = [
  'TypeScript (We can always use any or unknown)',
  'AWS & Self hosted addiction (things should run outside of my machine)',
  "Docker (I'm lazy enough to settuping VPS)",
  'OpenTelemetry (yes, I like seeing what my code is doing)',
]

export function Sentences() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    setText(sentences[Math.floor(Math.random() * sentences.length)])
  }, [])

  return (
    <p className="min-h-[1.75rem] text-lg leading-7 text-gray-500 dark:text-gray-400">
      {text ?? ''}
    </p>
  )
}
