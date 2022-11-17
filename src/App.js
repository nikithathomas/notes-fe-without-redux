import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notes from './components/Notes'
import LoginForm from './components/LoginForm'
import NotesForm from './components/NotesForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      noteService.setToken(user.jwtToken)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        {user === null ? (
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={(event) => setUsername(event.target.value)}
              handlePasswordChange={(event) => setPassword(event.target.value)}
            />
          </Togglable>
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <Togglable buttonLabel="Add new note" ref={noteFormRef}>
              <NotesForm createNewNote={addNote} />
            </Togglable>
            <Notes
              handleShowAll={() => setShowAll(!showAll)}
              showAll={showAll}
              notesToShow={notesToShow}
              handleToggleImportanceOf={toggleImportanceOf}
            ></Notes>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default App
