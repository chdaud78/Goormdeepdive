import { CircleDollarSignIcon, Home, ListTodoIcon, UserIcon, UsersIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '@/api/auth.js'
import { token } from '@/api/token.js'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.jsx'
import { ROUTES } from '@/lib/routes.js'

export default function Aside() {
  const _token = token.get()
  const navigate = useNavigate()

  const items = [
    {
      title: 'Home',
      url: ROUTES.HOME,
      icon: Home,
    },
    {
      title: 'Profile',
      url: ROUTES.MEMBER.PROFILE,
      icon: UsersIcon,
    },
    {
      title: 'Live Profile',
      url: ROUTES.MEMBER.LIVE,
      icon: UsersIcon,
    },
    {
      title: 'Exchange',
      url: ROUTES.EXCHANGE.ROOT,
      icon: CircleDollarSignIcon,
    },
    {
      title: 'Todo',
      url: ROUTES.TODO.ROOT,
      icon: ListTodoIcon,
    },
    {
      title: 'User',
      url: ROUTES.USER.ROOT,
      icon: UserIcon,
    },
  ]

  const footerItems = [
    {
      title: '회원가입',
      url: ROUTES.AUTH.REGISTER,
    },
    {
      title: '로그인',
      url: ROUTES.AUTH.LOGIN,
    },
  ]

  const handleLogout = async () => {
    try {
      const res = await auth.logout()
      console.log('로그아웃 성공:', res.data)
      token.clear()
      navigate(ROUTES.AUTH.LOGIN)
    } catch (err) {
      console.error('로그아웃 실패:', err)
    }
  }

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-around py-2">
          {_token ? (
            <button
              className="px-4 py-2 rounded-sm border border-red-300
             text-red-700 hover:text-blue-600 hover:border-blue-400
             transition-colors duration-200"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            footerItems.map((item) => (
              <Link
                to={item.url}
                key={item.title}
                className="px-4 py-2 rounded-sm border border-gray-300
             text-gray-700 hover:text-blue-600 hover:border-blue-400
             transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
