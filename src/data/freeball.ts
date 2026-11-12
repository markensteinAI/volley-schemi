import {
  ATTACK_SETTER_BACK,
  ATTACK_SETTER_FRONT,
  SPIKE_SETTER_BACK,
  SPIKE_SETTER_FRONT,
  SYSTEM_BASE,
} from './positions'
import { ROTATIONS, setterInFront } from './rotations'
import type { Phase, Rotation, RotationId, Scheme } from '../types'

function fasi(rotation: Rotation): Phase[] {
  const davanti = setterInFront(rotation)
  return [
    {
      label: 'Palla in arrivo',
      caption:
        'Siamo schierati in difesa. L’avversario non attacca: rimanda una palla alta e lenta.',
      oppZone: 'free',
      ball: { x: 4.5, y: -2.0 },
      spots: SYSTEM_BASE,
    },
    {
      label: davanti ? 'Riposizionamento corto' : 'Il palleggiatore scatta',
      caption: davanti
        ? 'Il palleggiatore è già in prima linea: gli basta sistemarsi in zona 2. Il tempo guadagnato lo usano gli attaccanti per allargare le rincorse.'
        : 'Il palleggiatore è in seconda linea: scatta da posto 1 fino alla rete prima che la palla arrivi, mentre gli altri aprono.',
      oppZone: 'free',
      ball: { x: 4.5, y: 0.4 },
      spots: davanti ? ATTACK_SETTER_FRONT : ATTACK_SETTER_BACK,
    },
    {
      label: 'Attacco organizzato',
      caption: davanti
        ? 'Con il palleggiatore in prima linea restano due attacchi a rete, posto 4 e centro, più l’opposto da seconda linea.'
        : 'Tre attacchi a disposizione: posto 4, primo tempo al centro e opposto a posto 2. Chi resta dietro è già pronto a coprire.',
      ball: { x: 7.0, y: 0.9 },
      spots: davanti ? SPIKE_SETTER_FRONT : SPIKE_SETTER_BACK,
    },
  ]
}

/** Free ball: l'avversario rimanda una palla facile.
 *
 *  È la situazione in cui si vede meglio la differenza fra le rotazioni:
 *  con il palleggiatore in seconda linea serve una corsa lunga verso la
 *  rete, con il palleggiatore in prima linea basta un aggiustamento. */
export const FREEBALL: Scheme[] = [
  {
    id: 'freeball-base',
    situation: 'freeball',
    variant: 'Palla facile dall’avversario',
    description:
      'Appena si capisce che la palla arriva lenta e alta, la squadra passa da difesa ad attacco: il palleggiatore va a rete e i tre attaccanti aprono le rincorse.',
    notes: [
      'La chiamata va fatta a voce e presto: il palleggiatore parte prima che la palla superi la rete, non dopo.',
      'Chi non attacca arretra e allarga, per lasciare spazio alle rincorse e farsi trovare pronto a coprire.',
      'Su free ball si gioca con tutti gli attacchi disponibili: è il momento migliore per usare il primo tempo al centro.',
    ],
    phases: Object.fromEntries(ROTATIONS.map((r) => [r.id, fasi(r)])) as Record<
      RotationId,
      Phase[]
    >,
  },
]
