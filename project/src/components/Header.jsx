import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { token } from '@/api/token.js'
import { SidebarTrigger } from '@/components/ui/sidebar.jsx'
import { ROUTES } from '@/lib/routes.js'

export default function Header() {
  const [authToken, setAuthToken] = useState(token.get())

  useEffect(() => {
    const interval = setInterval(() => {
      setAuthToken(token.get())
    }, 100) // 토큰 변화를 감지
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-xl font-bold tracking-wide">☁️ React 연습 페이지 모음</h1>
      <div>
        {authToken && <Link to={ROUTES.AUTH.MYPAGE}>마이페이지</Link>}
        <SidebarTrigger />
      </div>
    </header>
  )
}
