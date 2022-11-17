import Note from './Note'

const Notes = ({
  handleShowAll,
  showAll,
  notesToShow,
  handleToggleImportanceOf,
}) => {
  return (
    <div>
      <div>
        <button onClick={handleShowAll}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => handleToggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Notes
