import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserEvent from '@testing-library/user-event'
import NotesForm from './NotesForm'

test('Testing Notes form', async () => {
  const eventHandler = jest.fn()

  render(<NotesForm createNewNote={eventHandler}></NotesForm>)

  const noteField = screen.getByRole('textbox')
  const submitButton = screen.getByText('save')

  await UserEvent.type(noteField, 'This is my first note')
  await UserEvent.click(submitButton)

  expect(eventHandler.mock.calls).toHaveLength(1)
  expect(eventHandler.mock.calls[0][0].content).toBe('This is my first note')
})
