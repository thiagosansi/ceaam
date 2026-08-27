export const QUICK_EXIT_URL =
  'https://www.google.com/search?q=previsao+do+tempo+feira+de+santana'

/** Sai do app imediatamente, substituindo a entrada de histórico atual. */
export function quickExit() {
  try {
    window.history.replaceState(null, '', '/')
  } catch {
    /* ignore */
  }
  window.location.replace(QUICK_EXIT_URL)
}

const ESC_PRESSES = 3
const ESC_WINDOW_MS = 1500

/**
 * Registra atalho: Escape 3x em 1,5s dispara quickExit.
 * Retorna função para remover o listener.
 */
export function registerEscapeShortcut(): () => void {
  let times: number[] = []
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    const now = Date.now()
    times = times.filter((t) => now - t <= ESC_WINDOW_MS)
    times.push(now)
    if (times.length >= ESC_PRESSES) {
      times = []
      quickExit()
    }
  }
  window.addEventListener('keydown', onKey)
  return () => window.removeEventListener('keydown', onKey)
}
