import { api } from '@/api/http.js'
import { token } from '@/api/token.js'

export const auth = {
  login: async (payload, opts) => {
    const response = await api.post('/auth/login', payload, { auth: false })
    response.token ? token.set(response.token) : token.clear()
    return response
  },
}
