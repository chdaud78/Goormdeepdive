'use client'
import React, { useEffect, useState } from 'react'

export default function EffectAbuse() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetch('/api/products?noop=' + Math.random())
      .then((r) => r.json())
      .then(() => {
        if (!cancelled) console.log('fetch done')
      })

    const onScroll = () => setCount((c) => c + 1)
    window.addEventListener('scroll', onScroll)

    return () => {
      cancelled = true
      window.removeEventListener('scroll', onScroll)
    }
  }, []) // [] 없음

  return (
    <section className="section">
      <h2 className="h2 mb-2">/bad – Effect 남용/정리 누락</h2>
      <p className="text-slate-400 mb-3">렌더마다 fetch + 스크롤 리스너 중복 등록</p>
      <div className="card">스크롤할 때마다 count: {count}</div>
    </section>
  )
}
