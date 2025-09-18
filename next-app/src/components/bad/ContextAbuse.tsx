'use client'
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

type Mega = { blob: string; count: number; ts: number; nested: any }
const MegaContext = createContext<Mega | null>(null)

function DeepChild() {
  const mega = useContext(MegaContext)
  return (
    <div className="text-slate-300 text-sm">
      {/*{mega.length}*/}
      {/*context.ts: {mega?.ts} / blob.len: {mega?.blob.length} / count: {mega?.count}*/}
    </div>
  )
}

export default function ContextAbuse() {
  const [text, setText] = useState('')
  const value = useMemo(() => text, [text])

  return (
    <section className="section">
      <h2 className="h2 mb-2">/bad – Context 과사용</h2>
      <p className="text-slate-400 mb-3">입력마다 거대한 Context value 재생성 → 전역 리렌더</p>
      <MegaContext.Provider value={value}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-xl bg-slate-800/70 px-3 py-2"
          placeholder="타이핑 → 전역 리렌더"
        />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="card">
              <DeepChild />
            </div>
          ))}
        </div>
      </MegaContext.Provider>
    </section>
  )
}
