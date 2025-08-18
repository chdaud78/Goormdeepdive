import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Aside from '@/components/Aside.jsx'
import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header.jsx'

function Layout() {
  const [isAsideOpen, setIsAsideOpen] = useState(false) // 기본값 true

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      <div className="w-full flex flex-col flex-1">
        <Header onToggleAside={() => setIsAsideOpen((prev) => !prev)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
      <Aside isOpen={isAsideOpen} />
    </div>
  )
}

export default Layout
