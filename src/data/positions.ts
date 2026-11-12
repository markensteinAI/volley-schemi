import type { Point, SlotId } from '../types'

/** Posizioni di sistema: dove sta ciascun giocatore una volta caduti i
 *  vincoli di rotazione, cioè durante lo scambio. Valgono per ogni
 *  rotazione, perché sono legate al posto e non al ruolo. */
export const SYSTEM_BASE: Record<SlotId, Point> = {
  p4: { x: 1.8, y: 1.8 },
  p3: { x: 4.5, y: 1.4 },
  p2: { x: 7.2, y: 1.8 },
  p5: { x: 1.6, y: 6.4 },
  p6: { x: 4.5, y: 7.0 },
  p1: { x: 7.4, y: 6.4 },
}
