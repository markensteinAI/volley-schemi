import { ROLE } from '../data'
import type { Phase, Rotation, Scheme, SlotId } from '../types'

const POSTO_LABEL: Record<SlotId, string> = {
  p4: 'Posto 4 — avanti sinistra',
  p3: 'Posto 3 — centro rete',
  p2: 'Posto 2 — avanti destra',
  p5: 'Posto 5 — dietro sinistra',
  p6: 'Posto 6 — dietro centro',
  p1: 'Posto 1 — dietro destra',
}

const ORDER: SlotId[] = ['p4', 'p3', 'p2', 'p5', 'p6', 'p1']

type Props = {
  scheme: Scheme
  phases: Phase[]
  rotation: Rotation
  position: number
  onSeek: (value: number) => void
}

export function SidePanel({ scheme, phases, rotation, position, onSeek }: Props) {
  const index = Math.round(position)

  return (
    <aside className="panel">
      <section className="panel-block">
        <h2>{scheme.variant}</h2>
        <p className="panel-lead">{scheme.description}</p>
      </section>

      <section className="panel-block only-wide">
        <h3>Fasi</h3>
        <ol className="phase-list">
          {phases.map((phase, i) => (
            <li key={phase.label}>
              <button
                type="button"
                className={`phase-item ${i === index ? 'is-current' : ''}`}
                onClick={() => onSeek(i)}
              >
                <span className="phase-item-index">{i + 1}</span>
                <span>
                  <strong>{phase.label}</strong>
                  <em>{phase.caption}</em>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {scheme.notes && scheme.notes.length > 0 && (
        <section className="panel-block only-wide">
          <h3>Da ricordare</h3>
          <ul className="notes">
            {scheme.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel-block">
        <h3>Chi è in campo</h3>
        <ul className="legend">
          {ORDER.map((slot) => {
            const role = phases[index].roles?.[slot] ?? rotation.roleBySlot[slot]
            return (
              <li key={slot}>
                <span className={`legend-dot dot-${ROLE[role].family}`}>{role}</span>
                <span className="legend-text">
                  <strong>{ROLE[role].name}</strong>
                  <em>{POSTO_LABEL[slot]}</em>
                </span>
              </li>
            )
          })}
        </ul>
        <p className="panel-foot">
          In campo ci sono sempre sei giocatori: il libero sostituisce il centrale che si
          trova in seconda linea.
        </p>
      </section>
    </aside>
  )
}
