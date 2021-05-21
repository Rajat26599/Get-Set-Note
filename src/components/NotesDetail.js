const NotesDetail = ({inputText, setInputText, inputTitle, setInputTitle, notes, setNotes, displayNote, id, setId, close, toggleSide}) => {

  const submitHandler = () => {
    if (inputText || inputTitle) {
      const newCopyNotes = [...notes];
      newCopyNotes.splice(0, 0, {
        title: inputTitle,
        text: inputText,
        id: Math.random() * 1000
      });
      setNotes([...newCopyNotes]);
      if (close) toggleSide();
    } else {
      alert("Notes are Empty. Type something in the textarea.");
    }
    setInputText("");
    setInputTitle("");
    setId("");
  };

  const resetHandler = () => {
    if ((inputText==="" && inputTitle==="") || id!=="") {
      setInputText("");
      setInputTitle("");
      setId("");
    }
    else {
      if (window.confirm("Are you sure? Unsaved work will be lost.")) {
        setInputText("");
        setInputTitle("");
        setId("");
      } else {
        return
      }
    }
  }

  const updateHandler = () => {

    if (inputText || inputTitle) {
      const newCopyNotes = notes.filter(el => el.id !== id);
      setNotes([
        { title: inputTitle, text: inputText, id: Math.random() * 1000 },
        ...newCopyNotes
      ]);
    } else {
      alert('Notes are Empty. Type something in textarea.');
    }
    setInputText('');
    setInputTitle('');
    setId('');

    if (close) toggleSide();
  }


  return (
    <div className="container">
      <div>
        <button id="grid-btn" onClick={toggleSide}>
          <i className="fas fa-border-all"></i>
        </button>
      </div>
      <div className="add-update-reset">
        {(id===""?
        <button
          id="add-btn"
          onClick={submitHandler}>
          Add
        </button>
        :
        <button
          id="update-btn"
          onClick={updateHandler}>
          Update
        </button>
        )}
        <button
          id="reset-btn"
          onClick={resetHandler}>
          Reset
        </button>
      </div>
      <h4><textarea
        id="titlearea"
        value={inputTitle}
        onChange={(e)=>setInputTitle(e.target.value)}
        placeholder="Title"
      /></h4>
      <div>
        <textarea
          id="textarea"
          value={inputText}
          onChange={(e)=>setInputText(e.target.value)}
          placeholder="Type the notes here..."
        />
      </div>
      <p id="footerCredits">Made with ❤️ by Rajat Saxena</p>
    </div>
  );
}

export default NotesDetail;
