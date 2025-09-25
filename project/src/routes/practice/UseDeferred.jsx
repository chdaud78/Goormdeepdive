import { useState, useDeferredValue } from 'react'

export default function UseDeferred() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query) // ← 지연 상태

  // 아주 무거운 필터링 작업
  const results = Array.from({ length: 10000 }, (_, i) => `Item ${i}`).filter((item) =>
    item.includes(deferredQuery)
  )

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  )
}
