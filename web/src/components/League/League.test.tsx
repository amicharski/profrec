import { render } from '@redwoodjs/testing/web'

import League from './League'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('League', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<League />)
    }).not.toThrow()
  })
})
