import React, { useState, useEffect } from 'react';
import StickyNote from './StickyNote';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddOrEdit = () => {
    if (!title && !text) return;
    const newNote = { title, text };
    const updated = [...notes];
    if (editIndex !== null) {
      updated[editIndex] = newNote;
      setEditIndex(null);
    } else {
      updated.push(newNote);
    }
    setNotes(updated);
    setTitle('');
    setText('');
  };

  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setText(notes[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-500 mb-4">Sticky Notes</h1>
      <input
        className="border p-2 mr-2 mb-2 rounded w-60"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        className="border p-2 mr-2 mb-2 rounded w-60"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 mb-2 rounded w-full h-24"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddOrEdit} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        {editIndex !== null ? 'Update' : 'Add Note'}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((note, index) => (
          <StickyNote
            key={index}
            note={note}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
