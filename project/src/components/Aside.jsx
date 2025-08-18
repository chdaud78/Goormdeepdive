import { Calendar, Home, Inbox, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  SidebarTrigger,
} from '@/components/ui/sidebar'

export default function Aside() {
  /*return (
    <aside
      className={`
        fixed right-0 top-0 h-full w-64 bg-gray-200 shadow-lg p-4 text-gray-800
        min-h-screen flex flex-col
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <ul className="flex flex-col gap-3 flex-1">
        <li className="hover:bg-gray-300 rounded px-2 py-1 transition-colors">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:bg-gray-300 rounded px-2 py-1 transition-colors">
          <Link to="/todo">TODO 보기</Link>
        </li>
        <li className="hover:bg-gray-300 rounded px-2 py-1 transition-colors">
          <Link to="/exchange">Exchange 보기</Link>
        </li>
      </ul>

      {/!* 닫기 버튼 *!/}
      <button onClick={onClose} className="mb-4 p-2 rounded bg-gray-300 hover:bg-gray-400">
        닫기
      </button>
    </aside>
  )*/

  // Menu items.
  const items = [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'Exchange',
      url: '/exchange',
      icon: Inbox,
    },
    {
      title: 'Todo',
      url: '/todo',
      icon: Calendar,
    },
    {
      title: 'User',
      url: '/user',
      icon: Search,
    },
  ]

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
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}
