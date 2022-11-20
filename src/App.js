import React, {useState, useEffect, createContext, useContext} from 'react';
import './App.css';

// IMPORTING COMPONETS
import Nav from './components/Nav';
import Side from './components/Side';
import NotesDetail from './components/NotesDetail';

export const ThemeContext = createContext(null);

function App() {
;
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme=="light"?"dark":"light");
  }
  return (
    <ThemeContext.Provider value={theme}>
      <div className="App" style={{background:theme}}>
        <Home toggleTheme={toggleTheme}/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;


const Home = (props) => {

  const theme = useContext(ThemeContext);

  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [id, setId] = useState("");
  const [notes, setNotes] = useState([]);
  const [close, setClose] = useState(true);

  // run once when the app starts
  useEffect(() => {
    getLocalNotes();
  }, []);

  useEffect(() => {
    //save to local
    const saveLocalNotes = () => {
        localStorage.setItem("notes", JSON.stringify(notes));
    };
    saveLocalNotes();
  }, [notes]);


  const getLocalNotes = () => {
    if(localStorage.getItem("notes") === null) {
      localStorage.setItem("notes", JSON.stringify([]));
    } else {
      let noteLocal = JSON.parse(localStorage.getItem("notes"));
      setNotes(noteLocal);
    }
  };

  //JAVASCRIPT EVENTS
  const toggleSide = () => {
    if (close) {
      document.getElementById("sidebar").style.left = "0%";
      document.getElementById("grid-btn").style.marginLeft = "65%";
    }
    else {
      document.getElementById("sidebar").style.left = "-60%";
      document.getElementById("grid-btn").style.marginLeft = "0%";
    }
    setClose(!close)
  }


  return (
    <div className={`home-${theme}`}>
      <Nav toggleTheme={props.toggleTheme}/>
      <div className="main">
        <div className={`sidebar-${theme}`} id="sidebar">
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
        <div className={`notes-detail-${theme}`}>
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
