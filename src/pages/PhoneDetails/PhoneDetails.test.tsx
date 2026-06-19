import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { PhoneDetails } from './PhoneDetails'
import { usePhone } from '../../hooks/usePhone'
import { productDetailFixture } from '../../__fixtures__/product-detail.fixture'

jest.mock('../../hooks/usePhone', () => ({
  usePhone: jest.fn(),
}))

const mockUsePhone = usePhone as jest.MockedFunction<typeof usePhone>

function renderPhoneDetails() {
  return render(
    <MemoryRouter initialEntries={['/phone/APL-I15PM']}>
      <CartProvider>
        <Routes>
          <Route path="/phone/:id" element={<PhoneDetails />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  )
}

describe('PhoneDetails', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => jest.clearAllMocks())

  it('shows loading state', () => {
    mockUsePhone.mockReturnValue({ phone: null, loading: true, error: null })
    renderPhoneDetails()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows error state', () => {
    mockUsePhone.mockReturnValue({ phone: null, loading: false, error: 'Phone not found' })
    renderPhoneDetails()
    expect(screen.getByRole('alert')).toHaveTextContent('Phone not found')
  })

  it('renders the phone name as heading', () => {
    mockUsePhone.mockReturnValue({ phone: productDetailFixture, loading: false, error: null })
    renderPhoneDetails()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('iPhone 15 Pro Max')
  })

  it('shows "From X EUR" before storage is selected', () => {
    mockUsePhone.mockReturnValue({ phone: productDetailFixture, loading: false, error: null })
    renderPhoneDetails()
    expect(screen.getByText(`From ${productDetailFixture.basePrice} EUR`)).toBeInTheDocument()
  })

  it('updates the price when a storage option is selected', async () => {
    const user = userEvent.setup()
    mockUsePhone.mockReturnValue({ phone: productDetailFixture, loading: false, error: null })
    renderPhoneDetails()
    await user.click(screen.getByRole('button', { name: '256 GB' }))
    expect(screen.getByText(`${productDetailFixture.storageOptions[0].price} EUR`)).toBeInTheDocument()
  })

  it('"Add to cart" is disabled when no selectors are set', () => {
    mockUsePhone.mockReturnValue({ phone: productDetailFixture, loading: false, error: null })
    renderPhoneDetails()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled()
  })

  it('"Add to cart" is enabled when both storage and color are selected', async () => {
    const user = userEvent.setup()
    mockUsePhone.mockReturnValue({ phone: productDetailFixture, loading: false, error: null })
    renderPhoneDetails()
    await user.click(screen.getByRole('button', { name: '256 GB' }))
    await user.click(screen.getByRole('button', { name: 'Titanio Negro' }))
    expect(screen.getByRole('button', { name: /add to cart/i })).not.toBeDisabled()
  })

  it('renders the specifications section with data', () => {
    mockUsePhone.mockReturnValue({ phone: productDetailFixture, loading: false, error: null })
    renderPhoneDetails()
    expect(screen.getByRole('region', { name: /technical specifications/i })).toBeInTheDocument()
    expect(screen.getByText(productDetailFixture.specs.processor)).toBeInTheDocument()
  })
})
