import Aside from '@/components/Aside.jsx'
import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header.jsx'
import { SidebarProvider } from '@/components/ui/sidebar.jsx'

function Layout({ children }) {
  return (
    <SidebarProvider side="right">
      {/* Header */}
      <div className="w-full flex flex-col min-h-screen">
        <Header />

        {/* Main */}
        <main className="flex-1 flex items-center justify-center p-4">{children}</main>

        <Footer />
      </div>
      <Aside />
    </SidebarProvider>
  )
}

export default Layout
