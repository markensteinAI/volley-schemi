import { SYSTEM_BASE } from './positions'
import type { Phase, Scheme } from '../types'

/** Fase di partenza comune a tutte le varianti di difesa. */
function partenza(caption: string): Phase {
  return { label: 'Posizione di partenza', caption, spots: SYSTEM_BASE }
}

/** Difesa sull'attacco avversario.
 *
 *  Orientamento: il posto 4 avversario è alla sua sinistra, che vista dal
 *  nostro lato cade a destra dello schermo. Il loro posto 4 attacca quindi
 *  contro il nostro muro di posto 2, e viceversa.
 *
 *  Sistema usato: muro a due sui posti laterali e difesa con il posto 6
 *  arretrato, il più semplice da tenere per una squadra amatoriale. */
export const DIFESA: Scheme[] = [
  {
    id: 'difesa-posto4',
    situation: 'difesa',
    variant: 'Attacco da posto 4',
    description:
      'L’avversario attacca dalla sua banda sinistra, che per noi è il lato destro del campo. Muro a due formato dal posto 2 e dal centrale.',
    notes: [
      'Il muro copre la parallela: la difesa si dispone quindi sulla diagonale, che resta la traiettoria aperta.',
      'Il posto 4, lontano dalla palla, si stacca dalla rete e copre il pallonetto corto dietro il muro.',
      'Il posto 1 resta largo e arretrato per il mani-fuori, l’errore più frequente da leggere.',
    ],
    phases: [
      partenza(
        'Posizioni di sistema: tre giocatori a rete pronti a murare, tre in seconda linea.',
      ),
      {
        label: 'Si forma il muro',
        caption:
          'Posto 2 e centrale chiudono il muro a destra. Gli altri quattro si staccano e aprono la difesa sulla diagonale.',
        oppZone: 'z4',
        ball: { x: 7.3, y: -1.2 },
        spots: {
          p2: { x: 7.6, y: 0.35 },
          p3: { x: 6.4, y: 0.35 },
          p4: { x: 2.3, y: 2.9 },
          p5: { x: 1.5, y: 7.2 },
          p6: { x: 4.8, y: 7.6 },
          p1: { x: 8.0, y: 5.4 },
        },
      },
      {
        label: 'Difesa pronta',
        caption:
          'Posto 1 sulla parallela e sul mani-fuori, posto 5 e posto 6 sulla diagonale lunga, posto 4 sul pallonetto dietro il muro.',
        oppZone: 'z4',
        ball: { x: 6.9, y: 1.8 },
        spots: {
          p2: { x: 7.6, y: 0.3 },
          p3: { x: 6.4, y: 0.3 },
          p4: { x: 2.6, y: 3.2 },
          p5: { x: 1.4, y: 7.3 },
          p6: { x: 4.8, y: 7.8 },
          p1: { x: 8.3, y: 4.6 },
        },
      },
    ],
  },
  {
    id: 'difesa-posto2',
    situation: 'difesa',
    variant: 'Attacco da posto 2',
    description:
      'Immagine speculare: l’avversario attacca dalla sua banda destra, che per noi è il lato sinistro. Muro a due formato dal posto 4 e dal centrale.',
    notes: [
      'Tutto il sistema è il riflesso dell’attacco da posto 4: chi fatica a ricordarlo può ragionare sul lato della palla invece che sul numero di zona.',
      'Il posto 2, lontano dalla palla, copre il pallonetto corto.',
      'Il posto 5 tiene la parallela, posto 1 e posto 6 la diagonale.',
    ],
    phases: [
      partenza('Posizioni di sistema, prima che parta l’alzata avversaria.'),
      {
        label: 'Si forma il muro',
        caption:
          'Posto 4 e centrale chiudono il muro a sinistra. La difesa si apre sulla diagonale verso destra.',
        oppZone: 'z2',
        ball: { x: 1.7, y: -1.2 },
        spots: {
          p4: { x: 1.4, y: 0.35 },
          p3: { x: 2.6, y: 0.35 },
          p2: { x: 6.7, y: 2.9 },
          p1: { x: 7.5, y: 7.2 },
          p6: { x: 4.2, y: 7.6 },
          p5: { x: 1.0, y: 5.4 },
        },
      },
      {
        label: 'Difesa pronta',
        caption:
          'Posto 5 sulla parallela e sul mani-fuori, posto 1 e posto 6 sulla diagonale lunga, posto 2 sul pallonetto dietro il muro.',
        oppZone: 'z2',
        ball: { x: 2.1, y: 1.8 },
        spots: {
          p4: { x: 1.4, y: 0.3 },
          p3: { x: 2.6, y: 0.3 },
          p2: { x: 6.4, y: 3.2 },
          p1: { x: 7.6, y: 7.3 },
          p6: { x: 4.2, y: 7.8 },
          p5: { x: 0.7, y: 4.6 },
        },
      },
    ],
  },
  {
    id: 'difesa-posto3',
    situation: 'difesa',
    variant: 'Attacco al centro',
    description:
      'Primo tempo avversario: non c’è tempo per comporre un muro a due, mura il solo centrale e la difesa resta larga.',
    notes: [
      'Contro il primo tempo il muro è quasi sempre a uno: inutile inseguirlo, meglio restare pronti a difendere.',
      'I due laterali non saltano: restano bassi e difendono gli angoli vicini alla rete.',
      'La seconda linea resta più avanti del solito, perché l’attacco al centro cade corto.',
    ],
    phases: [
      partenza('Posizioni di sistema: il centrale avversario sta per attaccare di primo tempo.'),
      {
        label: 'Muro del centrale',
        caption:
          'Salta solo il nostro centrale. I laterali restano a terra e difendono gli angoli corti.',
        oppZone: 'z3',
        ball: { x: 4.5, y: -1.0 },
        spots: {
          p3: { x: 4.5, y: 0.35 },
          p4: { x: 1.6, y: 1.6 },
          p2: { x: 7.4, y: 1.6 },
          p5: { x: 1.5, y: 5.8 },
          p6: { x: 4.5, y: 6.6 },
          p1: { x: 7.5, y: 5.8 },
        },
      },
      {
        label: 'Difesa corta',
        caption:
          'La seconda linea resta avanti: il primo tempo raramente arriva in fondo al campo.',
        oppZone: 'z3',
        ball: { x: 4.5, y: 2.2 },
        spots: {
          p3: { x: 4.5, y: 0.3 },
          p4: { x: 1.5, y: 2.0 },
          p2: { x: 7.5, y: 2.0 },
          p5: { x: 1.3, y: 5.4 },
          p6: { x: 4.5, y: 6.2 },
          p1: { x: 7.7, y: 5.4 },
        },
      },
    ],
  },
  {
    id: 'difesa-pipe',
    situation: 'difesa',
    variant: 'Attacco pipe',
    description:
      'Attacco dal centro della seconda linea avversaria. Parte più lontano dalla rete, quindi con traiettoria più lunga e tesa.',
    notes: [
      'Il muro si forma al centro, ma arriva spesso con un tempo di ritardo: la difesa deve aspettarsi la palla a terra.',
      'Gli angoli di fondo campo sono le zone più esposte: posto 5 e posto 1 restano larghi e profondi.',
      'Il posto 4 si stacca e copre il taglio corto dietro il muro.',
    ],
    phases: [
      partenza('Posizioni di sistema: l’alzata va indietro, si prepara un attacco da seconda linea.'),
      {
        label: 'Muro al centro',
        caption:
          'Centrale e posto 2 chiudono al centro. Il posto 4 si stacca e copre il taglio corto.',
        oppZone: 'pipe',
        ball: { x: 4.5, y: -2.4 },
        spots: {
          p3: { x: 4.5, y: 0.4 },
          p2: { x: 5.9, y: 0.4 },
          p4: { x: 1.8, y: 2.8 },
          p5: { x: 1.4, y: 6.8 },
          p6: { x: 4.6, y: 7.6 },
          p1: { x: 7.6, y: 5.8 },
        },
      },
      {
        label: 'Difesa profonda',
        caption:
          'Posto 5 e posto 1 tengono gli angoli di fondo, posto 6 copre il centro: contro la pipe la palla arriva lunga.',
        oppZone: 'pipe',
        ball: { x: 4.5, y: 2.6 },
        spots: {
          p3: { x: 4.5, y: 0.35 },
          p2: { x: 5.9, y: 0.35 },
          p4: { x: 2.0, y: 3.1 },
          p5: { x: 1.1, y: 7.4 },
          p6: { x: 4.6, y: 7.9 },
          p1: { x: 7.9, y: 7.4 },
        },
      },
    ],
  },
]
