import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header({ onToggleAside }) {
  return (
    <header className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-xl font-bold tracking-wide">☁️ React 연습 페이지 모음</h1>

      <nav className="flex gap-4">
        <button
          onClick={onToggleAside}
          className="hover:text-gray-300 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
    </header>
  )
}
