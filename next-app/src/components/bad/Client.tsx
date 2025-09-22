'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

export default function Client({ items }: { items: any }) {
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const sorted = [...items].sort((a, b) => b.price - a.price)
    return sorted.filter((i: any) => (query ? i.name.includes(query) : true))
  }, [items, query])

  return (
    <>
      <input
        className="mt-4 w-full rounded-xl bg-slate-800/70 px-3 py-2 outline-none"
        placeholder="검색(입력 시 매번 무거운 계산)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid-3 mt-6">
        {list.map((p: any, idx: number) => (
          <div key={p.id} className="card">
            <Image
              src={p.image}
              alt={p.name}
              width={1200}
              height={800}
              className="rounded-xl w-full h-48 object-cover"
              priority={idx === 0}
            />
            <div className="mt-3 font-semibold">{p.name}</div>
            <div className="text-slate-400">{p.price.toLocaleString()}원</div>
          </div>
        ))}
      </div>
    </>
  )
}
