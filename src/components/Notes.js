import { useState } from 'react'

import noteService from '../services/notes'
import Note from './Note'

const Notes = ({ handleErrors, handleUpdateNotes, notes }) => {
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        handleUpdateNotes(
          notes.map((note) => (note.id !== id ? note : returnedNote))
        )
      })
      .catch(() => {
        handleErrors(`Note '${note.content}' was already removed from server`)
        handleUpdateNotes(notes.filter((n) => n.id !== id))
      })
  }
  return (
    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Notes
