import { render } from '@redwoodjs/testing/web'

import NewLeaguePage from './NewLeaguePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewLeaguePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewLeaguePage />)
    }).not.toThrow()
  })
})
