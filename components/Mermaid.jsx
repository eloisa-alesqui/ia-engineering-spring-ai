'use client'

import { useEffect, useRef } from 'react'

export default function Mermaid({ chart }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    import('mermaid').then((m) => {
      const mermaid = m.default
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        fontFamily: 'inherit',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: false,
          curve: 'basis',
        },
        themeVariables: {
          fontSize: '13px',
        },
      })
      ref.current.removeAttribute('data-processed')
      ref.current.innerHTML = chart
      mermaid.run({ nodes: [ref.current] })
    })
  }, [chart])

  return (
    <div style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
      <div className="mermaid" ref={ref} />
    </div>
  )
}
