import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { Cart } from './Cart'
import type { CartItem } from '../../types'

const testItem: CartItem = {
  cartItemId: 'cart-1',
  id: 'APL-I15PM',
  name: 'iPhone 15 Pro Max',
  brand: 'Apple',
  imageUrl: 'http://example.com/img.webp',
  selectedColor: { name: 'Titanio Negro', hexCode: '#2C2C2C', imageUrl: 'http://example.com/img.webp' },
  selectedStorage: { capacity: '256 GB', price: 1319 },
}

function renderCart(items: CartItem[] = []) {
  localStorage.setItem('zara-cart', JSON.stringify(items))
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Cart', () => {
  beforeEach(() => localStorage.clear())

  it('shows "Cart (0)" heading when empty', () => {
    renderCart()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cart (0)')
  })

  it('does not show total or pay button when cart is empty', () => {
    renderCart()
    expect(screen.queryByText(/total:/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /pay/i })).not.toBeInTheDocument()
  })

  it('"Continue shopping" links to /', () => {
    renderCart()
    expect(screen.getByRole('link', { name: /continue shopping/i })).toHaveAttribute('href', '/')
  })

  it('shows item count in heading', () => {
    renderCart([testItem])
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cart (1)')
  })

  it('renders item name, variant and price', () => {
    renderCart([testItem])
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
    expect(screen.getByText('256 GB | Titanio Negro')).toBeInTheDocument()
    expect(screen.getByText('1319 EUR')).toBeInTheDocument()
  })

  it('shows the total price when cart has items', () => {
    renderCart([testItem])
    expect(screen.getAllByText('Total: 1319 EUR')[0]).toBeInTheDocument()
  })

  it('shows the pay button when cart has items', () => {
    renderCart([testItem])
    expect(screen.getByRole('button', { name: /pay/i })).toBeInTheDocument()
  })

  it('removes an item when the remove button is clicked', async () => {
    const user = userEvent.setup()
    renderCart([testItem])
    await user.click(screen.getByRole('button', { name: /remove apple iphone 15 pro max from cart/i }))
    expect(screen.queryByText('iPhone 15 Pro Max')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cart (0)')
  })
})
