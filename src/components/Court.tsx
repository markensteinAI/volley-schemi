import { COURT, OPP_ZONE, VIEWBOX, ZONE, distance, easeInOut, lerp, lerpPoint } from '../court'
import { ROLE } from '../data'
import type { Phase, Point, Rotation, SlotId } from '../types'

const SLOTS: SlotId[] = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6']

/** Sotto questa distanza, in metri, consideriamo che il giocatore sia fermo. */
const STILL = 0.35

type Props = {
  phases: Phase[]
  position: number
  rotation: Rotation
}

export function Court({ phases, position, rotation }: Props) {
  const last = phases.length - 1
  const from = Math.min(Math.floor(position), last)
  const to = Math.min(from + 1, last)
  const raw = position - from
  const t = easeInOut(Math.min(Math.max(raw, 0), 1))

  const current = phases[from]
  const next = phases[to]
  const shown = phases[Math.round(position)] ?? current
  const zone = shown.oppZone ? OPP_ZONE[shown.oppZone] : null

  const ball = ballAt(current.ball, next.ball, t)

  return (
    <svg
      className="court"
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      role="img"
      aria-label="Campo da pallavolo con la disposizione della squadra"
    >
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4068" />
          <stop offset="100%" stopColor="#15304e" />
        </linearGradient>
      </defs>

      {/* campo avversario, ridotto a una striscia: conta da dove arriva la palla */}
      <rect
        x={0}
        y={-COURT.oppDepth}
        width={COURT.width}
        height={COURT.oppDepth}
        className="court-opponent"
      />
      <text x={0} y={-COURT.oppDepth - 0.42} className="court-side-label">
        CAMPO AVVERSARIO
      </text>

      {zone && (
        <g className="opp-zone">
          <circle cx={zone.at.x} cy={zone.at.y} r={1.05} />
          <circle cx={zone.at.x} cy={zone.at.y} r={0.58} className="opp-zone-core" />
        </g>
      )}

      {/* nostro campo */}
      <rect x={0} y={0} width={COURT.width} height={COURT.depth} fill="url(#floor)" />
      <rect
        x={0}
        y={0}
        width={COURT.width}
        height={COURT.attackLine}
        className="court-attack-area"
      />
      <rect x={0} y={0} width={COURT.width} height={COURT.depth} className="court-outline" />
      <line x1={0} y1={COURT.attackLine} x2={COURT.width} y2={COURT.attackLine} className="court-line" />

      {/* zona di servizio, dietro la linea di fondo */}
      <rect
        x={0}
        y={COURT.depth}
        width={COURT.width}
        height={COURT.serviceDepth}
        className="court-service"
      />
      <text x={COURT.width / 2} y={COURT.depth + COURT.serviceDepth - 0.45} className="court-side-label court-side-label-center">
        ZONA DI SERVIZIO
      </text>

      {/* rete */}
      <line x1={-0.6} y1={0} x2={COURT.width + 0.6} y2={0} className="court-net" />

      {/* numeri delle zone, come riferimento di lettura */}
      {([1, 2, 3, 4, 5, 6] as const).map((n) => (
        <text key={n} x={ZONE[n].x} y={ZONE[n].y + 2.0} className="zone-number">
          {n}
        </text>
      ))}

      {/* percorsi: dove sta andando chi si muove */}
      {SLOTS.map((slot) => {
        const a = current.spots[slot]
        const b = next.spots[slot]
        if (distance(a, b) < STILL) return null
        return <Trail key={`trail-${slot}`} from={a} to={b} fade={1 - t * 0.75} />
      })}

      {ball && (
        <g className="ball" opacity={ball.opacity}>
          <circle cx={ball.at.x} cy={ball.at.y} r={0.34} />
        </g>
      )}

      {SLOTS.map((slot) => {
        const a = current.spots[slot]
        const b = next.spots[slot]
        const at = lerpPoint(a, b, t)
        const moving = distance(a, b) >= STILL
        const role = current.roles?.[slot] ?? rotation.roleBySlot[slot]
        return (
          <Dot key={slot} at={at} label={role} family={ROLE[role].family} active={moving} />
        )
      })}
    </svg>
  )
}

function Trail({ from, to, fade }: { from: Point; to: Point; fade: number }) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x)
  const tip = {
    x: to.x - Math.cos(angle) * 0.72,
    y: to.y - Math.sin(angle) * 0.72,
  }
  const wing = 0.34
  const head = [
    `${tip.x + Math.cos(angle) * 0.5},${tip.y + Math.sin(angle) * 0.5}`,
    `${tip.x + Math.cos(angle + 2.4) * wing},${tip.y + Math.sin(angle + 2.4) * wing}`,
    `${tip.x + Math.cos(angle - 2.4) * wing},${tip.y + Math.sin(angle - 2.4) * wing}`,
  ].join(' ')
  return (
    <g className="trail" opacity={fade}>
      <line x1={from.x} y1={from.y} x2={tip.x} y2={tip.y} />
      <polygon points={head} />
    </g>
  )
}

function Dot({
  at,
  label,
  family,
  active,
}: {
  at: Point
  label: string
  family: string
  active: boolean
}) {
  return (
    <g
      className={`dot dot-${family} ${active ? 'dot-active' : ''}`}
      transform={`translate(${at.x} ${at.y})`}
    >
      <circle r={0.66} />
      <text y={0.23}>{label}</text>
    </g>
  )
}

function ballAt(from: Point | undefined, to: Point | undefined, t: number) {
  if (from && to) return { at: lerpPoint(from, to, t), opacity: 1 }
  if (from) return { at: from, opacity: lerp(1, 0, t) }
  if (to) return { at: to, opacity: lerp(0, 1, t) }
  return null
}
