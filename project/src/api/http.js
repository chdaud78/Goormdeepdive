import axios from 'axios'

import { token } from '@/api/token.js'

const BASEURL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '/api'
export const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 로그인 시도 실패, 토큰 정보 삭제
    if (error.response?.status === 401) {
      token.clear()
    }

    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  (config) => {
    const t = token.get()
    if (config.auth !== false && t) {
      config.headers.Authorization = `Bearer ${t}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export async function http(url, { method = 'GET', body, withAuth } = {}) {
  try {
    const res = await api.request({
      url,
      method,
      data: body,
      withAuth,
    })
    return res.data
  } catch (err) {
    const res = err.response
    const data = res?.data || {}

    const error = new Error(data?.error?.message || data?.message || 'Request failed')
    error.data = data
    error.status = res?.status
    throw error
  }
}
