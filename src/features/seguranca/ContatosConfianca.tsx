import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, HeartHandshake } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import {
  MAX_CONTATOS,
  addContato,
  removeContato,
  updateContato,
  useContatosConfianca,
} from '../../store/seguranca'

const inputCls =
  'w-full rounded-xl border border-blush bg-white px-3 py-2 text-sm text-ink placeholder:text-muted/70 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/30'

/** CRUD simples de contatos de confiança (máx. 3), persistido em localStorage. */
export default function ContatosConfianca() {
  const contatos = useContatosConfianca()
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  const startNew = () => {
    setEditing('new')
    setNome('')
    setTelefone('')
    setErro(null)
  }
  const startEdit = (id: string) => {
    const c = contatos.find((x) => x.id === id)
    if (!c) return
    setEditing(id)
    setNome(c.nome)
    setTelefone(c.telefone)
    setErro(null)
  }
  const cancel = () => {
    setEditing(null)
    setErro(null)
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err = editing === 'new' ? addContato(nome, telefone) : updateContato(editing!, nome, telefone)
    if (err) {
      setErro(err)
      return
    }
    cancel()
  }

  const cheio = contatos.length >= MAX_CONTATOS

  return (
    <div className="space-y-3">
      {contatos.length === 0 && editing !== 'new' ? (
        <Card tone="lilac" className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lilac">
            <HeartHandshake className="h-6 w-6" aria-hidden />
          </div>
          <p className="font-semibold text-navy">Você não precisa passar por isso sozinha.</p>
          <p className="mt-1 text-sm text-muted">
            Cadastre até {MAX_CONTATOS} pessoas de confiança. Elas seriam avisadas ao acionar a rede de apoio.
          </p>
          <Button size="sm" className="mt-3" onClick={startNew}>
            <Plus className="h-4 w-4" aria-hidden />
            Adicionar contato
          </Button>
        </Card>
      ) : null}

      {contatos.map((c) =>
        editing === c.id ? (
          <Card key={c.id}>
            <ContatoForm {...{ nome, telefone, setNome, setTelefone, erro, submit, cancel }} label="Salvar" />
          </Card>
        ) : (
          <Card key={c.id} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/25 font-bold text-navy">
              {c.nome.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-navy">{c.nome}</p>
              <p className="text-sm text-muted">{c.telefone}</p>
            </div>
            <button
              type="button"
              aria-label={`Editar ${c.nome}`}
              onClick={() => startEdit(c.id)}
              className="rounded-full p-2 text-navy hover:bg-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
            >
              <Pencil className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={`Remover ${c.nome}`}
              onClick={() => removeContato(c.id)}
              className="rounded-full p-2 text-wine hover:bg-wine/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine/40"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </Card>
        ),
      )}

      {editing === 'new' ? (
        <Card>
          <ContatoForm {...{ nome, telefone, setNome, setTelefone, erro, submit, cancel }} label="Adicionar" />
        </Card>
      ) : contatos.length > 0 ? (
        <div className="flex items-center justify-between">
          <Badge tone="muted">
            {contatos.length}/{MAX_CONTATOS} contatos
          </Badge>
          <Button variant="outline" size="sm" onClick={startNew} disabled={cheio}>
            <Plus className="h-4 w-4" aria-hidden />
            Adicionar
          </Button>
        </div>
      ) : null}
    </div>
  )
}

interface FormProps {
  nome: string
  telefone: string
  setNome: (v: string) => void
  setTelefone: (v: string) => void
  erro: string | null
  submit: (e: FormEvent) => void
  cancel: () => void
  label: string
}

function ContatoForm({ nome, telefone, setNome, setTelefone, erro, submit, cancel, label }: FormProps) {
  return (
    <form onSubmit={submit} className="space-y-2">
      <label className="block text-xs font-semibold text-navy">
        Nome
        <input
          className={`${inputCls} mt-1`}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex.: Maria (irmã)"
          maxLength={40}
          autoFocus
          required
        />
      </label>
      <label className="block text-xs font-semibold text-navy">
        Telefone
        <input
          className={`${inputCls} mt-1`}
          type="tel"
          inputMode="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="(75) 99999-9999"
          maxLength={20}
          required
        />
      </label>
      {erro ? (
        <p role="alert" className="text-xs font-medium text-wine">
          {erro}
        </p>
      ) : null}
      <div className="flex gap-2 pt-1">
        <Button type="submit" size="sm">
          {label}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={cancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
