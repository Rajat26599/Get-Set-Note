import { useContext } from "react";
import { ThemeContext } from "../App";

const NotesCard = ({setInputText, setInputTitle, setNotes, notes, note, setId, close, toggleSide}) => {

  const theme = useContext(ThemeContext);

  const displayHandler = () => {
    setInputText(note.text);
    setInputTitle(note.title);
    setId(note.id);
    if (window.screen.width < 600) {
      if (!close) toggleSide();
    }
  }
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      setNotes(notes.filter((el) => el.id !== note.id));
    }
  };

  return (
    <div className="notes">
      <div className="notes-card">
        <div className="card-options">
          <button id="trash-btn" onClick={deleteHandler}>
            <i className={`trash-${theme} fas fa-trash`}></i>
          </button>
        </div>
        <div onClick={displayHandler}>
          <h5 id="note-title" className={`note-title-${theme}`}>
            {note.title.length>30
              ?note.title.substring(0,30)+"..."
              :note.title}
          </h5>
          <p id="note-content" className={`note-content-${theme}`}>
            {note.text.length>150
              ?note.text.substring(0,150)+"..."
              :note.text}
          </p>
        </div>
      </div>

    </div>
  );
};

export default NotesCard;
