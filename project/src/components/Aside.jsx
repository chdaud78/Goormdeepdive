import { CircleDollarSignIcon, Home, ListTodoIcon, UserIcon, UsersIcon } from 'lucide-react'
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
} from '@/components/ui/sidebar.jsx'
import { ROUTES } from '@/lib/routes.js'

export default function Aside() {
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
