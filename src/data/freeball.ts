import { SYSTEM_BASE } from './positions'
import type { Scheme } from '../types'

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
      'Su free ball si gioca con tre attacchi disponibili: è il momento migliore per usare il primo tempo al centro.',
    ],
    phases: {
      P1: [
        {
          label: 'Palla in arrivo',
          caption:
            'Siamo schierati in difesa. L’avversario non attacca: rimanda una palla alta e lenta.',
          oppZone: 'free',
          ball: { x: 4.5, y: -2.0 },
          spots: SYSTEM_BASE,
        },
        {
          label: 'Il palleggiatore scatta',
          caption:
            'Il palleggiatore è in seconda linea: scatta da posto 1 fino alla rete, in zona 2, prima che la palla arrivi. Gli altri aprono.',
          oppZone: 'free',
          ball: { x: 4.5, y: 0.4 },
          spots: {
            p1: { x: 7.0, y: 1.0 },
            p2: { x: 8.3, y: 3.0 },
            p3: { x: 4.6, y: 1.2 },
            p4: { x: 1.3, y: 2.8 },
            p5: { x: 1.7, y: 6.2 },
            p6: { x: 5.0, y: 6.4 },
          },
        },
        {
          label: 'Attacco organizzato',
          caption:
            'Tre attacchi a disposizione: posto 4, primo tempo al centro e opposto a posto 2. Chi resta dietro è già pronto a coprire.',
          ball: { x: 7.0, y: 0.9 },
          spots: {
            p1: { x: 7.0, y: 0.9 },
            p2: { x: 8.0, y: 1.6 },
            p3: { x: 4.5, y: 1.2 },
            p4: { x: 1.5, y: 1.4 },
            p5: { x: 1.9, y: 6.0 },
            p6: { x: 5.2, y: 5.8 },
          },
        },
      ],
      P4: [
        {
          label: 'Palla in arrivo',
          caption:
            'Stessa situazione, ma questa volta il palleggiatore è già in prima linea.',
          oppZone: 'free',
          ball: { x: 4.5, y: -2.0 },
          spots: SYSTEM_BASE,
        },
        {
          label: 'Riposizionamento corto',
          caption:
            'Al palleggiatore basta sistemarsi in zona 2: il tempo guadagnato lo usano gli attaccanti per allargare le rincorse.',
          oppZone: 'free',
          ball: { x: 4.5, y: 0.4 },
          spots: {
            p1: { x: 8.4, y: 4.4 },
            p2: { x: 7.0, y: 1.0 },
            p3: { x: 4.6, y: 1.3 },
            p4: { x: 1.4, y: 2.8 },
            p5: { x: 1.7, y: 6.2 },
            p6: { x: 5.0, y: 6.4 },
          },
        },
        {
          label: 'Attacco organizzato',
          caption:
            'Con il palleggiatore in prima linea restano due attacchi a rete, posto 4 e centro: l’opposto attacca da seconda linea.',
          ball: { x: 7.0, y: 0.9 },
          spots: {
            p1: { x: 8.2, y: 4.0 },
            p2: { x: 7.0, y: 0.9 },
            p3: { x: 4.5, y: 1.2 },
            p4: { x: 1.5, y: 1.4 },
            p5: { x: 1.9, y: 6.0 },
            p6: { x: 5.2, y: 5.8 },
          },
        },
      ],
    },
  },
]
