import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PhoneCard } from './PhoneCard'
import { productsListFixture } from '../../__fixtures__/product-list.fixture'

const phone = productsListFixture[0] // Samsung Galaxy S24 Ultra

function renderCard() {
  return render(
    <MemoryRouter>
      <PhoneCard phone={phone} />
    </MemoryRouter>
  )
}

describe('PhoneCard', () => {
  it('renders phone information', () => {
    renderCard()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText(/1329/)).toBeInTheDocument()
  })

  it('link points to the phone detail page', () => {
    renderCard()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/phone/SMG-S24U')
  })

  it('renders the phone image with descriptive alt text', () => {
    renderCard()
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Samsung Galaxy S24 Ultra')
  })
})
