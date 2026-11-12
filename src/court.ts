import type { OppZoneId, Point } from './types'

/** Misure reali del campo, in metri. Il nostro campo occupa y da 0 (rete)
 *  a 9 (linea di fondo); il campo avversario e' rappresentato come una
 *  striscia sopra la rete. */
export const COURT = {
  width: 9,
  depth: 9,
  attackLine: 3,
  serviceDepth: 2.2,
  oppDepth: 3.4,
} as const

/** Area visibile del disegno: campo + zona di servizio + striscia avversaria. */
export const VIEWBOX = {
  x: -0.9,
  y: -COURT.oppDepth - 1.2,
  w: COURT.width + 1.8,
  h: COURT.depth + COURT.serviceDepth + COURT.oppDepth + 1.9,
} as const

/** Centro nominale delle sei zone del nostro campo. */
export const ZONE: Record<1 | 2 | 3 | 4 | 5 | 6, Point> = {
  4: { x: 1.5, y: 1.6 },
  3: { x: 4.5, y: 1.6 },
  2: { x: 7.5, y: 1.6 },
  5: { x: 1.5, y: 6.6 },
  6: { x: 4.5, y: 6.6 },
  1: { x: 7.5, y: 6.6 },
}

/** Zone del campo avversario. Attenzione all'orientamento: il loro posto 4
 *  e' la loro sinistra, che vista dal nostro lato cade a destra dello schermo. */
export const OPP_ZONE: Record<OppZoneId, { at: Point; label: string }> = {
  z4: { at: { x: 7.3, y: -1.5 }, label: 'Attacco da posto 4' },
  z3: { at: { x: 4.5, y: -1.3 }, label: 'Attacco da posto 3' },
  z2: { at: { x: 1.7, y: -1.5 }, label: 'Attacco da posto 2' },
  pipe: { at: { x: 4.5, y: -2.7 }, label: 'Attacco pipe' },
  free: { at: { x: 4.5, y: -2.0 }, label: 'Palla facile' },
  battuta: { at: { x: 7.8, y: -2.6 }, label: 'Servizio avversario' },
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }
}

/** Accelerazione dolce in partenza e in arrivo: i giocatori non scattano
 *  e non si fermano di colpo. */
export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}
