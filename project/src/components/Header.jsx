import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-xl font-bold tracking-wide">☁️ React 연습 페이지 모음</h1>

      <nav className="flex gap-4">
        <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
          홈
        </Link>
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">
          깃허브
        </a>
      </nav>
    </header>
  )
}
