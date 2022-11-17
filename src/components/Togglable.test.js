import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Togglable from './Togglable'

describe('Testing Togglable', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="Show...">
        <div className="test-div">togglable content</div>
      </Togglable>
    ).container
  })

  test('Is child text present', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start child text is not present', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display:none')
  })

  test('after show button click content is present', async () => {
    const button = screen.getByText('Show...')
    await userEvent.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display:none')
  })

  test('toggle to close content', () => {
    const button = screen.getByText('Show...')
    userEvent.click(button)

    const cancelButton = screen.getByText('Cancel')
    userEvent.click(cancelButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display:none')
  })
})
