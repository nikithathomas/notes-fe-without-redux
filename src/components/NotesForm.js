import { useState } from 'react'
import PropTypes from 'prop-types'

const NotesForm = ({ createNewNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleCreateNote = async (event) => {
    event.preventDefault()

    await createNewNote({
      content: newNote,
      important: false,
    })

    setNewNote('')
  }
  return (
    <form onSubmit={handleCreateNote} className="add-note">
      <h2>Create New note</h2>
      <input
        value={newNote}
        className="add-note__note"
        onChange={({ target }) => setNewNote(target.value)}
      />
      <button type="submit" className="add-note__submit">save</button>
    </form>
  )
}

NotesForm.propTypes = {
  createNewNote: PropTypes.func.isRequired,
}
export default NotesForm
