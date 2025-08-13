import { Outlet } from "react-router-dom"

import Header from "@/components/Header.jsx"

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <div>사이트 정보</div>
      </footer>
    </>
  )
}
export default Layout
