import { useState } from "react"

function Exchange() {
  const [amount, setAmount] = useState(1)
  const [rate, setRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRate = async () => {
    try {
      setLoading(true)
      setError(false)

      const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=KRW")
      if (!res.ok) {
        throw new Error("환율 API 응답이 올바르지 않습니다.")
      }

      const data = await res.json()
      const krw = data?.rates?.KRW
      if (typeof krw !== "number") {
        throw new Error("KRW 환율 데이터가 없습니다.")
      }

      setRate(krw)
    } catch (e) {
      setError(e.message || "알 수 없는 오류가 발생했습니다.")
      setRate(null)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await fetchRate()
  }

  const converted = rate ? (amount * rate).toLocaleString() : "-"

  return (
    <div className="container">
      <h1>💱 USD → KRW 환율 계산기</h1>

      <form className="input-group" onSubmit={onSubmit}>
        <label>USD 금액</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="row">
          <button type="submit" disabled={loading}>
            {loading ? "불러오는 중…" : "환율 불러오기"}
          </button>
          <button type="button" onClick={fetchRate} disabled={loading}>
            {loading ? "…" : "새로고침"}
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        {amount} USD = <strong>{converted} KRW</strong>
      </p>
    </div>
  )
}

export default Exchange
