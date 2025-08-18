import { Link } from 'react-router-dom'

export default function Aside({ isOpen }) {
  return (
    <aside
      className={`
         bg-gray-200 shadow-inner text-gray-800
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0 w-1/6 p-4' : 'translate-x-full w-0 p-0'}
      `}
    >
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
        <li className="hover:bg-gray-300 rounded px-2 py-1 cursor-pointer transition-colors">
          <Link to="/user">User 보기</Link>
        </li>
      </ul>
    </aside>
  )
}
