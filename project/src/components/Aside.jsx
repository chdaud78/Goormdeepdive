// Aside.jsx
import { Link } from 'react-router-dom'

export default function Aside({ isOpen, onClose }) {
  return (
    <aside
      className={`
        fixed right-0 top-0 h-full w-64 bg-gray-200 shadow-lg p-4 text-gray-800
        min-h-screen flex flex-col
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <ul className="flex flex-col gap-3 flex-1">
        <li className="hover:bg-gray-300 rounded px-2 py-1 transition-colors">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:bg-gray-300 rounded px-2 py-1 transition-colors">
          <Link to="/todo">TODO 보기</Link>
        </li>
        <li className="hover:bg-gray-300 rounded px-2 py-1 transition-colors">
          <Link to="/exchange">Exchange 보기</Link>
        </li>
      </ul>

      {/* 닫기 버튼 */}
      <button onClick={onClose} className="mb-4 p-2 rounded bg-gray-300 hover:bg-gray-400">
        닫기
      </button>
    </aside>
  )
}
