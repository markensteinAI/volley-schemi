import { useMemo, useState } from 'react'
import { Controls } from './components/Controls'
import { Court } from './components/Court'
import { SidePanel } from './components/SidePanel'
import { ROTATIONS, SITUATIONS, phasesFor, rotationById, schemesFor } from './data'
import { usePlayback } from './usePlayback'
import type { RotationId, SituationId } from './types'

export default function App() {
  const [situationId, setSituationId] = useState<SituationId>('ricezione')
  const [rotationId, setRotationId] = useState<RotationId>('P1')
  const [schemeIndex, setSchemeIndex] = useState(0)

  const situation = SITUATIONS.find((s) => s.id === situationId)!
  const schemes = useMemo(() => schemesFor(situationId), [situationId])
  const scheme = schemes[Math.min(schemeIndex, schemes.length - 1)]
  const rotation = rotationById(rotationId)
  const phases = useMemo(() => phasesFor(scheme, rotationId), [scheme, rotationId])

  const [slow, setSlow] = useState(false)
  const { position, playing, toggle, goTo, stepBy } = usePlayback(
    phases.length,
    slow ? 0.5 : 1,
    `${scheme.id}-${rotationId}`,
  )

  const chooseSituation = (id: SituationId) => {
    setSituationId(id)
    setSchemeIndex(0)
  }

  return (
    <div className="app">
      <header className="masthead">
        <h1>Volley Schemi</h1>
        <p>Dove andare in campo, situazione per situazione. Sistema 5-1.</p>
      </header>

      <nav className="tabs" aria-label="Situazione di gioco">
        {SITUATIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`tab ${s.id === situationId ? 'is-on' : ''}`}
            onClick={() => chooseSituation(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <p className="hint">{situation.hint}</p>

      <div className="pickers">
        <div className="picker">
          <span className="picker-label">Rotazione</span>
          <div className="chips">
            {ROTATIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`chip ${r.id === rotationId ? 'is-on' : ''}`}
                onClick={() => setRotationId(r.id)}
                title={r.label}
              >
                {r.short}
              </button>
            ))}
          </div>
        </div>

        {schemes.length > 1 && (
          <div className="picker">
            <span className="picker-label">Variante</span>
            <div className="chips">
              {schemes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`chip ${s.id === scheme.id ? 'is-on' : ''}`}
                  onClick={() => setSchemeIndex(i)}
                >
                  {s.variant}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <main className="stage">
        <div className="stage-court">
          <Court phases={phases} position={position} rotation={rotation} />
          <Controls
            phases={phases}
            position={position}
            playing={playing}
            slow={slow}
            onToggle={toggle}
            onStep={stepBy}
            onSeek={goTo}
            onSlow={() => setSlow((v) => !v)}
          />
        </div>

        <SidePanel
          scheme={scheme}
          phases={phases}
          rotation={rotation}
          position={position}
          onSeek={goTo}
        />
      </main>

      <footer className="foot">
        <span>{rotation.label}</span>
      </footer>
    </div>
  )
}
