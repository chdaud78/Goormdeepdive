import { useEffect, useMemo, useState } from 'react'
import { useActionState } from 'react'

/* ──────────────────────────────────────────────
   Fake API (Pattern 3): localStorage + delay + (optional) random error
────────────────────────────────────────────── */
const KEY = 'app:todos'

function readTodos() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}
function writeTodos(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr))
}

// 통신 지연 유틸
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

// POST /api/todos 를 흉내냄
async function fakePOSTTodo(body) {
  await sleep(400 + Math.random() * 500) // 400~900ms 랜덤 지연
  if (Math.random() < 0.05) {
    throw new Error('Temporary failure (fake)')
  }
  const list = readTodos()
  const next = [...list, body.todo]
  writeTodos(next)
  return {
    ok: true,
    status: 201,
    async json() {
      return body.todo
    },
  }
}

// useActionState 액션
async function addTodoClient(prev, formData) {
  const todo = String(formData.get('todo') ?? '').trim()
  if (!todo) return prev
  try {
    const res = await fakePOSTTodo({ todo })
    const saved = await res.json()
    return [...prev, saved]
  } catch (e) {
    // 실패 시 기존 상태 유지
    return prev
  }
}

export default function UseActionState() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return (
      <form className="flex items-center gap-2">
        <input
          name="todo"
          placeholder="할 일을 입력..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-0 placeholder:text-slate-500 focus:border-slate-400"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          disabled
        >
          로딩...
        </button>
      </form>
    )
  }

  // 2) 마운트 이후에만 localStorage에서 초기값을 읽음
  const initial = useMemo(() => readTodos(), [])

  const [todos, formAction, isPending] = useActionState(addTodoClient, initial)

  return (
    <>
      <form action={formAction} className="flex items-center gap-2">
        <input
          name="todo"
          placeholder="할 일을 입력..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 outline-none ring-0 placeholder:text-slate-500 focus:border-slate-400"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isPending ? '추가 중...' : '추가하기'}
        </button>
      </form>

      <ul className="mt-4 divide-y divide-slate-800 overflow-hidden rounded-lg border border-slate-800">
        {todos.length === 0 && <li className="p-4 text-slate-400">아직 할 일이 없어요.</li>}
        {todos.map((t, i) => (
          <li key={`${t}-${i}`} className="p-4 hover:bg-slate-900/60">
            <div className="flex items-center justify-between">
              <span>{t}</span>
              <span className="text-xs text-slate-500">#{i + 1}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
