import  { useState } from 'react';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import { Box } from '@chakra-ui/react';
// import { ColorModeProvider } from "@/components/ui/color-mode"


function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
    setIsFormOpen(false); // Close the form after adding a note
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editExistingNote = (note) => {
    setIsFormOpen(true); // Open form for editing
    setEditNote(note);
  };

  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditNote(null);
    setIsFormOpen(false);
  };

  return (
<>


    <div style={{backgroundColor:'black',height:'100vh'}}>
      <Navbar openForm={() => setIsFormOpen(true)} />
      {isFormOpen && (
        <NoteForm addNote={addNote} editNote={editNote} updateNote={updateNote}
        setisFormOpen={setIsFormOpen}
        />
      )}
      <Box display='flex'  gap='1rem' flexWrap='wrap' >
        {notes.map((note) => (
          <Note
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          editExistingNote={editExistingNote}
          />
        ))}
      </Box>
    </div>
  
    </>
  );
}

export default App;