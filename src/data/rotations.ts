import type { RoleId, Rotation, RotationId } from '../types'

/** Sigla e nome esteso di ogni ruolo, più la famiglia usata per il colore. */
export const ROLE: Record<RoleId, { name: string; family: string }> = {
  P: { name: 'Palleggiatore', family: 'setter' },
  O: { name: 'Opposto', family: 'opposite' },
  C1: { name: 'Centrale 1', family: 'middle' },
  C2: { name: 'Centrale 2', family: 'middle' },
  S1: { name: 'Schiacciatore 1', family: 'outside' },
  S2: { name: 'Schiacciatore 2', family: 'outside' },
  L: { name: 'Libero', family: 'libero' },
}

/** Le sei rotazioni, nell'ordine in cui si susseguono in partita.
 *  Il nome indica la zona in cui si trova il palleggiatore.
 *
 *  In sistema 5-1 l'opposto è sempre in diagonale al palleggiatore, i due
 *  centrali fra loro e i due schiacciatori fra loro. Ne segue che in prima
 *  linea c'è sempre un centrale, uno schiacciatore e uno fra palleggiatore
 *  e opposto.
 *
 *  Due mappe descrivono ogni rotazione:
 *  - zoneBySlot dice dove sta ciascuno PRIMA del servizio, quando valgono
 *    i vincoli di rotazione;
 *  - roleBySlot dice chi gioca in quale posto DOPO, quando i vincoli cadono
 *    e ciascuno va dove gioca davvero (il centrale al centro, le bande ai
 *    lati, il palleggiatore a destra).
 *
 *  Il libero sostituisce il centrale che si trova in seconda linea e gioca
 *  a posto 5. */
export const ROTATIONS: Rotation[] = [
  {
    id: 'P1',
    short: 'P in 1',
    label: 'Palleggiatore in zona 1 (seconda linea)',
    roleBySlot: { p1: 'P', p2: 'O', p3: 'C1', p4: 'S1', p5: 'L', p6: 'S2' },
    zoneBySlot: { p1: 1, p2: 4, p3: 2, p4: 3, p5: 5, p6: 6 },
    liberoFor: 'C2',
    serverSlot: 'p1',
  },
  {
    id: 'P6',
    short: 'P in 6',
    label: 'Palleggiatore in zona 6 (seconda linea)',
    roleBySlot: { p1: 'P', p2: 'O', p3: 'C2', p4: 'S1', p5: 'L', p6: 'S2' },
    zoneBySlot: { p1: 6, p2: 3, p3: 4, p4: 2, p5: 1, p6: 5 },
    liberoFor: 'C1',
    serverSlot: 'p5',
  },
  {
    id: 'P5',
    short: 'P in 5',
    label: 'Palleggiatore in zona 5 (seconda linea)',
    roleBySlot: { p1: 'P', p2: 'O', p3: 'C2', p4: 'S2', p5: 'L', p6: 'S1' },
    zoneBySlot: { p1: 5, p2: 2, p3: 3, p4: 4, p5: 6, p6: 1 },
    liberoFor: 'C1',
    serverSlot: 'p6',
  },
  {
    id: 'P4',
    short: 'P in 4',
    label: 'Palleggiatore in zona 4 (prima linea)',
    roleBySlot: { p1: 'O', p2: 'P', p3: 'C2', p4: 'S2', p5: 'L', p6: 'S1' },
    zoneBySlot: { p1: 1, p2: 4, p3: 2, p4: 3, p5: 5, p6: 6 },
    liberoFor: 'C1',
    serverSlot: 'p1',
  },
  {
    id: 'P3',
    short: 'P in 3',
    label: 'Palleggiatore in zona 3 (prima linea)',
    roleBySlot: { p1: 'O', p2: 'P', p3: 'C1', p4: 'S2', p5: 'L', p6: 'S1' },
    zoneBySlot: { p1: 6, p2: 3, p3: 4, p4: 2, p5: 1, p6: 5 },
    liberoFor: 'C2',
    serverSlot: 'p5',
  },
  {
    id: 'P2',
    short: 'P in 2',
    label: 'Palleggiatore in zona 2 (prima linea)',
    roleBySlot: { p1: 'O', p2: 'P', p3: 'C1', p4: 'S1', p5: 'L', p6: 'S2' },
    zoneBySlot: { p1: 5, p2: 2, p3: 3, p4: 4, p5: 6, p6: 1 },
    liberoFor: 'C2',
    serverSlot: 'p6',
  },
]

export function rotationById(id: RotationId): Rotation {
  const found = ROTATIONS.find((r) => r.id === id)
  if (!found) throw new Error(`Rotazione sconosciuta: ${id}`)
  return found
}

/** Il palleggiatore è in prima linea, e quindi mura a posto 2, nelle
 *  rotazioni in cui occupa le zone 4, 3 o 2. */
export function setterInFront(rotation: Rotation): boolean {
  return rotation.roleBySlot.p2 === 'P'
}
