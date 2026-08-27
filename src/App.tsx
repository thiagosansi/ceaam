import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AppShell from './components/AppShell'
import PhoneFrame from './components/PhoneFrame'
import DisguiseGate from './features/seguranca/DisguiseGate'

// Páginas carregadas sob demanda (code-splitting). AppShell e DisguiseGate ficam síncronos.
const Home = lazy(() => import('./pages/Home'))
const Orientacoes = lazy(() => import('./pages/Orientacoes'))
const OrientacaoDetalhe = lazy(() => import('./pages/OrientacaoDetalhe'))
const Servicos = lazy(() => import('./pages/Servicos'))
const ServicoDetalhe = lazy(() => import('./pages/ServicoDetalhe'))
const RedeApoio = lazy(() => import('./pages/RedeApoio'))
const Agendar = lazy(() => import('./pages/Agendar'))
const MinhaSaude = lazy(() => import('./pages/MinhaSaude'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Ajuda = lazy(() => import('./features/seguranca/Ajuda'))

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-cream" role="status" aria-live="polite">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-blush border-t-wine motion-reduce:animate-none" aria-hidden />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}

const page = (el: React.ReactNode, title: string) => ({
  element: <Suspense fallback={<PageFallback />}>{el}</Suspense>,
  handle: { title },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, ...page(<Home />, 'Início') },
      { path: 'orientacoes', ...page(<Orientacoes />, 'Orientações') },
      { path: 'orientacoes/:id', ...page(<OrientacaoDetalhe />, 'Orientações') },
      { path: 'servicos', ...page(<Servicos />, 'Serviços') },
      { path: 'servicos/:id', ...page(<ServicoDetalhe />, 'Serviços') },
      { path: 'rede-apoio', ...page(<RedeApoio />, 'Rede de apoio') },
      { path: 'sobre', ...page(<Sobre />, 'Sobre o CEAAM') },
      { path: 'ajuda', ...page(<Ajuda />, 'Preciso de ajuda') },
      { path: 'agendar', ...page(<Agendar />, 'Agendar atendimento') },
      { path: 'minha-saude', ...page(<MinhaSaude />, 'Minha saúde') },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return (
    <PhoneFrame>
      <DisguiseGate>
        <RouterProvider router={router} />
      </DisguiseGate>
    </PhoneFrame>
  )
}
