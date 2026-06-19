import { renderHook, waitFor } from '@testing-library/react'
import { usePhone } from './usePhone'
import { getProductById } from '../api/products'
import { productDetailFixture } from '../__fixtures__/product-detail.fixture'

jest.mock('../api/products', () => ({
  getProducts: jest.fn(),
  getProductById: jest.fn(),
}))

const mockGetProductById = getProductById as jest.MockedFunction<typeof getProductById>

describe('usePhone', () => {
  afterEach(() => jest.clearAllMocks())

  it('starts in loading state', () => {
    mockGetProductById.mockResolvedValue(productDetailFixture)
    const { result } = renderHook(() => usePhone('APL-I15PM'))
    expect(result.current.loading).toBe(true)
    expect(result.current.phone).toBeNull()
  })

  it('resolves with phone detail after fetch', async () => {
    mockGetProductById.mockResolvedValue(productDetailFixture)
    const { result } = renderHook(() => usePhone('APL-I15PM'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.phone).toEqual(productDetailFixture)
    expect(result.current.error).toBeNull()
  })

  it('calls the API with the provided id', async () => {
    mockGetProductById.mockResolvedValue(productDetailFixture)
    const { result } = renderHook(() => usePhone('APL-I15PM'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(mockGetProductById).toHaveBeenCalledWith('APL-I15PM')
  })

  it('sets error state on fetch failure', async () => {
    mockGetProductById.mockRejectedValue(new Error('Not found'))
    const { result } = renderHook(() => usePhone('INVALID'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Phone not found')
    expect(result.current.phone).toBeNull()
  })
})
