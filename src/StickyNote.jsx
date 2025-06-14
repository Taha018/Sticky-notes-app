// StickyNote.jsx
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const StickyNote = ({ note, index, onEdit, onDelete }) => {
  return (
    <div className="relative bg-yellow-200 p-4 rounded-lg shadow-lg w-60 h-60 transform rotate-[-2deg] hover:rotate-0 transition duration-300">
      {/* Edit & Delete Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={() => onEdit(index)} className="text-blue-600 hover:text-blue-800">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(index)} className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
      </div>

      <h2 className="font-bold text-lg mb-2 break-words">{note.title}</h2>
      <p className="text-sm whitespace-pre-wrap break-words">{note.text}</p>
    </div>
  );
};

export default StickyNote;
