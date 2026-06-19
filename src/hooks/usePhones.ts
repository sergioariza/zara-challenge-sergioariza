import { useEffect, useReducer } from 'react'
import { getProducts } from '../api/products'
import type { ProductListItem } from '../types'

interface State {
  phones: ProductListItem[]
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ProductListItem[] }
  | { type: 'FETCH_ERROR' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS': {
      const seen = new Set<string>()
      const phones = action.payload.filter((p) => {
        if (seen.has(p.id)) return false
        seen.add(p.id)
        return true
      })
      return { phones, loading: false, error: null }
    }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: 'Failed to load phones' }
  }
}

const initialState: State = { phones: [], loading: true, error: null }

export function usePhones(search: string) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })

    getProducts({ search: search || undefined, limit: 20 })
      .then((phones) => dispatch({ type: 'FETCH_SUCCESS', payload: phones }))
      .catch(() => dispatch({ type: 'FETCH_ERROR' }))
  }, [search])

  return state
}
