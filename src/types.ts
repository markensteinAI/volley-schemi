/** Ruoli della squadra. In campo ce ne sono sempre sei: il libero (L)
 *  sostituisce il centrale che si trova in seconda linea. */
export type RoleId = 'P' | 'O' | 'C1' | 'C2' | 'S1' | 'S2' | 'L'

/** Posto di sistema: identifica il giocatore dentro una rotazione.
 *  p1..p6 seguono la numerazione delle zone del campo. */
export type SlotId = 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6'

/** Rotazione, identificata dalla zona in cui si trova il palleggiatore.
 *  L'ordine è quello in cui si ruota in partita: 1, 6, 5, 4, 3, 2. */
export type RotationId = 'P1' | 'P6' | 'P5' | 'P4' | 'P3' | 'P2'

/** Le sei zone del campo, nella numerazione della pallavolo. */
export type ZoneId = 1 | 2 | 3 | 4 | 5 | 6

export type SituationId =
  | 'ricezione'
  | 'difesa'
  | 'freeball'
  | 'copertura'
  | 'battuta'

/** Posizione in metri sul campo reale: x da 0 (sinistra) a 9 (destra),
 *  y da 0 (rete) a 9 (nostra linea di fondo). */
export type Point = { x: number; y: number }

/** Zona del campo avversario che si accende per spiegare da dove arriva la palla. */
export type OppZoneId = 'z4' | 'z3' | 'z2' | 'pipe' | 'free' | 'battuta'

export type Phase = {
  /** Titolo breve della fase, usato nell'elenco laterale. */
  label: string
  /** Frase che spiega cosa succede, mostrata sotto il campo. */
  caption: string
  /** Dove si trova ciascun giocatore in questa fase. */
  spots: Record<SlotId, Point>
  /** Posizione della palla, se ha senso mostrarla. */
  ball?: Point
  /** Zona avversaria da evidenziare. */
  oppZone?: OppZoneId
  /** Ruoli diversi da quelli della rotazione, per i casi in cui la
   *  formazione in campo cambia: in battuta il libero esce e rientra il
   *  centrale, che è l'unico dei due a poter servire. */
  roles?: Partial<Record<SlotId, RoleId>>
}

export type Rotation = {
  id: RotationId
  /** Etichetta breve per i pulsanti. */
  short: string
  /** Etichetta estesa. */
  label: string
  /** Chi occupa ciascun posto di sistema in questa rotazione. */
  roleBySlot: Record<SlotId, RoleId>
  /** In quale zona si trova ciascun giocatore prima del servizio, cioè
   *  finché valgono i vincoli di rotazione. */
  zoneBySlot: Record<SlotId, ZoneId>
  /** Quale dei due centrali è sostituito dal libero in questa rotazione:
   *  sempre quello che si trova in seconda linea. */
  liberoFor: RoleId
  /** Chi va a servire: il giocatore che si trova in zona 1. */
  serverSlot: SlotId
}

export type Scheme = {
  id: string
  situation: SituationId
  /** Nome della variante, quando la situazione ne ha piu' di una. */
  variant: string
  description: string
  /** Note tattiche, mostrate solo dove c'e' spazio (schermi grandi). */
  notes?: string[]
  /** Fasi comuni a tutte le rotazioni, oppure specifiche per rotazione
   *  quando il punto di partenza dipende da dove si trova il palleggiatore. */
  phases: Phase[] | Record<RotationId, Phase[]>
}

export type Situation = {
  id: SituationId
  label: string
  /** Riga di contesto mostrata sotto al titolo della situazione. */
  hint: string
}
