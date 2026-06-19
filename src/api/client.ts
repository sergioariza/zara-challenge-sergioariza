import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://prueba-tecnica-api-tienda-moviles.onrender.com',
})

apiClient.interceptors.request.use((config) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore — import.meta is valid in Vite (ESM); suppressed for CommonJS type-checking in Jest
  config.headers['x-api-key'] = import.meta.env.VITE_API_KEY
  return config
})

export default apiClient
