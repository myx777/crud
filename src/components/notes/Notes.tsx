import { FC, useEffect, useState } from "react";
import "./css/notes.css";
import { NoteProps } from "./type/NotesProps";

/**
 * Functional component for managing and displaying notes.
 *
 * @return {JSX.Element} The Notes component
 */

const Notes: FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
console.info(notes);

  const loadFromApi = async () => {
    try {
      const url = "http://localhost:7070/notes";
      let response = await fetch(url);
      let data:NoteProps[] = await response.json();
      setNotes(data);
      console.info("Refresh data...");
      
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const deleteFromApi = async (id: number) => {
    try {
        const url = `http://localhost:7070/notes/${id}`;
        await fetch(url, {
            method: "DELETE",
        });
        setNotes(prevNotes => prevNotes.filter((note) => note.id !== id));
        console.info("Delete data...");
    } catch (error) {
        console.error("Error loading data:", error);
    }
  }
  
  const handleDelete = (id: number) => {
    deleteFromApi(id);
  };

  useEffect(() => {
    loadFromApi();
    console.info("Loading data...");
  }, []);

  return (
    <div className="notes-container">
      <div className="notes-container-header">
      <h1 className="title-notes">Notes</h1>
      <button type="submit" onClick={loadFromApi}>refresh</button>
      </div>
      
      <div className="notes-container-wrapper">
        {notes.map((data) => {
          const { id, content } = data;
          return (
            <div key={id} className="note">
              <div className="note-content">{content}</div>
              <button type="button" onClick={() => handleDelete(id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Notes;
