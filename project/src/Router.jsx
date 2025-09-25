import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RootLayout from '@/layouts/RootLayout.jsx'
import { ROUTES } from '@/lib/routes.js'
import AuthLayout from '@/routes/auth/AuthLayout.jsx'
import Login from '@/routes/auth/Login.jsx'
import Mypage from '@/routes/auth/Mypage.jsx'
import Register from '@/routes/auth/Register.jsx'
import Exchange from '@/routes/exchange/Exchange.jsx'
import Home from '@/routes/Home.jsx'
import LiveMember from '@/routes/member/LiveMember.jsx'
import NotFound from '@/routes/NotFound.jsx'
import Guestbook from '@/routes/post/Guestbook.jsx'
import PostView from '@/routes/post/PostView.jsx'
import Practice from '@/routes/practice/Practice.jsx'
import Todo from '@/routes/todo/Todo.jsx'
import User from '@/routes/user/User.jsx'
import UseDeferred from '@/routes/practice/UseDeferred.jsx'
import UseActionState from '@/routes/practice/UseActionState.jsx'

const Profile = lazy(() => import('@/routes/member/Profile.jsx'))

const AppRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.MEMBER.ROOT}>
          <Route path={ROUTES.MEMBER.PROFILE} element={<Profile />} />
          <Route path={ROUTES.MEMBER.LIVE} element={<LiveMember />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
          <Route path={ROUTES.AUTH.MYPAGE} element={<Mypage />} />
        </Route>
        <Route path={ROUTES.TODO.ROOT} element={<Todo />} />
        <Route path={ROUTES.EXCHANGE.ROOT} element={<Exchange />} />
        <Route path={ROUTES.USER.ROOT} element={<User />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice2" element={<UseDeferred />} />
        <Route path="/practice3" element={<UseActionState />} />
        <Route path={ROUTES.POST.ROOT}>
          <Route path={ROUTES.POST.GUESTBOOK} element={<Guestbook />} />
          <Route path={ROUTES.POST.VIEW} element={<PostView />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRouters
