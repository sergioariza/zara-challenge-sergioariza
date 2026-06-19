import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { Navbar } from './Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  beforeEach(() => localStorage.clear())

  it('renders the home link', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /go to home/i })).toBeInTheDocument()
  })

  it('home link points to /', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /go to home/i })).toHaveAttribute('href', '/')
  })

  it('renders the cart link pointing to /cart', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart')
  })

  it('shows 0 items in the cart initially', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /cart, 0 items/i })).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
