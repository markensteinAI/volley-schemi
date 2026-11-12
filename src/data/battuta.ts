import { ZONE } from '../court'
import type { Scheme } from '../types'

/** Battuta e transizione: chi serve, dove stanno gli altri cinque e come
 *  si prendono i posti di sistema appena la palla è stata colpita.
 *
 *  Serve il giocatore che si trova in zona 1. Il libero non può servire:
 *  nelle due rotazioni definite non capita mai, ma se si aggiungono le
 *  altre va controllato chi occupa la zona 1. */
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
    ],
    phases: {
      P1: [
        {
          label: 'Al servizio',
          caption:
            'Serve il palleggiatore, da dietro la linea di fondo. Gli altri cinque sono nelle posizioni di rotazione.',
          ball: { x: 8.0, y: 10.4 },
          spots: {
            p1: { x: 8.0, y: 10.4 },
            p2: ZONE[4],
            p3: ZONE[2],
            p4: ZONE[3],
            p5: ZONE[5],
            p6: ZONE[6],
          },
        },
        {
          label: 'Palla colpita, si rientra',
          caption:
            'Cadono i vincoli: il centrale va al centro della rete, le bande ai lati, il battitore rientra a posto 1.',
          ball: { x: 5.6, y: -1.4 },
          spots: {
            p1: { x: 7.4, y: 6.2 },
            p2: { x: 7.4, y: 1.8 },
            p3: { x: 4.5, y: 1.2 },
            p4: { x: 1.7, y: 1.8 },
            p5: { x: 1.6, y: 6.4 },
            p6: { x: 4.5, y: 7.0 },
          },
        },
        {
          label: 'Pronti a murare',
          caption:
            'Prima linea alta sulla rete a leggere l’alzata, seconda linea scaglionata: da qui si entra nello schema di difesa.',
          spots: {
            p1: { x: 7.6, y: 6.0 },
            p2: { x: 7.2, y: 1.3 },
            p3: { x: 4.5, y: 0.9 },
            p4: { x: 1.8, y: 1.3 },
            p5: { x: 1.5, y: 6.6 },
            p6: { x: 4.6, y: 7.2 },
          },
        },
      ],
      P4: [
        {
          label: 'Al servizio',
          caption:
            'Serve l’opposto, che in questa rotazione si trova in zona 1. Il palleggiatore è in prima linea a sinistra.',
          ball: { x: 8.0, y: 10.4 },
          spots: {
            p1: { x: 8.0, y: 10.4 },
            p2: ZONE[4],
            p3: ZONE[2],
            p4: ZONE[3],
            p5: ZONE[5],
            p6: ZONE[6],
          },
        },
        {
          label: 'Palla colpita, si rientra',
          caption:
            'Il palleggiatore attraversa da sinistra a destra per murare a posto 2, il centrale si mette al centro e il battitore rientra a posto 1.',
          ball: { x: 5.6, y: -1.4 },
          spots: {
            p1: { x: 7.5, y: 6.2 },
            p2: { x: 7.3, y: 1.8 },
            p3: { x: 4.5, y: 1.2 },
            p4: { x: 1.7, y: 1.8 },
            p5: { x: 1.6, y: 6.4 },
            p6: { x: 4.5, y: 7.0 },
          },
        },
        {
          label: 'Pronti a murare',
          caption:
            'Il palleggiatore mura a posto 2: è il momento in cui questa rotazione è più scoperta a rete, perché il muro di destra è il suo.',
          spots: {
            p1: { x: 7.7, y: 6.0 },
            p2: { x: 7.2, y: 1.3 },
            p3: { x: 4.5, y: 0.9 },
            p4: { x: 1.8, y: 1.3 },
            p5: { x: 1.5, y: 6.6 },
            p6: { x: 4.6, y: 7.2 },
          },
        },
      ],
    },
  },
]
