import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { fetchReducer, initialState } from '@/util/reducer.js'
import { useEffect, useReducer } from 'react'

const User = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const controller = new AbortController()
    controller.abort()
    const fetchData = async () => {
      dispatch({ type: 'start' })
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error('오류가 발생했습니다.')
        const data = await res.json()
        dispatch({ type: 'success', payload: data })
      } catch (err) {
        dispatch({ type: 'error', payload: err.message })
      }
    }

    fetchData()
  }, [])

  return (
    <div className="card-container flex gap-3 flex-wrap">
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error : {state.error}</p>}
      {state.users &&
        state.users.map((user) => (
          <Card className="w-65" key={user.id}>
            <CardHeader>Users</CardHeader>
            <CardContent>{user.name}</CardContent>
          </Card>
        ))}
    </div>
  )
}

export default User
