import { ZONE } from '../court'
import type { Point, Rotation, RotationId, SlotId } from '../types'

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

/** Prima linea alta sulla rete a leggere l'alzata avversaria, seconda
 *  linea scaglionata: la posizione da cui parte ogni schema di difesa. */
export const READY_TO_BLOCK: Record<SlotId, Point> = {
  p4: { x: 1.8, y: 1.3 },
  p3: { x: 4.5, y: 0.9 },
  p2: { x: 7.2, y: 1.3 },
  p5: { x: 1.5, y: 6.6 },
  p6: { x: 4.6, y: 7.2 },
  p1: { x: 7.6, y: 6.0 },
}

/** Dove si va dopo il tocco di ricezione, o su free ball, quando il
 *  palleggiatore è in SECONDA linea: alza da zona 2 e l'opposto, che è in
 *  prima linea, attacca a posto 2. */
export const ATTACK_SETTER_BACK: Record<SlotId, Point> = {
  p1: { x: 7.1, y: 0.9 },
  p2: { x: 8.4, y: 3.0 },
  p3: { x: 4.6, y: 1.1 },
  p4: { x: 1.3, y: 2.6 },
  p5: { x: 1.9, y: 6.1 },
  p6: { x: 5.6, y: 6.2 },
}

/** Lo stesso con il palleggiatore in PRIMA linea: alza lui da posto 2 e
 *  l'opposto, che è dietro, attacca da seconda linea. */
export const ATTACK_SETTER_FRONT: Record<SlotId, Point> = {
  p1: { x: 8.3, y: 4.2 },
  p2: { x: 7.1, y: 0.9 },
  p3: { x: 4.6, y: 1.1 },
  p4: { x: 1.3, y: 2.6 },
  p5: { x: 1.9, y: 6.0 },
  p6: { x: 5.8, y: 6.3 },
}

/** Posizioni di stacco, con gli attaccanti già a rete. */
export const SPIKE_SETTER_BACK: Record<SlotId, Point> = {
  p1: { x: 7.0, y: 0.9 },
  p2: { x: 8.0, y: 1.6 },
  p3: { x: 4.5, y: 1.2 },
  p4: { x: 1.5, y: 1.4 },
  p5: { x: 1.9, y: 6.0 },
  p6: { x: 5.2, y: 5.8 },
}

export const SPIKE_SETTER_FRONT: Record<SlotId, Point> = {
  p1: { x: 8.2, y: 4.0 },
  p2: { x: 7.0, y: 0.9 },
  p3: { x: 4.5, y: 1.2 },
  p4: { x: 1.5, y: 1.4 },
  p5: { x: 1.9, y: 6.0 },
  p6: { x: 5.2, y: 5.8 },
}

/** Dietro la linea di fondo, da dove si serve. */
export const SERVE_SPOT: Point = { x: 8.0, y: 10.4 }

/** Dove sta ciascun giocatore prima del servizio: al centro della zona
 *  che la rotazione gli assegna. */
export function zoneSpots(rotation: Rotation): Record<SlotId, Point> {
  const spots = {} as Record<SlotId, Point>
  for (const slot of Object.keys(rotation.zoneBySlot) as SlotId[]) {
    spots[slot] = ZONE[rotation.zoneBySlot[slot]]
  }
  return spots
}

/** Disposizione di ricezione, rotazione per rotazione.
 *
 *  Ricevono sempre il libero e i due schiacciatori. Gli altri tre si
 *  sistemano dove la rotazione permette: finché la palla non è colpita
 *  nessuno può superare il compagno che lo precede nell'ordine, né in
 *  profondità né lateralmente. Sono questi vincoli a rendere ogni
 *  rotazione diversa dalle altre. */
export const RECEIVE: Record<RotationId, Record<SlotId, Point>> = {
  P1: {
    p1: { x: 7.6, y: 2.8 },
    p2: { x: 1.0, y: 1.2 },
    p3: { x: 7.0, y: 1.0 },
    p4: { x: 4.3, y: 4.7 },
    p5: { x: 1.7, y: 5.9 },
    p6: { x: 6.9, y: 5.7 },
  },
  P6: {
    p1: { x: 6.4, y: 2.6 },
    p2: { x: 3.4, y: 1.1 },
    p3: { x: 1.1, y: 1.0 },
    p4: { x: 4.8, y: 4.2 },
    p5: { x: 7.6, y: 5.8 },
    p6: { x: 1.5, y: 5.2 },
  },
  P5: {
    p1: { x: 2.6, y: 5.6 },
    p2: { x: 7.8, y: 1.1 },
    p3: { x: 4.6, y: 1.0 },
    p4: { x: 1.6, y: 4.2 },
    p5: { x: 5.2, y: 6.0 },
    p6: { x: 7.6, y: 5.4 },
  },
  P4: {
    p1: { x: 8.4, y: 3.9 },
    p2: { x: 3.4, y: 1.0 },
    p3: { x: 7.6, y: 1.1 },
    p4: { x: 4.6, y: 4.9 },
    p5: { x: 1.6, y: 5.6 },
    p6: { x: 7.0, y: 6.1 },
  },
  P3: {
    p1: { x: 6.6, y: 2.8 },
    p2: { x: 3.2, y: 1.0 },
    p3: { x: 1.2, y: 1.0 },
    p4: { x: 4.6, y: 4.6 },
    p5: { x: 7.8, y: 5.8 },
    p6: { x: 1.5, y: 5.2 },
  },
  P2: {
    p1: { x: 2.8, y: 5.8 },
    p2: { x: 7.4, y: 1.0 },
    p3: { x: 4.6, y: 1.0 },
    p4: { x: 1.6, y: 4.0 },
    p5: { x: 5.0, y: 6.2 },
    p6: { x: 7.8, y: 5.6 },
  },
}
