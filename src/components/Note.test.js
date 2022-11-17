import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const { container } = render(<Note note={note}></Note>)

  const noteElem = container.querySelector('.note')

  expect(noteElem).toHaveTextContent(note.content)
})

test('clicking button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler}></Note>)

  const button = screen.getByText('make not important')
  await userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
