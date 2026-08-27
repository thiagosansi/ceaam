import type { ReactNode } from 'react'
import { useSeguranca, useDestravado, setDestravado } from '../../store/seguranca'
import Calculator from './Calculator'

interface DisguiseGateProps {
  children: ReactNode
}

/**
 * Quando o modo disfarce está ativo e a sessão ainda não foi destravada,
 * mostra uma calculadora funcional no lugar do app. PIN: 1904 e "=".
 */
export default function DisguiseGate({ children }: DisguiseGateProps) {
  const { disfarceAtivo } = useSeguranca()
  const destravado = useDestravado()

  if (disfarceAtivo && !destravado) {
    return <Calculator onUnlock={() => setDestravado(true)} />
  }
  return <>{children}</>
}
