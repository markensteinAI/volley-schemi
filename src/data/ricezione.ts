import {
  ATTACK_SETTER_BACK,
  ATTACK_SETTER_FRONT,
  RECEIVE,
  zoneSpots,
} from './positions'
import { ROTATIONS, setterInFront } from './rotations'
import type { Phase, Rotation, RotationId, Scheme } from '../types'

/** Quello che cambia da una rotazione all'altra non sono le posizioni di
 *  ricezione in sé, ma quanta strada deve fare il palleggiatore per
 *  arrivare in zona 2 e quali vincoli lo trattengono fino al tocco. */
const TESTI: Record<RotationId, { partenza: string; ricezione: string; scambi: string }> = {
  P1: {
    partenza:
      'Il palleggiatore parte da zona 1, dietro a destra: è già dalla parte giusta del campo.',
    ricezione:
      'Ricezione a tre. Il palleggiatore sale verso la rete sulla destra, ma resta dietro al centrale: non può superarlo prima del servizio.',
    scambi:
      'Dopo il tocco il centrale va al centro, l’opposto attraversa a destra e lo schiacciatore apre a posto 4: tre attacchi disponibili.',
  },
  P6: {
    partenza: 'Il palleggiatore parte da zona 6, al centro della seconda linea.',
    ricezione:
      'Il palleggiatore scivola a destra più che può, ma deve restare a sinistra del compagno di zona 1 e dietro a quello di zona 3.',
    scambi:
      'Il palleggiatore raggiunge la zona 2. Il libero, che riceveva a destra, attraversa fino a posto 5: è il movimento che più spesso si dimentica.',
  },
  P5: {
    partenza:
      'Il palleggiatore parte da zona 5, nell’angolo sinistro dietro: il punto più lontano da dove dovrà alzare.',
    ricezione:
      'Qui la corsa sarà la più lunga di tutte. Il palleggiatore resta dietro allo schiacciatore di zona 4 e aspetta il tocco per partire.',
    scambi:
      'Il palleggiatore attraversa in diagonale tutto il campo fino a zona 2: è la rotazione in cui una ricezione alta e precisa pesa di più.',
  },
  P4: {
    partenza:
      'Il palleggiatore parte da zona 4, davanti a sinistra: è in prima linea, ma dalla parte sbagliata della rete.',
    ricezione:
      'Il palleggiatore si schiaccia a rete il più a destra possibile, restando a sinistra del compagno di zona 3.',
    scambi:
      'Il palleggiatore attraversa tutta la rete fino a zona 2, il centrale va al centro e l’opposto attacca da seconda linea.',
  },
  P3: {
    partenza: 'Il palleggiatore parte da zona 3, al centro della rete.',
    ricezione:
      'Mezza rete da percorrere: il palleggiatore resta fra il centrale alla sua sinistra e lo schiacciatore che riceve alla sua destra.',
    scambi:
      'Il palleggiatore scivola a destra e il centrale prende il suo posto al centro: due attacchi a rete più l’opposto da dietro.',
  },
  P2: {
    partenza: 'Il palleggiatore parte da zona 2: è già dove deve alzare.',
    ricezione:
      'La rotazione più comoda: al palleggiatore basta restare a rete sulla destra, nessun vincolo lo tira altrove.',
    scambi:
      'Nessuna corsa da fare, si alza subito: è la rotazione in cui l’attacco parte più rapido.',
  },
}

function fasi(rotation: Rotation): Phase[] {
  const davanti = setterInFront(rotation)
  const testi = TESTI[rotation.id]
  return [
    {
      label: 'Posizione di rotazione',
      caption: testi.partenza,
      oppZone: 'battuta',
      spots: zoneSpots(rotation),
    },
    {
      label: 'Disposizione di ricezione',
      caption: testi.ricezione,
      oppZone: 'battuta',
      ball: { x: 5.0, y: -2.2 },
      spots: RECEIVE[rotation.id],
    },
    {
      label: 'Scambi e rincorse',
      caption: testi.scambi,
      ball: { x: 7.1, y: 0.9 },
      spots: davanti ? ATTACK_SETTER_FRONT : ATTACK_SETTER_BACK,
    },
  ]
}

/** Ricezione del servizio avversario.
 *
 *  Finché la palla non è colpita ogni giocatore deve rispettare l'ordine
 *  di rotazione rispetto ai compagni, davanti/dietro e destra/sinistra.
 *  Dopo il tocco i vincoli cadono e ciascuno corre al proprio posto. */
export const RICEZIONE: Scheme[] = [
  {
    id: 'ricezione-base',
    situation: 'ricezione',
    variant: 'Ricezione a tre',
    description:
      'Ricevono il libero e i due schiacciatori. Il palleggiatore si avvicina alla zona 2 per quanto la rotazione glielo consente, poi alza per i tre attaccanti.',
    notes: [
      'Finché la palla non è colpita dal battitore, nessuno può superare il compagno che lo precede nell’ordine di rotazione.',
      'Il centrale si fa trovare a rete già pronto al primo tempo: è l’attacco che tiene il muro avversario al centro.',
      'Chi non riceve resta fuori dalle traiettorie, per non togliere campo ai ricettori.',
      'Più il palleggiatore parte lontano dalla zona 2, più la ricezione deve essere alta: serve tempo perché arrivi.',
    ],
    phases: Object.fromEntries(ROTATIONS.map((r) => [r.id, fasi(r)])) as Record<
      RotationId,
      Phase[]
    >,
  },
]
