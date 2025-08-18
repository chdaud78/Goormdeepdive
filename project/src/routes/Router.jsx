import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout.jsx'
import Exchange from '@/pages/Exchange.jsx'
import Main from '@/pages/Main.jsx'
import Todo from '@/pages/Todo.jsx'
import User from '@/pages/User.jsx'

const Routers = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="todo" element={<Todo />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Routers
