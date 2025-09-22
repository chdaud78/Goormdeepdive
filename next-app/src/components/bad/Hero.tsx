'use client'
import { useEffect, useMemo, useState } from 'react'
import Client from '@/src/components/bad/Client'
import Image from 'next/image'

async function getTop10() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
  const json = await res.json()
  const sorted = json.items.sort((a: any, b: any) => b.price - a.price).slice(0, 10)
  return sorted.map((p: any) => ({ id: p.id, name: p.name, price: p.price, image: p.image }))
}

export default async function Hero() {
  /*  const [data, setData] = useState<any[]>([])
  const [query, setQuery] = useState('')*/
  const top10 = await getTop10()

  /*useEffect(() => {
    let mounted = true
    fetch('/api/products', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (mounted) setData(d.items)
      })
    return () => {
      mounted = false
    }
  }, [])

  const top10 = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.price - a.price)
    return sorted.slice(0, 10).filter((i) => (query ? i.name.includes(query) : true))
  }, [data, query])*/

  return (
    <section className="section">
      <h2 className="h1 mb-3">/bad – Hero</h2>
      <p className="text-slate-300">클라이언트 fetch + 무거운 계산을 매 렌더마다 수행</p>
      <Client items={top10} />
    </section>
  )
}
