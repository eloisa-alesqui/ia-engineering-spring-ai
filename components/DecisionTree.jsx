'use client'

const steps = [
  {
    question: '¿Los datos pueden salir de tu infraestructura?',
    exitOn: 'No',
    exitTo: 'Self-hosted',
    exitColor: '#d97706',
    continueOn: 'Sí',
  },
  {
    question: '¿La política corporativa prohíbe proveedores cloud externos?',
    exitOn: 'Sí',
    exitTo: 'Self-hosted',
    exitColor: '#d97706',
    continueOn: 'No',
  },
  {
    question: '¿Tienes contrato enterprise con Azure, AWS o GCP?',
    exitOn: 'Sí',
    exitTo: 'Modelo gestionado en tu nube',
    exitColor: '#059669',
    exitBadge: 'más habitual',
    continueOn: 'No',
  },
  {
    question: '¿El coste por token es inasumible a tu volumen?',
    exitOn: 'No',
    exitTo: 'API pública directa',
    exitColor: '#2563eb',
    continueOn: 'Sí',
  },
  {
    question: '¿Tienes equipo para operar y mantener el modelo?',
    exitOn: 'No',
    exitTo: 'Modelo gestionado en tu nube',
    exitColor: '#059669',
    exitNote: '⚠ negocia pricing — el volumen sigue siendo un trade-off a resolver',
    continueOn: 'Sí',
    finalResult: 'Self-hosted',
    finalColor: '#d97706',
  },
]

const ResultPill = ({ label, color }) => (
  <span style={{
    padding: '4px 14px',
    background: color + '18',
    border: `1.5px solid ${color}`,
    borderRadius: '20px',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: color,
    whiteSpace: 'nowrap',
  }}>
    {label}
  </span>
)

const HorizontalArrow = ({ label, color, result, badge, note }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* left line */}
      <div style={{ width: '24px', height: '1.5px', background: '#9ca3af' }} />
      {/* label */}
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', padding: '0 5px' }}>
        {label}
      </span>
      {/* right line */}
      <div style={{ width: '24px', height: '1.5px', background: '#9ca3af' }} />
      {/* arrowhead */}
      <div style={{
        width: 0,
        height: 0,
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '7px solid #9ca3af',
      }} />
      {/* pill */}
      <div style={{ marginLeft: '6px' }}>
        <ResultPill label={result} color={color} />
      </div>
    </div>
    {badge && (
      <span style={{
        fontSize: '0.68rem',
        color: color,
        paddingLeft: '108px',
        fontStyle: 'italic',
        marginTop: '2px',
      }}>
        ★ {badge}
      </span>
    )}
    {note && (
      <span style={{
        fontSize: '0.68rem',
        color: '#6b7280',
        paddingLeft: '108px',
        fontStyle: 'italic',
        marginTop: '2px',
      }}>
        {note}
      </span>
    )}
  </div>
)

const VerticalArrow = ({ label }) => (
  <div style={{ display: 'flex', paddingLeft: '28px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '1.5px', height: '16px', background: '#9ca3af' }} />
      <span style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 700, lineHeight: 1.4 }}>
        {label}
      </span>
      <div style={{ width: '1.5px', height: '16px', background: '#9ca3af' }} />
      <span style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1 }}>▼</span>
    </div>
  </div>
)

export default function DecisionTree() {
  return (
    <div style={{ fontFamily: 'inherit', margin: '1.5rem 0', maxWidth: '600px' }}>
      {steps.map((step, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Question box */}
            <div style={{
              flex: 1,
              padding: '10px 14px',
              background: '#f9fafb',
              border: '1.5px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#111827',
            }}>
              {step.question}
            </div>

            {/* Horizontal arrow + result */}
            <HorizontalArrow
              label={step.exitOn}
              color={step.exitColor}
              result={step.exitTo}
              badge={step.exitBadge}
              note={step.exitNote}
            />
          </div>

          {/* Vertical connector */}
          {(i < steps.length - 1 || step.finalResult) && (
            <VerticalArrow label={step.continueOn} />
          )}

          {/* Final result */}
          {step.finalResult && (
            <ResultPill label={step.finalResult} color={step.finalColor} />
          )}
        </div>
      ))}
    </div>
  )
}
