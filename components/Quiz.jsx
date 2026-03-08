'use client'

import { useState } from 'react'

export default function Quiz({ questions }) {
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = questions.every((_, i) => selected[i] !== undefined)
  const score = submitted
    ? questions.filter((q, i) => selected[i] === q.correct).length
    : null

  function handleSelect(qIndex, oIndex) {
    if (submitted) return
    setSelected(prev => ({ ...prev, [qIndex]: oIndex }))
  }

  function handleSubmit() {
    if (allAnswered) setSubmitted(true)
  }

  function handleReset() {
    setSelected({})
    setSubmitted(false)
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {submitted && (
        <div style={{
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          borderRadius: '8px',
          background: score === questions.length ? '#f0fdf4' : score >= questions.length * 0.7 ? '#eff6ff' : '#fefce8',
          border: `1px solid ${score === questions.length ? '#86efac' : score >= questions.length * 0.7 ? '#93c5fd' : '#fde047'}`,
          fontSize: '1rem',
          fontWeight: 600,
        }}>
          {score === questions.length
            ? `Perfecto — ${score} de ${questions.length}. Dominas el capítulo.`
            : score >= questions.length * 0.7
            ? `Bien — ${score} de ${questions.length}. Repasa las respuestas marcadas en rojo.`
            : `${score} de ${questions.length}. Vale la pena releer el capítulo antes de continuar.`}
        </div>
      )}

      {questions.map((q, qIndex) => {
        const userAnswer = selected[qIndex]
        const isCorrect = userAnswer === q.correct
        return (
          <div key={qIndex} style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>
              {qIndex + 1}. {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {q.options.map((option, oIndex) => {
                let bg = 'transparent'
                let border = '1px solid #d1d5db'
                let color = 'inherit'

                if (submitted) {
                  if (oIndex === q.correct) {
                    bg = '#f0fdf4'; border = '1px solid #86efac'; color = '#166534'
                  } else if (oIndex === userAnswer && !isCorrect) {
                    bg = '#fef2f2'; border = '1px solid #fca5a5'; color = '#991b1b'
                  }
                } else if (selected[qIndex] === oIndex) {
                  bg = '#eff6ff'; border = '1px solid #93c5fd'
                }

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    style={{
                      textAlign: 'left',
                      padding: '0.6rem 1rem',
                      borderRadius: '6px',
                      background: bg,
                      border,
                      color,
                      cursor: submitted ? 'default' : 'pointer',
                      fontSize: '0.95rem',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {submitted && q.explanation && (
              <p style={{
                marginTop: '0.6rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                paddingLeft: '0.25rem',
              }}>
                {q.explanation}
              </p>
            )}
          </div>
        )
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: '6px',
            background: allAnswered ? '#1d4ed8' : '#e5e7eb',
            color: allAnswered ? '#fff' : '#9ca3af',
            border: 'none',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Ver resultados
        </button>
      ) : (
        <button
          onClick={handleReset}
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: '6px',
            background: 'transparent',
            color: '#1d4ed8',
            border: '1px solid #1d4ed8',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
