import {useEffect, useState} from "react";
import {BOOKS} from "./data/books.js";

const SearchAutoComplete = () => {
  const [q, setQ] = useState("")
  const [books,setBooks] = useState(BOOKS)
  const [results, setResult] = useState([])

  useEffect(() => {
    setResult(
      books.filter((book) => book.toLowerCase().includes(q.toLowerCase()))
    )
  }, [q, books]);

  const highlight = (title, q) => {
    const index = title.toLowerCase().indexOf(q.toLowerCase())

    const before = title.slice(0, index)
    const match = title.slice(index, index + q.length)
    const after = title.slice(index + q.length)

    return (
      <>
        {before}
        <mark className="bg-yellow-200">{match}</mark>
        {after}
      </>
    )
  }

  return (
    <div className="mx-auto max-w-[560px] p-6">
      <h2 className="mb-3 text-xl font-semibold">검색창 자동완성</h2>
      <label htmlFor="book-search" className="sr-only">
        Search books
      </label>
      <input
        id="book-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="책 제목을 입력하세요…"
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base shadow-sm outline-none ring-0 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />

      <ul className="mt-3 list-none divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white">
        {results.map((title) => (
          <li
            key={title}
            className="px-3 py-2 text-gray-800 hover:bg-gray-50"
          >
            {highlight(title, q)}
          </li>
        ))}
        {q && results.length === 0 && (
          <li className="px-3 py-3 text-sm text-gray-500">검색 결과가 없어요.</li>
        )}
      </ul>

      <p className="mt-2 text-sm text-gray-600">
        현재 구현: 배열 전체를 매번 순회(선형 탐색 O(n)). 데이터가 아주 크면 버벅일 수 있음.
      </p>
    </div>
  );
}

export default SearchAutoComplete