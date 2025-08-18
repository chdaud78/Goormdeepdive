// Layout.jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Aside from '@/components/Aside.jsx'
import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header.jsx'

function Layout() {
  const [isAsideOpen, setIsAsideOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <Header onToggleAside={() => setIsAsideOpen((prev) => !prev)} />

      {/* Main */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />

      <Aside isOpen={isAsideOpen} onClose={() => setIsAsideOpen(false)} />
    </div>
  )
}

export default Layout
