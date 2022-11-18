import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import Togglable from './components/Togglable'
import Notes from './components/Notes'
import LoginForm from './components/LoginForm'
import NotesForm from './components/NotesForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.jwtToken)
    }
  }, [])

  const handleLogin = async (user) => {
    setUser(user)
  }

  const addNote = async (newNote) => {
    const noteObject = {
      content: newNote.content,
      date: new Date().toISOString(),
      important: newNote.important,
      id: notes.length + 1,
    }

    const savedNote = await noteService.create(noteObject)
    noteFormRef.current.toggleVisibility()
    setNotes(notes.concat(savedNote))
    return savedNote
  }
  const handleErrors = (errorMsg) => {
    if (errorMsg.length) {
      setErrorMessage(errorMsg)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        {user === null ? (
          <Togglable buttonLabel="Login">
            <LoginForm handleLogin={handleLogin} handleErrors={handleErrors} />
          </Togglable>
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <Togglable buttonLabel="Add new note" ref={noteFormRef}>
              <NotesForm createNewNote={addNote} />
            </Togglable>
            <Notes
              handleErrors={handleErrors}
              notes={notes}
              handleUpdateNotes={(updatedNotes) => setNotes(updatedNotes)}
            ></Notes>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default App
