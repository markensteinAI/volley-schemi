# Volley Schemi — Macro requisiti

Documento di partenza, scritto il 2026-11-12. Fissa cosa fa l'applicazione e cosa
non fa, prima di scrivere codice. Va aggiornato quando le decisioni cambiano.

## 1. Obiettivo

Applicazione web che mostra, con animazioni, come la squadra si muove in campo
dalle posizioni base nelle diverse situazioni di gioco. Serve a far capire ai
compagni *dove andare e perché*, senza lavagnetta e senza spiegazioni a voce
ripetute ogni allenamento.

## 2. Utenti

| Chi | Cosa fa |
|---|---|
| Autore (Marco) | Definisce gli schemi nei file del progetto e pubblica |
| Squadra | Apre un link e consulta. Sola lettura, niente registrazione |

## 3. Decisioni prese

| Tema | Scelta |
|---|---|
| Autori degli schemi | Solo l'autore, schemi come file nel repository |
| Architettura | Sito statico: nessun server, nessun database, nessun costo |
| Sistema di gioco | 5-1 |
| Identificazione giocatori | Sigla del ruolo: P, O, C1, C2, S1, S2, L |
| Rotazioni | Struttura pronta per tutte e sei, partiamo definendone due |
| Animazione | A fasi, con play, pausa e scorrimento manuale |
| Dispositivo | Telefono come riferimento, desktop con informazioni aggiuntive |
| Pubblicazione | Repository pubblico su GitHub, sito su GitHub Pages |
| Lingua | Italiano |

## 4. Cosa si vede a schermo

- Il nostro campo per intero, con le sei zone di riferimento.
- Una striscia del campo avversario, dove si accende la zona da cui arriva
  l'attacco o la free ball. Gli avversari non sono rappresentati uno per uno:
  conta da dove arriva la palla, non come sono disposti loro.
- Sette dischetti con la sigla del ruolo. Il libero è visivamente distinto.
- Una scia tratteggiata che indica il percorso di chi si sta spostando.
- Una didascalia che spiega la fase corrente in una frase.

## 5. Situazioni di gioco coperte

1. **Ricezione** — disposizione di ricezione e movimenti verso le posizioni di
   partenza dell'azione.
2. **Difesa su attacco avversario** — con varianti per zona di attacco:
   zona 4, zona 3, zona 2, pipe.
3. **Free ball** — palla facile dal campo avversario: il palleggiatore in
   seconda linea sale subito in zona 2-3, gli altri si riposizionano per
   l'attacco.
4. **Copertura dell'attacco** — come ci si stringe attorno al proprio
   attaccante contro il muro avversario.
5. **Battuta e transizione** — disposizione al servizio e rientro verso le
   posizioni di difesa.

Ogni situazione esiste per ciascuna rotazione, perché i movimenti cambiano a
seconda di dove si trova il palleggiatore.

## 6. Come si naviga

**Da telefono**: si sceglie la situazione, poi la rotazione, poi l'eventuale
variante (per esempio la zona da cui attacca l'avversario). Sotto il campo
stanno i comandi di riproduzione e la didascalia della fase.

**Da computer**: campo più grande con, a fianco, un pannello con la descrizione
completa dello schema, l'elenco delle fasi cliccabili, la legenda dei ruoli e le
note tattiche che sul telefono resterebbero di troppo.

## 7. Comportamento dell'animazione

- Uno schema è una sequenza di fasi; ogni fase ha una posizione per ogni ruolo,
  una didascalia e una durata.
- Comandi: play, pausa, fase precedente e successiva, barra di scorrimento per
  muoversi avanti e indietro a mano, ritorno alla posizione base.
- Tra una fase e l'altra i giocatori si spostano con movimento continuo, non a
  salti, così si legge chi incrocia chi.
- Chi non si muove in una fase resta fermo e in secondo piano, per far risaltare
  chi invece si sposta.

## 8. Come sono fatti i dati degli schemi

Ogni schema è una voce in un file del progetto, con questa forma:

- identificativo e titolo leggibile
- situazione, rotazione, variante
- descrizione tattica estesa (mostrata da computer)
- elenco ordinato di fasi; ogni fase contiene la posizione in campo di tutti e
  sette i ruoli, la didascalia e la durata

Le posizioni sono espresse in metri sul campo reale (9 x 9 più la zona di
servizio), non in pixel: il disegno si adatta poi allo schermo. Aggiungere uno
schema nuovo significa aggiungere una voce a questo file, senza toccare il resto
dell'applicazione.

## 9. Scelte tecniche

- Interfaccia costruita con React e TypeScript, compilata con Vite.
- Campo e giocatori disegnati in grafica vettoriale: nitidi a ogni dimensione di
  schermo e animabili senza librerie aggiuntive.
- Nessuna dipendenza oltre a React: meno cose da aggiornare nel tempo.
- Pubblicazione automatica su GitHub Pages a ogni modifica caricata su GitHub.

## 10. Fuori scope della prima versione

Cose deliberatamente escluse, da non implementare senza una decisione esplicita:

- Editor per creare o modificare schemi dall'applicazione.
- Salvataggio di schemi personali, account, login.
- Rappresentazione individuale dei giocatori avversari.
- Statistiche, risultati, gestione della rosa o delle presenze.
- Video, sovrapposizione su filmati di partite.
- Esportazione in PDF o come immagine da condividere.

## 11. Assunzioni da confermare

- Nome del progetto e del repository: `volley-schemi`.
- Le due rotazioni di partenza: palleggiatore in zona 1 (seconda linea) e
  palleggiatore in zona 4 (prima linea), perché coprono i due casi che cambiano
  di più i movimenti.
- Il libero è sempre presente in campo negli schemi di ricezione e difesa, e
  assente negli schemi di battuta della prima linea.
