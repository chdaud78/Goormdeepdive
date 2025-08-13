import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "@/components/Layout.jsx"
import Main from "@/pages/Main.jsx"
import Todo from "@/pages/Todo.jsx"

const Routers = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Routers
