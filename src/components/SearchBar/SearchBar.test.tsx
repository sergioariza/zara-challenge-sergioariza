import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar value="" onChange={() => {}} resultsCount={0} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar value="apple" onChange={() => {}} resultsCount={0} />)
    expect(screen.getByRole('searchbox')).toHaveValue('apple')
  })

  it('calls onChange with the typed character', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<SearchBar value="" onChange={onChange} resultsCount={0} />)
    await user.type(screen.getByRole('searchbox'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('shows singular result when count is 1', () => {
    render(<SearchBar value="apple" onChange={() => {}} resultsCount={1} />)
    expect(screen.getByText('1 result')).toBeInTheDocument()
  })

  it('shows plural results when count is not 1', () => {
    render(<SearchBar value="" onChange={() => {}} resultsCount={5} />)
    expect(screen.getByText('5 results')).toBeInTheDocument()
  })
})
