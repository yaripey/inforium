import { useState, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

import "./App.css";

import { Note, ContextState } from "./types";

import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";

const testNotes: Array<Note> = [
  {
    id: "1",
    text: "Test note",
    createdAt: Date.now(),
  },
  {
    id: "2",
    text: "Another Test Note",
    createdAt: Date.now(),
  },
  {
    id: "3",
    text: "The bestest note out there",
    createdAt: Date.now(),
  },
];

export const Context = createContext<ContextState | undefined>(undefined);

function App() {
  const [notes, setNotes] = useState(testNotes);

  const context: ContextState = {
    removeNote: (id: string): void => {
      const newNotes = notes.filter(n => n.id !== id);
      setNotes(newNotes);
    },

    saveNote: (text: string): void => {
      const newNote: Note = {
        id: uuidv4(),
        text: text,
        createdAt: Date.now(),
      }

      setNotes([...notes, newNote]);
    },
  }

  return (
    <Context.Provider value={context}>
      <div className="app-container">
        <div>Hello world!</div>

        <NoteForm />
        <NoteList notes={notes} />

        <nav className="nav-bar">
          <ul>
            <li>Home</li>
            <li>Search</li>
            <li>Calendar</li>
            <li>Settings</li>
          </ul>
        </nav>
      </div>
    </Context.Provider>
  )
}

export default App
