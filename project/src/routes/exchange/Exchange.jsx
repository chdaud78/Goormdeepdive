import { useState } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.jsx'

function Exchange() {
  const [amount, setAmount] = useState(1)
  const [rate, setRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRate = async () => {
    try {
      setLoading(true)
      setError(false)

      const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=KRW')
      if (!res.ok) {
        throw new Error('환율 API 응답이 올바르지 않습니다.')
      }

      const data = await res.json()
      const krw = data?.rates?.KRW
      if (typeof krw !== 'number') {
        throw new Error('KRW 환율 데이터가 없습니다.')
      }

      setRate(krw)
    } catch (e) {
      setError(e.message || '알 수 없는 오류가 발생했습니다.')
      setRate(null)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await fetchRate()
  }

  const converted = rate ? (amount * rate).toLocaleString() : '-'

  return (
    <Card className="w-full max-w-md mx-auto shadow-md rounded-2xl">
      <CardHeader>
        <h1 className="text-xl font-bold text-center">💱 USD → KRW 환율 계산기</h1>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label className="text-sm font-medium text-gray-600">USD 금액</label>
          <input
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <div className="flex gap-2">
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
              type="submit"
              disabled={loading}
            >
              {loading ? '불러오는 중…' : '환율 불러오기'}
            </button>
            <button
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              type="button"
              onClick={fetchRate}
              disabled={loading}
            >
              {loading ? '…' : '새로고침'}
            </button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-lg font-medium">
          {amount} USD = <strong className="text-blue-600">{converted} KRW</strong>
        </p>
      </CardFooter>
    </Card>
  )
}

export default Exchange
