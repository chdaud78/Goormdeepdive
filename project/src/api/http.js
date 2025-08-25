import axios from 'axios'

const BASEURL = import.meta.env.VITE_API_URL ? '/api' : import.meta.env.VITE_API_URL
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
    console.error(error)
  }
)
