import { ReactNode } from "react";
import NewNote from "./NewNote/NewNote";
import Notes from "./notes/Notes";
/**
 * Render a CRUD component for managing notes.
 *
 * @return {ReactNode} The rendered CRUD component
 */
const Crud = ():ReactNode => {
  return (
    <>
      <Notes />
      <div>
        <NewNote />
      </div>
    </>
  );
};

export default Crud;
