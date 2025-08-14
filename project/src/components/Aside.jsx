import { Link } from "react-router-dom"

export default function Aside() {
  return (
    <aside className="w-1/6 bg-gray-200 shadow-inner p-4 text-gray-800">
      <ul className="flex flex-col gap-3">
        <li className="hover:bg-gray-300 rounded px-2 py-1 cursor-pointer transition-colors">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:bg-gray-300 rounded px-2 py-1 cursor-pointer transition-colors">
          <Link to="/todo">TODO 보기</Link>
        </li>
        <li className="hover:bg-gray-300 rounded px-2 py-1 cursor-pointer transition-colors">
          <Link to="/exchange">Exchange 보기</Link>
        </li>
      </ul>
    </aside>
  )
}
