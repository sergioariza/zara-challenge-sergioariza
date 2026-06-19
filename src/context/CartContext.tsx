import { createContext, useContext, useEffect, useReducer } from 'react'
import type { CartItem } from '../types'

const CART_STORAGE_KEY = 'zara-cart'

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (cartItemId: string) => void
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload]
    case 'REMOVE_ITEM':
      return state.filter((item) => item.cartItemId !== action.payload)
  }
}

function loadCartFromStorage(): CartItem[] {
  const stored = localStorage.getItem(CART_STORAGE_KEY)
  return stored ? (JSON.parse(stored) as CartItem[]) : []
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCartFromStorage)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (cartItemId: string) => dispatch({ type: 'REMOVE_ITEM', payload: cartItemId })
  const totalItems = items.length
  const totalPrice = items.reduce((sum, item) => sum + item.selectedStorage.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
