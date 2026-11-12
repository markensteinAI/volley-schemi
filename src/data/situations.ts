import type { Situation } from '../types'

export const SITUATIONS: Situation[] = [
  {
    id: 'ricezione',
    label: 'Ricezione',
    hint: 'Come ci disponiamo sul servizio avversario e come scambiamo dopo il tocco.',
  },
  {
    id: 'difesa',
    label: 'Difesa',
    hint: 'Muro e difesa a seconda della zona da cui attacca l’avversario.',
  },
  {
    id: 'freeball',
    label: 'Free ball',
    hint: 'Palla facile dal campo avversario: riorganizzarsi per attaccare.',
  },
  {
    id: 'copertura',
    label: 'Copertura',
    hint: 'Come ci stringiamo attorno al nostro attaccante contro il muro avversario.',
  },
  {
    id: 'battuta',
    label: 'Battuta',
    hint: 'Disposizione al servizio e rientro verso i posti di difesa.',
  },
]
