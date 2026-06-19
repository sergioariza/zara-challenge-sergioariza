import { useEffect, useReducer } from 'react'
import { getProductById } from '../api/products'
import type { Product } from '../types'

interface State {
  phone: Product | null
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product }
  | { type: 'FETCH_ERROR' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { phone: action.payload, loading: false, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: 'Phone not found' }
  }
}

const initialState: State = { phone: null, loading: true, error: null }

export function usePhone(id: string) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })

    getProductById(id)
      .then((phone) => dispatch({ type: 'FETCH_SUCCESS', payload: phone }))
      .catch(() => dispatch({ type: 'FETCH_ERROR' }))
  }, [id])

  return state
}
