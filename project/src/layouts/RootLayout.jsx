import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import Layout from '@/components/Layout.jsx'
import { ThemeContext } from '@/context/ThemeContext.jsx'

export default function RootLayout() {
  const theme = 'dark'

  return (
    <ThemeContext value={theme}>
      <Layout>
        <ErrorBoundary fallback={<p>오류가 발생했습니다.</p>}>
          <Suspense fallback={<div className="p-6">로딩중...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ThemeContext>
  )
}
