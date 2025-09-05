import { useMemo, useState } from "react";
import { quickSortBy, byNum } from "../utils/sorters.js";

const makeProducts = (n = 100000) =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `Item #${i + 1}`,
    price: Math.floor(Math.random() * 100000), // 0~99999
  }));

export default function PriceSorter() {
  const [data, setData] = useState(() => makeProducts());
  const [tQuick, setTQuick] = useState(null);
  const [tNative, setTNative] = useState(null);

  const avg = useMemo(() => {
    const sum = data.slice(0, 5).reduce((acc, p) => acc + p.price, 0);
    return Math.round(sum / 5);
  }, [data])

  // 여기에 실습 코드 삽입
  const reset = () => {
    setData(makeProducts())
    setTQuick(null)
    setTNative(null)
  }

  const runQuick = () => {
    const tStart = new Date()
    const sorted = quickSortBy(data, byNum((p) => p.price))
    const tEnd = new Date()
    setTNative(null)
    setTQuick(Math.round(tEnd - tStart))
    setData(sorted)
  }

  const runNative = () => {
    const tStart = new Date()
    const sorted = [...data].sort((a,b) => a.price - b.price)
    const tEnd = new Date()
    setTQuick(null)
    setTNative(Math.round(tEnd - tStart))
    setData(sorted)
  }

  return (
    <section className="mx-auto my-6 w-full max-w-[680px]">
      <h2 className="text-2xl font-semibold tracking-tight">
        🛒 상품 가격 정렬기 <span className="text-sm text-gray-500">(퀵 vs Array.sort)</span>
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={reset}
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          title="무작위 데이터 재생성"
        >
          데이터 재생성({data.length.toLocaleString()})
        </button>

        <button
          onClick={runQuick}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          퀵 정렬 실행
        </button>

        <button
          onClick={runNative}
          className="inline-flex items-center rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
        >
          Array.sort 실행
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        샘플(상위 5개) 평균가: <span className="font-medium">₩{avg.toLocaleString()}</span>
        {tQuick && (
          <>
            {" "}
            · <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">퀵 {tQuick}ms</span>
          </>
        )}
        {tNative && (
          <>
            {" "}
            · <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-800">sort {tNative}ms</span>
          </>
        )}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {data.slice(0, 60).map((p) => (
          <div
            key={p.id}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm"
          >
            <div className="font-medium">#{p.id}</div>
            <div className="text-gray-700">₩{p.price.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
        두 방법 모두 평균적으로 <strong>O(n log n)</strong>입니다. 엔진의 <code>Array.sort</code>는
        하이브리드/최적화가 적용되어 일반적으로 매우 빠릅니다.
      </p>
    </section>
  );
}
