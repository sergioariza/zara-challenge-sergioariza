import type { Product, ProductListItem } from '../types'
import apiClient from './client'

interface GetProductsParams {
  search?: string
  limit?: number
  offset?: number
}

const toHttps = (url: string) => url.replace('http://', 'https://')

export const getProducts = async (params?: GetProductsParams): Promise<ProductListItem[]> => {
  const { data } = await apiClient.get<ProductListItem[]>('/products', { params })
  return data.map((item) => ({ ...item, imageUrl: toHttps(item.imageUrl) }))
}

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return {
    ...data,
    colorOptions: data.colorOptions.map((c) => ({ ...c, imageUrl: toHttps(c.imageUrl) })),
    similarProducts: data.similarProducts.map((p) => ({ ...p, imageUrl: toHttps(p.imageUrl) })),
  }
}
