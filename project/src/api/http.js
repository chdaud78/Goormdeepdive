import axios from 'axios'

const BASEURL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '/api'
export const instance = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})
