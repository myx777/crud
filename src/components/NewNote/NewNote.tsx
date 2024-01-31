import { ReactNode, useState } from "react";
import "./css/newNote.css";
/**
 * This function creates a new note component with a form for adding and submitting notes.
 *
 * @return {JSX.Element} The new note component with a form for adding and submitting notes.
 */
const NewNote = (): ReactNode => {
  const [noteContent, setNoteContent] = useState<string>("");

  const handleNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(event.target.value);
    console.info(event.target.value);
  };
  const loadToApi = async () => {
    try {
      const url: string = "http://localhost:7070/notes";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ content: noteContent }),
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (noteContent !== "") {
      loadToApi();
    }

    setNoteContent("");
  };

  return (
    <div className="new-note-container">
      <h2 className="title-new-note">New Note</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="new-note"
          cols={30}
          rows={10}
          value={noteContent}
          onChange={handleNote}
        ></textarea>
        <button type="submit">Add</button>
      </form>
      <div></div>
    </div>
  );
};

export default NewNote;
