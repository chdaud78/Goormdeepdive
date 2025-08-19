import { useEffect, useReducer } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { fetchReducer, initialState } from '@/utils/reducer.js'

const User = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const controller = new AbortController()
    controller.abort()

    const fetchData = async () => {
      dispatch({ type: 'start' })
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
          throw new Error('오류가 발생했습니다.')
        }
        const data = await res.json()
        dispatch({ type: 'success', payload: data })
      } catch (err) {
        dispatch({ type: 'error', payload: err.message })
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error : {state.error}</p>}
      {state.users &&
        state.users.map((user) => (
          <Card key={user.id}>
            <CardHeader>Users</CardHeader>
            <CardContent>{user.name}</CardContent>
          </Card>
        ))}
    </div>
  )
}

export default User
