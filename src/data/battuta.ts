import { READY_TO_BLOCK, SERVE_SPOT, SYSTEM_BASE, zoneSpots } from './positions'
import { ROLE, ROTATIONS, setterInFront } from './rotations'
import type { Phase, Point, RoleId, Rotation, RotationId, Scheme, SlotId } from '../types'

/** Il libero non può servire. Nelle rotazioni in cui il centrale che il
 *  libero ha sostituito finisce in zona 1, è quel centrale a dover
 *  rientrare in campo per battere. */
function liberoAlServizio(rotation: Rotation): boolean {
  return rotation.serverSlot === 'p5'
}

/** I ruoli in campo durante la battuta: uguali a quelli della rotazione,
 *  tranne quando il centrale rientra al posto del libero. */
function ruoli(rotation: Rotation): Partial<Record<SlotId, RoleId>> | undefined {
  return liberoAlServizio(rotation) ? { p5: rotation.liberoFor } : undefined
}

function conBattitore(
  spots: Record<SlotId, Point>,
  slot: SlotId,
): Record<SlotId, Point> {
  return { ...spots, [slot]: SERVE_SPOT }
}

function fasi(rotation: Rotation): Phase[] {
  const davanti = setterInFront(rotation)
  const cambio = liberoAlServizio(rotation)
  const roles = ruoli(rotation)
  const battitore = cambio
    ? ROLE[rotation.liberoFor].name.toLowerCase()
    : ROLE[rotation.roleBySlot[rotation.serverSlot]].name.toLowerCase()

  return [
    {
      label: 'Al servizio',
      caption: cambio
        ? `In zona 1 c’è il centrale sostituito dal libero: il libero non può servire, quindi esce e rientra il ${battitore} per battere.`
        : `Serve il ${battitore}, che in questa rotazione si trova in zona 1. Gli altri cinque restano nelle posizioni di rotazione.`,
      ball: SERVE_SPOT,
      roles,
      spots: conBattitore(zoneSpots(rotation), rotation.serverSlot),
    },
    {
      label: 'Palla colpita, si rientra',
      caption: davanti
        ? 'Cadono i vincoli: il palleggiatore attraversa per murare a posto 2, il centrale si mette al centro della rete e il battitore rientra in campo.'
        : 'Cadono i vincoli: il centrale va al centro della rete, le bande ai lati e il battitore rientra in campo.',
      ball: { x: 5.6, y: -1.4 },
      roles,
      spots: SYSTEM_BASE,
    },
    {
      label: 'Pronti a murare',
      caption: davanti
        ? 'Il muro di destra è del palleggiatore: è il momento in cui questa rotazione è più scoperta a rete.'
        : 'Prima linea alta sulla rete a leggere l’alzata, seconda linea scaglionata: da qui si entra nello schema di difesa.',
      roles,
      spots: READY_TO_BLOCK,
    },
  ]
}

/** Battuta e transizione: chi serve, dove stanno gli altri cinque e come
 *  si prendono i posti di sistema appena la palla è stata colpita. */
export const BATTUTA: Scheme[] = [
  {
    id: 'battuta-base',
    situation: 'battuta',
    variant: 'Servizio e rientro',
    description:
      'Al servizio valgono ancora i vincoli di rotazione per i cinque in campo. Appena la palla è colpita cadono: ciascuno corre al proprio posto di sistema per murare e difendere.',
    notes: [
      'Il battitore rientra in campo subito dopo il colpo: finché resta fuori siamo in cinque a difendere.',
      'La prima linea si posiziona guardando l’alzatore avversario, non la palla.',
      'Chi sbaglia il rientro lascia scoperta una zona intera: è l’errore più costoso di questa fase.',
      'Nelle rotazioni P6 e P3 tocca servire al centrale di seconda linea: il libero esce e rientra lui, perché il libero non può battere.',
    ],
    phases: Object.fromEntries(ROTATIONS.map((r) => [r.id, fasi(r)])) as Record<
      RotationId,
      Phase[]
    >,
  },
]
