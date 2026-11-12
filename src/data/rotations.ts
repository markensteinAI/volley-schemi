import type { RoleId, Rotation, RotationId } from '../types'

/** Sigla e nome esteso di ogni ruolo, piu' la famiglia usata per il colore. */
export const ROLE: Record<RoleId, { name: string; family: string }> = {
  P: { name: 'Palleggiatore', family: 'setter' },
  O: { name: 'Opposto', family: 'opposite' },
  C1: { name: 'Centrale 1', family: 'middle' },
  C2: { name: 'Centrale 2', family: 'middle' },
  S1: { name: 'Schiacciatore 1', family: 'outside' },
  S2: { name: 'Schiacciatore 2', family: 'outside' },
  L: { name: 'Libero', family: 'libero' },
}

/** Le rotazioni definite. Il nome indica la zona del palleggiatore.
 *
 *  In sistema 5-1 l'opposto e' sempre in diagonale al palleggiatore, i due
 *  centrali e i due schiacciatori fra loro. Il libero entra al posto del
 *  centrale che si trova in seconda linea, quindi in campo ci sono sempre
 *  sei giocatori: cinque di ruolo piu' il libero.
 *
 *  roleBySlot associa a ogni posto di sistema (dove il giocatore gioca una
 *  volta caduti i vincoli di rotazione) il ruolo che lo occupa.
 *  Per aggiungere le altre quattro rotazioni basta aggiungere una voce qui. */
export const ROTATIONS: Rotation[] = [
  {
    id: 'P1',
    short: 'P in 1',
    label: 'Palleggiatore in zona 1 (seconda linea)',
    roleBySlot: { p1: 'P', p2: 'O', p3: 'C1', p4: 'S1', p5: 'L', p6: 'S2' },
  },
  {
    id: 'P4',
    short: 'P in 4',
    label: 'Palleggiatore in zona 4 (prima linea)',
    roleBySlot: { p1: 'O', p2: 'P', p3: 'C2', p4: 'S2', p5: 'L', p6: 'S1' },
  },
]

export function rotationById(id: RotationId): Rotation {
  const found = ROTATIONS.find((r) => r.id === id)
  if (!found) throw new Error(`Rotazione sconosciuta: ${id}`)
  return found
}
