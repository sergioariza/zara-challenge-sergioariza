import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from './CartContext'
import type { CartItem } from '../types'

const testItem: CartItem = {
  cartItemId: 'cart-1',
  id: 'APL-I15PM',
  name: 'iPhone 15 Pro Max',
  brand: 'Apple',
  imageUrl: 'http://example.com/img.webp',
  selectedColor: { name: 'Black', hexCode: '#000', imageUrl: 'http://example.com/img.webp' },
  selectedStorage: { capacity: '256 GB', price: 1319 },
}

const testItem2: CartItem = {
  cartItemId: 'cart-2',
  id: 'SMG-S24U',
  name: 'Galaxy S24 Ultra',
  brand: 'Samsung',
  imageUrl: 'http://example.com/img2.webp',
  selectedColor: { name: 'Black', hexCode: '#000', imageUrl: 'http://example.com/img2.webp' },
  selectedStorage: { capacity: '256 GB', price: 1329 },
}

function CartConsumer() {
  const { items, addItem, removeItem, totalItems, totalPrice } = useCart()
  return (
    <div>
      <span data-testid="count">{totalItems}</span>
      <span data-testid="total">{totalPrice}</span>
      <button onClick={() => addItem(testItem)}>Add item 1</button>
      <button onClick={() => addItem(testItem2)}>Add item 2</button>
      <button onClick={() => removeItem('cart-1')}>Remove item 1</button>
      {items.map((item) => (
        <span key={item.cartItemId} data-testid={`item-${item.cartItemId}`}>
          {item.name}
        </span>
      ))}
    </div>
  )
}

function renderCart() {
  return render(
    <CartProvider>
      <CartConsumer />
    </CartProvider>
  )
}

describe('CartContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts with an empty cart', () => {
    renderCart()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('0')
  })

  it('adds an item to the cart', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('Add item 1'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-cart-1')).toBeInTheDocument()
  })

  it('removes an item from the cart', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('Add item 1'))
    await user.click(screen.getByText('Remove item 1'))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.queryByTestId('item-cart-1')).not.toBeInTheDocument()
  })

  it('calculates total price across multiple items', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('Add item 1'))
    await user.click(screen.getByText('Add item 2'))
    expect(screen.getByTestId('total')).toHaveTextContent(String(1319 + 1329))
  })

  it('only removes the item matching the given cartItemId', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('Add item 1'))
    await user.click(screen.getByText('Add item 2'))
    await user.click(screen.getByText('Remove item 1'))
    expect(screen.queryByTestId('item-cart-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('item-cart-2')).toBeInTheDocument()
  })

  it('persists the cart to localStorage', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('Add item 1'))
    const stored = JSON.parse(localStorage.getItem('zara-cart') ?? '[]') as CartItem[]
    expect(stored).toHaveLength(1)
    expect(stored[0].cartItemId).toBe('cart-1')
  })

  it('restores the cart from localStorage on mount', () => {
    localStorage.setItem('zara-cart', JSON.stringify([testItem]))
    renderCart()
    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-cart-1')).toBeInTheDocument()
  })
})
