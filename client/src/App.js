// imports
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import NoteForm from './NoteForm'
const App = () => {

  // useState hook (las notas de la lista)
  const [notes, setNotes] = useState([]);

  // funciones del CRUD
  // crear nota
  const addNote = note => {
    axios.post('/api/notes', note)
      .then(res => {
        const newNotes = [res.data, ...notes];
        setNotes(newNotes);
      });
  };

  // update note
  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text
    };
    axios.put('/api/notes/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note =>
          note.id === id ? updatedNote : note
        );
        setNotes(newNotes);
      });
  };

  // delete note
  const removeNote = (id) => {
    axios.delete('/api/notes/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    });
  };

  // render JSX
  return (
    <div>
      <Header title='Notas'/>
      <div className="container mt-3">
        <NoteForm
        addNote={addNote}
        />
      </div>
      <Footer />
    </div>
  );
};

// export
export default App;
