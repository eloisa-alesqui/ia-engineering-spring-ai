'use client'

import { useState } from 'react'

const COLORS = ['#378ADD', '#1D9E75', '#D85A30', '#D4537E', '#639922', '#BA7517', '#534AB7', '#888780']

const CONTEXTS = [
  {
    name: 'Clasificación de tickets',
    temp: 0.1, topp: 0.9,
    hint: 'Temp 0.1 · top-p 0.9 — máxima consistencia, la respuesta correcta es única',
    tokens: [
      { label: 'facturación', logit: 3.8 },
      { label: 'técnica',     logit: 3.1 },
      { label: 'baja',        logit: 1.4 },
      { label: 'comercial',   logit: 0.9 },
      { label: 'envío',       logit: 0.3 },
      { label: 'otro',        logit: -0.5 },
      { label: 'garantía',    logit: -1.2 },
      { label: 'devolución',  logit: -1.8 },
    ],
  },
  {
    name: 'Generación de código',
    temp: 0.2, topp: 0.95,
    hint: 'Temp 0.2 · top-p 0.95 — el código tiene que funcionar, no ser original',
    tokens: [
      { label: 'return', logit: 4.5 },
      { label: 'if',     logit: 2.0 },
      { label: 'const',  logit: 1.6 },
      { label: 'throw',  logit: 0.8 },
      { label: 'for',    logit: 0.2 },
      { label: 'while',  logit: -0.5 },
      { label: 'switch', logit: -1.3 },
      { label: 'try',    logit: -2.0 },
    ],
  },
  {
    name: 'Resumen de textos',
    temp: 0.4, topp: 0.95,
    hint: 'Temp 0.4 · top-p 0.95 — algo de flexibilidad, sin salirse del contenido',
    tokens: [
      { label: 'El',   logit: 3.2 },
      { label: 'Este', logit: 2.7 },
      { label: 'La',   logit: 2.3 },
      { label: 'Se',   logit: 1.5 },
      { label: 'Un',   logit: 1.0 },
      { label: 'En',   logit: 0.4 },
      { label: 'Los',  logit: -0.1 },
      { label: 'Como', logit: -0.8 },
    ],
  },
  {
    name: 'Asunto de email',
    temp: 0.6, topp: 1.0,
    hint: 'Temp 0.6 · top-p 1.0 — variedad útil sin perder coherencia',
    tokens: [
      { label: 'Descubre',   logit: 2.6 },
      { label: 'Oferta',     logit: 2.4 },
      { label: 'Nueva',      logit: 2.1 },
      { label: 'Exclusivo',  logit: 1.5 },
      { label: 'Ahorra',     logit: 1.2 },
      { label: 'Última',     logit: 0.6 },
      { label: 'Aprovecha',  logit: 0.1 },
      { label: 'Increíble',  logit: -0.7 },
    ],
  },
  {
    name: 'Brainstorming',
    temp: 0.9, topp: 1.0,
    hint: 'Temp 0.9 · top-p 1.0 — buscamos diversidad, toleramos impredecibilidad',
    tokens: [
      { label: 'app',     logit: 1.8 },
      { label: 'robot',   logit: 1.6 },
      { label: 'juego',   logit: 1.5 },
      { label: 'red',     logit: 1.3 },
      { label: 'sensor',  logit: 1.1 },
      { label: 'dron',    logit: 0.9 },
      { label: 'podcast', logit: 0.7 },
      { label: 'jardín',  logit: 0.4 },
    ],
  },
]

function softmax(logits, temperature) {
  const t = Math.max(temperature, 0.01)
  const scaled = logits.map(l => l / t)
  const maxL = Math.max(...scaled)
  const exps = scaled.map(s => Math.exp(s - maxL))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map(e => e / sum)
}

function applyTopP(probs, topP) {
  const indexed = probs.map((p, i) => ({ p, i })).sort((a, b) => b.p - a.p)
  let cumul = 0
  const active = new Set()
  for (const item of indexed) {
    if (cumul < topP) {
      active.add(item.i)
      cumul += item.p
    }
  }
  return active
}

function renormalize(probs, activeSet) {
  const sum = probs.reduce((s, p, i) => activeSet.has(i) ? s + p : s, 0)
  return probs.map((p, i) => activeSet.has(i) ? p / sum : 0)
}

function drawSample(renorm) {
  const r = Math.random()
  let cum = 0
  for (let i = 0; i < renorm.length; i++) {
    cum += renorm[i]
    if (r <= cum) return i
  }
  return renorm.length - 1
}

function computeSamples(tokens, temp, topP) {
  const logits = tokens.map(t => t.logit)
  const probs = softmax(logits, temp)
  const active = applyTopP(probs, topP)
  const renorm = renormalize(probs, active)
  return Array.from({ length: 10 }, () => drawSample(renorm))
}

export default function TemperaturaViz() {
  const [ctxIdx, setCtxIdx] = useState(0)
  const [temp, setTemp] = useState(CONTEXTS[0].temp)
  const [topP, setTopP] = useState(CONTEXTS[0].topp)
  const [samples, setSamples] = useState(() => computeSamples(CONTEXTS[0].tokens, CONTEXTS[0].temp, CONTEXTS[0].topp))

  const ctx = CONTEXTS[ctxIdx]
  const logits = ctx.tokens.map(t => t.logit)
  const probs = softmax(logits, temp)
  const active = applyTopP(probs, topP)
  const maxProb = Math.max(...probs)

  function loadScenario(index) {
    const c = CONTEXTS[index]
    setCtxIdx(index)
    setTemp(c.temp)
    setTopP(c.topp)
    setSamples(computeSamples(c.tokens, c.temp, c.topp))
  }

  function handleTemp(e) {
    const val = parseFloat(e.target.value)
    setTemp(val)
    setSamples(computeSamples(ctx.tokens, val, topP))
  }

  function handleTopP(e) {
    const val = parseFloat(e.target.value)
    setTopP(val)
    setSamples(computeSamples(ctx.tokens, temp, val))
  }

  function resample() {
    setSamples(computeSamples(ctx.tokens, temp, topP))
  }

  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>

      {/* Escenarios */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {CONTEXTS.map((c, i) => (
          <button
            key={i}
            onClick={() => loadScenario(i)}
            style={{
              fontSize: '12px',
              cursor: 'pointer',
              padding: '5px 14px',
              borderRadius: '6px',
              border: i === ctxIdx ? '1px solid #85B7EB' : '1px solid #d1d5db',
              background: i === ctxIdx ? '#E6F1FB' : 'transparent',
              color: i === ctxIdx ? '#0C447C' : '#6b7280',
              transition: 'all 0.15s',
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Hint */}
      <p style={{ fontSize: '12px', color: '#9ca3af', fontStyle: 'italic', marginBottom: '1.25rem', minHeight: '18px' }}>
        {ctx.hint}
      </p>

      {/* Sliders */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '13px', color: '#6b7280', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Temperatura</span>
            <span style={{ fontWeight: 600, color: '#374151' }}>{temp.toFixed(1)}</span>
          </label>
          <input type="range" min="0" max="1" step="0.1" value={temp} onChange={handleTemp} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '13px', color: '#6b7280', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Top-p</span>
            <span style={{ fontWeight: 600, color: '#374151' }}>{topP.toFixed(2)}</span>
          </label>
          <input type="range" min="0.1" max="1" step="0.05" value={topP} onChange={handleTopP} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Barras */}
      <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>Distribución de probabilidad</p>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px', lineHeight: '1.4' }}>
        Logits originales → softmax con temperatura → filtro top-p
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
        {ctx.tokens.map((tok, i) => {
          const isActive = active.has(i)
          const width = (probs[i] / maxProb) * 100
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '26px' }}>
              <span style={{
                fontSize: '12px',
                fontFamily: 'monospace',
                width: '90px',
                textAlign: 'right',
                color: isActive ? '#374151' : '#d1d5db',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: isActive ? 'none' : 'line-through',
                transition: 'color 0.3s',
              }}>
                {tok.label}
              </span>
              <div style={{ flex: 1, height: '18px', borderRadius: '3px', background: '#f3f4f6', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${width.toFixed(1)}%`,
                  borderRadius: '3px',
                  background: COLORS[i % COLORS.length],
                  opacity: isActive ? 1 : 0.15,
                  transition: 'width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease',
                }} />
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', minWidth: '42px', color: isActive ? '#6b7280' : '#d1d5db', transition: 'color 0.3s' }}>
                {(probs[i] * 100).toFixed(1)}%
              </span>
            </div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#378ADD' }} />
          Candidato activo
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#378ADD', opacity: 0.2 }} />
          Eliminado por top-p
        </div>
      </div>

      {/* Muestreo */}
      <div style={{
        padding: '1rem 1.25rem',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Muestreo simulado (10 ejecuciones)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '28px' }}>
          {samples.map((idx, s) => (
            <span key={s} style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              padding: '3px 10px',
              borderRadius: '5px',
              border: `1px solid ${COLORS[idx % COLORS.length]}`,
              color: COLORS[idx % COLORS.length],
              background: 'white',
            }}>
              {ctx.tokens[idx].label}
            </span>
          ))}
        </div>
        <button
          onClick={resample}
          style={{
            marginTop: '0.75rem',
            fontSize: '13px',
            cursor: 'pointer',
            padding: '5px 14px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            background: 'transparent',
            color: '#374151',
          }}
        >
          Volver a muestrear
        </button>
      </div>

    </div>
  )
}
