import { renderHook, waitFor } from '@testing-library/react'
import { usePhones } from './usePhones'
import { getProducts } from '../api/products'
import { productsListFixture } from '../__fixtures__/product-list.fixture'

jest.mock('../api/products', () => ({
  getProducts: jest.fn(),
  getProductById: jest.fn(),
}))

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>

describe('usePhones', () => {
  afterEach(() => jest.clearAllMocks())

  it('starts in loading state', () => {
    mockGetProducts.mockResolvedValue(productsListFixture)
    const { result } = renderHook(() => usePhones(''))
    expect(result.current.loading).toBe(true)
    expect(result.current.phones).toHaveLength(0)
  })

  it('resolves with phones after fetch', async () => {
    mockGetProducts.mockResolvedValue(productsListFixture)
    const { result } = renderHook(() => usePhones(''))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeNull()
    expect(result.current.phones.length).toBeGreaterThan(0)
  })

  it('deduplicates phones with the same id', async () => {
    mockGetProducts.mockResolvedValue(productsListFixture)
    const { result } = renderHook(() => usePhones(''))
    await waitFor(() => expect(result.current.loading).toBe(false))

    const ids = result.current.phones.map((p) => p.id)
    expect(ids.length).toBe(new Set(ids).size)
    // fixture has 20 entries with one duplicate → 19 unique phones
    expect(result.current.phones).toHaveLength(19)
  })

  it('sets error state on fetch failure', async () => {
    mockGetProducts.mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => usePhones(''))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Failed to load phones')
    expect(result.current.phones).toHaveLength(0)
  })

  it('passes the search parameter to the API', async () => {
    mockGetProducts.mockResolvedValue([])
    const { result } = renderHook(() => usePhones('samsung'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(mockGetProducts).toHaveBeenCalledWith({ search: 'samsung', limit: 20 })
  })
})
