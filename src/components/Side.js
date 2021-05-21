import NotesCard from './NotesCard';
import hangOut from '../assets/img/hangOut.svg';

const Side = ({setInputText, setInputTitle, notes, setNotes, setId, close, toggleSide}) => {

  return (
    <div className="container">
      <div className="side-options"></div>
      {(!notes.length) &&
        <div>
          <img id="sideImg" src={hangOut} alt="hangOut"/>
          <p id="sideMessage" >Nothing Found!</p>
        </div>
      }
      <div>
        {notes.map((note)=> (
          <NotesCard
            note={note}
            key={note.id}
            setInputText={setInputText}
            setInputTitle={setInputTitle}
            setNotes={setNotes}
            notes={notes}
            setId={setId}
            close={close}
            toggleSide={toggleSide}
          />
          ))
        }
      </div>
    </div>
  );
}

export default Side;
