import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PhoneList } from './PhoneList'
import { usePhones } from '../../hooks/usePhones'
import { productsListFixture } from '../../__fixtures__/product-list.fixture'

jest.mock('../../hooks/usePhones', () => ({
  usePhones: jest.fn(),
}))

const mockUsePhones = usePhones as jest.MockedFunction<typeof usePhones>

function renderPhoneList() {
  return render(
    <MemoryRouter>
      <PhoneList />
    </MemoryRouter>
  )
}

describe('PhoneList', () => {
  afterEach(() => jest.clearAllMocks())

  it('shows loading state', () => {
    mockUsePhones.mockReturnValue({ phones: [], loading: true, error: null })
    renderPhoneList()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows error message on fetch failure', () => {
    mockUsePhones.mockReturnValue({ phones: [], loading: false, error: 'Failed to load phones' })
    renderPhoneList()
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load phones')
  })

  it('renders a card for each phone returned', () => {
    const phones = productsListFixture.slice(0, 5)
    mockUsePhones.mockReturnValue({ phones, loading: false, error: null })
    renderPhoneList()
    expect(screen.getAllByRole('link')).toHaveLength(5)
  })

  it('renders the correct phone names', () => {
    mockUsePhones.mockReturnValue({ phones: productsListFixture.slice(0, 3), loading: false, error: null })
    renderPhoneList()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    expect(screen.getByText('Galaxy A25 5G')).toBeInTheDocument()
    expect(screen.getByText('Pixel 8a')).toBeInTheDocument()
  })

  it('shows result count in the search bar', () => {
    const phones = productsListFixture.slice(0, 5)
    mockUsePhones.mockReturnValue({ phones, loading: false, error: null })
    renderPhoneList()
    expect(screen.getByText('5 results')).toBeInTheDocument()
  })

  it('does not render the grid while loading', () => {
    mockUsePhones.mockReturnValue({ phones: [], loading: true, error: null })
    renderPhoneList()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
