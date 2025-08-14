import { Outlet } from "react-router-dom"

import Aside from "@/components/Aside.jsx"
import Footer from "@/components/Footer.jsx"
import Header from "@/components/Header.jsx"

function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div className="w-5/6 flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
      <Aside />
    </div>
  )
}

export default Layout
