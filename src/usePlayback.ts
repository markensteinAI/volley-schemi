import { useCallback, useEffect, useRef, useState } from 'react'

/** Durata di una transizione fra due fasi, in millisecondi. */
const PHASE_MS = 1500

/** Stato della riproduzione di uno schema.
 *
 *  La posizione è un numero continuo: 0 è la prima fase, 1 la seconda e
 *  così via. I valori intermedi sono i momenti in cui i giocatori si stanno
 *  muovendo. Tenerlo continuo è ciò che permette sia il play sia il
 *  trascinamento manuale della barra. */
export function usePlayback(phaseCount: number, speed: number, resetKey: string) {
  const last = Math.max(0, phaseCount - 1)
  const [position, setPosition] = useState(0)
  const [playing, setPlaying] = useState(false)
  const frame = useRef<number>()
  const previous = useRef<number>()

  // Cambiando schema o rotazione si riparte dall'inizio, fermi.
  useEffect(() => {
    setPosition(0)
    setPlaying(false)
  }, [resetKey])

  useEffect(() => {
    if (!playing) {
      previous.current = undefined
      return
    }
    const step = (now: number) => {
      const before = previous.current ?? now
      previous.current = now
      const delta = ((now - before) / PHASE_MS) * speed
      setPosition((current) => {
        const next = current + delta
        if (next >= last) {
          setPlaying(false)
          return last
        }
        return next
      })
      frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [playing, speed, last])

  const toggle = useCallback(() => {
    setPlaying((on) => {
      if (on) return false
      // Premere play quando si è già in fondo fa ripartire da capo.
      setPosition((p) => (p >= last ? 0 : p))
      return true
    })
  }, [last])

  const goTo = useCallback(
    (value: number) => {
      setPlaying(false)
      setPosition(Math.min(Math.max(value, 0), last))
    },
    [last],
  )

  const stepBy = useCallback(
    (delta: number) => {
      setPlaying(false)
      setPosition((current) => {
        const target = delta > 0 ? Math.floor(current + 1e-6) + 1 : Math.ceil(current - 1e-6) - 1
        return Math.min(Math.max(target, 0), last)
      })
    },
    [last],
  )

  return { position, playing, toggle, goTo, stepBy, last }
}
