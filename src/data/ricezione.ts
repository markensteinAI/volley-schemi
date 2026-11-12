import { ZONE } from '../court'
import type { Scheme } from '../types'

/** Ricezione del servizio avversario.
 *
 *  Le fasi dipendono dalla rotazione: finche' la palla non e' colpita ogni
 *  giocatore deve rispettare l'ordine di rotazione (davanti/dietro e
 *  destra/sinistra rispetto ai compagni). Dopo il tocco i vincoli cadono e
 *  ciascuno corre al proprio posto di sistema. */
export const RICEZIONE: Scheme[] = [
  {
    id: 'ricezione-base',
    situation: 'ricezione',
    variant: 'Ricezione a tre',
    description:
      'Ricevono libero e i due schiacciatori. Il palleggiatore si porta verso la zona 2 restando nei limiti della rotazione, poi alza per i tre attaccanti.',
    notes: [
      'Finche’ la palla non e’ colpita dal battitore, nessuno puo’ superare il compagno che lo precede nell’ordine di rotazione.',
      'Il centrale si fa trovare a rete gia’ pronto al primo tempo: e’ l’attacco che obbliga il muro avversario a restare al centro.',
      'Chi non riceve resta fuori dalle traiettorie, per non togliere campo ai ricettori.',
    ],
    phases: {
      P1: [
        {
          label: 'Posizione di rotazione',
          caption:
            'Le sei posizioni della rotazione: il palleggiatore parte da zona 1, dietro a destra.',
          oppZone: 'battuta',
          spots: {
            p1: ZONE[1],
            p2: ZONE[4],
            p3: ZONE[2],
            p4: ZONE[3],
            p5: ZONE[5],
            p6: ZONE[6],
          },
        },
        {
          label: 'Disposizione di ricezione',
          caption:
            'Ricezione a tre. Il palleggiatore sale verso la rete sulla destra, ma resta dietro al centrale: non puo’ superarlo prima del servizio.',
          oppZone: 'battuta',
          ball: { x: 5.4, y: -2.2 },
          spots: {
            p1: { x: 7.6, y: 2.8 },
            p2: { x: 1.0, y: 1.2 },
            p3: { x: 7.0, y: 1.0 },
            p4: { x: 4.3, y: 4.7 },
            p5: { x: 1.7, y: 5.9 },
            p6: { x: 6.9, y: 5.7 },
          },
        },
        {
          label: 'Scambi e rincorse',
          caption:
            'Dopo il tocco il centrale va al centro, l’opposto attraversa a destra e lo schiacciatore apre a posto 4: tre attacchi disponibili.',
          ball: { x: 7.1, y: 0.9 },
          spots: {
            p1: { x: 7.1, y: 0.9 },
            p2: { x: 8.4, y: 3.0 },
            p3: { x: 4.6, y: 1.1 },
            p4: { x: 1.3, y: 2.6 },
            p5: { x: 1.9, y: 6.1 },
            p6: { x: 5.6, y: 6.2 },
          },
        },
      ],
      P4: [
        {
          label: 'Posizione di rotazione',
          caption:
            'Il palleggiatore parte da zona 4, davanti a sinistra: e’ il punto piu’ lontano da dove dovra’ alzare.',
          oppZone: 'battuta',
          spots: {
            p1: ZONE[1],
            p2: ZONE[4],
            p3: ZONE[2],
            p4: ZONE[3],
            p5: ZONE[5],
            p6: ZONE[6],
          },
        },
        {
          label: 'Disposizione di ricezione',
          caption:
            'Il palleggiatore si schiaccia a rete il piu’ a destra possibile, ma deve restare a sinistra del compagno di zona 3: la corsa parte solo dopo il tocco.',
          oppZone: 'battuta',
          ball: { x: 3.6, y: -2.2 },
          spots: {
            p1: { x: 8.4, y: 3.9 },
            p2: { x: 3.4, y: 1.0 },
            p3: { x: 7.6, y: 1.1 },
            p4: { x: 4.6, y: 4.9 },
            p5: { x: 1.6, y: 5.6 },
            p6: { x: 7.0, y: 6.1 },
          },
        },
        {
          label: 'Scambi e rincorse',
          caption:
            'Il palleggiatore attraversa tutta la rete fino a zona 2, il centrale va al centro, lo schiacciatore apre a posto 4 e l’opposto attacca da seconda linea.',
          ball: { x: 7.1, y: 0.9 },
          spots: {
            p1: { x: 8.3, y: 4.2 },
            p2: { x: 7.1, y: 0.9 },
            p3: { x: 4.6, y: 1.1 },
            p4: { x: 1.3, y: 2.6 },
            p5: { x: 1.9, y: 6.0 },
            p6: { x: 5.8, y: 6.3 },
          },
        },
      ],
    },
  },
]
