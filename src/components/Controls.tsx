import type { Phase } from '../types'

type Props = {
  phases: Phase[]
  position: number
  playing: boolean
  slow: boolean
  onToggle: () => void
  onStep: (delta: number) => void
  onSeek: (value: number) => void
  onSlow: () => void
}

export function Controls({
  phases,
  position,
  playing,
  slow,
  onToggle,
  onStep,
  onSeek,
  onSlow,
}: Props) {
  const last = phases.length - 1
  const index = Math.round(position)

  return (
    <div className="controls">
      <input
        className="scrub"
        type="range"
        min={0}
        max={last}
        step={0.01}
        value={position}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Avanzamento del movimento"
      />

      <div className="controls-row">
        <button
          type="button"
          className="btn btn-icon"
          onClick={() => onStep(-1)}
          disabled={position <= 0}
          aria-label="Fase precedente"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 5v14L8 12zM6 5h2v14H6z" />
          </svg>
        </button>

        <button type="button" className="btn btn-play" onClick={onToggle}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {playing ? <path d="M7 5h4v14H7zm6 0h4v14h-4z" /> : <path d="M8 5l12 7-12 7z" />}
          </svg>
          <span>{playing ? 'Pausa' : position >= last ? 'Rivedi' : 'Play'}</span>
        </button>

        <button
          type="button"
          className="btn btn-icon"
          onClick={() => onStep(1)}
          disabled={position >= last}
          aria-label="Fase successiva"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 5v14l10-7zM16 5h2v14h-2z" />
          </svg>
        </button>

        <button
          type="button"
          className={`btn btn-speed ${slow ? 'is-on' : ''}`}
          onClick={onSlow}
          aria-pressed={slow}
        >
          {slow ? 'Lento' : 'Normale'}
        </button>
      </div>

      <div className="caption">
        <div className="caption-head">
          <span className="caption-step">
            Fase {index + 1} di {phases.length}
          </span>
          <span className="caption-label">{phases[index].label}</span>
        </div>
        <p>{phases[index].caption}</p>
      </div>
    </div>
  )
}
