import { SidebarTrigger } from '@/components/ui/sidebar.jsx'

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-xl font-bold tracking-wide">☁️ React 연습 페이지 모음</h1>
      <SidebarTrigger />
    </header>
  )
}
