'use client'
import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function SkillsDiagram() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default', // puedes cambiar a 'dark', 'forest', 'neutral', etc.
    })
    mermaid.contentLoaded()
  }, [])

  const diagram = `
    graph TD
      A[Aqui contenido sobre] --> B[Data Science & AI]
      A --> C[Full Stack]
  `

  return (
    <div className="p-4">
      {/* Mermaid interpreta el texto dentro del div */}
      <div className="mermaid text-sm">{diagram}</div>
    </div>
  )
}
