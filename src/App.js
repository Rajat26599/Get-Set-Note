import React, {useState} from 'react';
import './App.css';

// IMPORTING COMPONETS
import Nav from './components/Nav';
import Side from './components/Side';
import NotesDetail from './components/NotesDetail';

function App() {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

const Home = () => {

  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [id, setId] =useState("");
  const [notes, setNotes] = useState([]);
  const [close, setClose] = useState(true);

  //JAVASCRIPT EVENTS
  const toggleSide = () => {
    if (close) {
      document.getElementsByClassName("sidebar")[0].style.left = "0%";
      document.getElementById("grid-btn").style.marginLeft = "65%";
    }
    else {
      document.getElementsByClassName("sidebar")[0].style.left = "-60%";
      document.getElementById("grid-btn").style.marginLeft = "0%";
    }
    setClose(!close)
  }


  return (
    <div>
      <Nav/>
      <div className="main">
        <div className="sidebar" id="sidebar">
          <Side
            notes={notes}
            setNotes={setNotes}
            setInputText={setInputText}
            setInputTitle={setInputTitle}
            setId={setId}
            close={close}
            toggleSide={toggleSide}
          />
        </div>
        <div className = "notes-detail">
          <NotesDetail
            notes={notes}
            setNotes={setNotes}
            inputText={inputText}
            setInputText={setInputText}
            inputTitle={inputTitle}
            setInputTitle={setInputTitle}
            id={id}
            setId={setId}
            toggleSide={toggleSide}
            close={close}
          />
        </div>
      </div>
    </div>
  );
}
