import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const aGet = async (url: string, config = {}) => {
  const response = await api.get(url, config)
  return response.data
}

export const aPost = async (url: string, data: unknown, config = {}) => {
  const response = await api.post(url, data, config)
  return response.data
}

export const aPut = async (url: string, data: unknown, config = {}) => {
  const response = await api.put(url, data, config)
  return response.data
}

export const aPatch = async (url: string, data: unknown, config = {}) => {
  const response = await api.patch(url, data, config)
  return response.data
}

export const aDelete = async (url: string, config = {}) => {
  const response = await api.delete(url, config)
  return response.data
}

export default api