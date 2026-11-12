import type { Scheme } from '../types'

/** Copertura dell'attacco: dove stare quando il muro avversario respinge
 *  la palla nel nostro campo. Vale per tutte le rotazioni, perché dipende
 *  da chi attacca e non da chi è in campo. */
export const COPERTURA: Scheme[] = [
  {
    id: 'copertura-posto4',
    situation: 'copertura',
    variant: 'Attacco da posto 4',
    description:
      'Il nostro schiacciatore attacca da sinistra. Gli altri cinque si stringono a semicerchio attorno a lui: la palla respinta dal muro cade quasi sempre a pochi metri dalla rete.',
    notes: [
      'La copertura si prende prima che l’attaccante colpisca, non dopo: se ci si muove al momento del muro si arriva tardi.',
      'Il primo anello è corto, a due o tre metri dall’attaccante; il secondo anello copre il rimbalzo lungo.',
      'Il palleggiatore, dopo aver alzato, è il più vicino: è sempre parte della copertura.',
    ],
    phases: [
      {
        label: 'Alzata a posto 4',
        caption:
          'La palla va a sinistra. Lo schiacciatore parte in rincorsa, gli altri sono ancora sparsi.',
        ball: { x: 2.4, y: 1.0 },
        spots: {
          p4: { x: 1.4, y: 2.4 },
          p3: { x: 4.5, y: 1.3 },
          p2: { x: 7.8, y: 1.8 },
          p1: { x: 7.2, y: 4.0 },
          p6: { x: 4.6, y: 6.4 },
          p5: { x: 1.6, y: 5.8 },
        },
      },
      {
        label: 'Copertura stretta',
        caption:
          'Tutti si stringono attorno all’attaccante formando un semicerchio: il centrale rientra, la seconda linea sale, il posto 2 scivola verso il centro.',
        ball: { x: 1.5, y: 0.6 },
        spots: {
          p4: { x: 1.4, y: 1.2 },
          p3: { x: 3.0, y: 2.0 },
          p2: { x: 7.0, y: 2.6 },
          p1: { x: 5.4, y: 4.0 },
          p6: { x: 3.2, y: 4.4 },
          p5: { x: 1.2, y: 3.2 },
        },
      },
      {
        label: 'Palla recuperata',
        caption:
          'Se la copertura funziona la palla resta in gioco: si rialza al centro e si riparte con un secondo attacco.',
        ball: { x: 3.4, y: 2.6 },
        spots: {
          p4: { x: 1.4, y: 2.2 },
          p3: { x: 4.2, y: 1.6 },
          p2: { x: 7.4, y: 2.0 },
          p1: { x: 6.4, y: 4.2 },
          p6: { x: 4.4, y: 5.4 },
          p5: { x: 1.6, y: 4.6 },
        },
      },
    ],
  },
  {
    id: 'copertura-posto2',
    situation: 'copertura',
    variant: 'Attacco da posto 2',
    description:
      'Stessa logica sul lato opposto: attacca l’opposto da destra e il semicerchio si forma attorno a lui.',
    notes: [
      'Il palleggiatore, che ha appena alzato da zona 2, è il primo a doversi abbassare: è a un metro dall’attaccante.',
      'Il posto 4 attraversa verso il centro: è il movimento che più spesso viene dimenticato.',
      'Chi copre non salta e non resta in piedi: si sta bassi, con le braccia pronte.',
    ],
    phases: [
      {
        label: 'Alzata a posto 2',
        caption: 'La palla va a destra. L’opposto parte in rincorsa dalla banda.',
        ball: { x: 6.6, y: 1.0 },
        spots: {
          p2: { x: 7.8, y: 2.4 },
          p3: { x: 4.5, y: 1.3 },
          p4: { x: 1.4, y: 1.8 },
          p1: { x: 7.4, y: 5.4 },
          p6: { x: 4.6, y: 6.4 },
          p5: { x: 1.8, y: 5.6 },
        },
      },
      {
        label: 'Copertura stretta',
        caption:
          'Semicerchio attorno all’opposto: il centrale e il posto 4 scivolano verso destra, la seconda linea sale a coprire il rimbalzo lungo.',
        ball: { x: 7.6, y: 0.6 },
        spots: {
          p2: { x: 7.6, y: 1.2 },
          p3: { x: 6.0, y: 2.0 },
          p4: { x: 2.2, y: 2.8 },
          p1: { x: 7.8, y: 3.4 },
          p6: { x: 5.6, y: 4.4 },
          p5: { x: 3.6, y: 4.6 },
        },
      },
      {
        label: 'Palla recuperata',
        caption:
          'Palla rialzata al centro: si riparte, con il posto 4 che è già in posizione per il secondo attacco.',
        ball: { x: 5.6, y: 2.6 },
        spots: {
          p2: { x: 7.6, y: 2.2 },
          p3: { x: 4.8, y: 1.6 },
          p4: { x: 1.6, y: 2.2 },
          p1: { x: 7.6, y: 4.4 },
          p6: { x: 4.8, y: 5.4 },
          p5: { x: 2.6, y: 5.0 },
        },
      },
    ],
  },
]
