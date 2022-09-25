// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import { getSortedList } from '../lib/data';
import {getStaticProps} from '../pages/index'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Star Wars Characters/i,
    })
    expect(heading).toBeInTheDocument()

  })
});
