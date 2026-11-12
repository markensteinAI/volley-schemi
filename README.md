# Volley Schemi

Applicazione web che mostra con animazioni come la squadra si muove in campo
nelle varie situazioni di gioco. Si apre con un link, anche dal telefono, senza
registrarsi e senza installare nulla.

Sistema di gioco **5-1**. Interfaccia in italiano.

## Cosa contiene

Cinque situazioni, ciascuna animata fase per fase, con play, pausa e barra per
scorrere il movimento avanti e indietro:

| Situazione | Varianti |
|---|---|
| Ricezione | ricezione a tre |
| Difesa | attacco avversario da posto 4, posto 2, al centro, pipe |
| Free ball | palla facile dal campo avversario |
| Copertura | attacco da posto 4, attacco da posto 2 |
| Battuta | servizio e rientro ai posti di difesa |

Ogni situazione si può vedere nelle rotazioni definite: oggi **P in 1**
(palleggiatore in seconda linea) e **P in 4** (palleggiatore in prima linea).

Da computer compare a fianco del campo un pannello con la descrizione tattica,
l'elenco delle fasi e le note; dal telefono resta solo l'essenziale.

## Avvio in locale

```powershell
npm install
npm run dev
```

L'app si apre su http://localhost:5173.

Per generare la versione pubblicabile:

```powershell
npm run build
```

## Aggiungere schemi e rotazioni

Gli schemi sono dati, non codice: si modificano senza toccare l'applicazione.

- **Nuova rotazione**: aggiungi una voce in `src/data/rotations.ts`, indicando
  quale ruolo occupa ciascun posto di sistema. Le rotazioni mancanti sono P6,
  P5, P3 e P2.
- **Nuovo schema o variante**: aggiungi una voce nel file della situazione in
  `src/data/` (`ricezione.ts`, `difesa.ts`, `freeball.ts`, `copertura.ts`,
  `battuta.ts`).

Le posizioni sono espresse in metri sul campo reale: `x` da 0 (sinistra) a 9
(destra), `y` da 0 (rete) a 9 (linea di fondo). La zona di servizio arriva a
`y` 11,2 e il campo avversario sta sopra la rete, con `y` negative.

Ogni fase contiene la posizione di tutti e sei i giocatori, una didascalia e,
se serve, la posizione della palla e la zona avversaria da evidenziare.

## Pubblicazione

Ogni modifica caricata su `main` viene compilata e pubblicata automaticamente
su GitHub Pages dal workflow in `.github/workflows/deploy.yml`.

## Documentazione

I macro requisiti e le decisioni prese sono in
[docs/requisiti.md](docs/requisiti.md).
