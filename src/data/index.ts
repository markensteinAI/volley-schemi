import { BATTUTA } from './battuta'
import { COPERTURA } from './copertura'
import { DIFESA } from './difesa'
import { FREEBALL } from './freeball'
import { RICEZIONE } from './ricezione'
import type { Phase, RotationId, Scheme, SituationId } from '../types'

export { ROTATIONS, ROLE, rotationById } from './rotations'
export { SITUATIONS } from './situations'

/** Tutti gli schemi dell'applicazione. Per aggiungerne uno si tocca
 *  soltanto il file della situazione corrispondente. */
export const SCHEMES: Scheme[] = [
  ...RICEZIONE,
  ...DIFESA,
  ...FREEBALL,
  ...COPERTURA,
  ...BATTUTA,
]

export function schemesFor(situation: SituationId): Scheme[] {
  return SCHEMES.filter((s) => s.situation === situation)
}

/** Le fasi di uno schema per la rotazione scelta. Gli schemi che non
 *  dipendono dalla rotazione hanno un unico elenco di fasi. */
export function phasesFor(scheme: Scheme, rotation: RotationId): Phase[] {
  return Array.isArray(scheme.phases) ? scheme.phases : scheme.phases[rotation]
}
