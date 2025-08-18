// Layout.jsx
import { Outlet } from 'react-router-dom'

import Aside from '@/components/Aside.jsx'
import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header.jsx'
import { SidebarProvider } from '@/components/ui/sidebar.jsx'

function Layout() {
  return (
    <SidebarProvider side="right">
      {/* Header */}
      <div className="w-full flex flex-col min-h-screen">
        <Header />

        {/* Main */}
        <main className="p-4 flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
      <Aside />
    </SidebarProvider>
  )
}

export default Layout
