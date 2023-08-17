import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BugList from "./components/BugList";
import Form from "./components/Form";
import "./App.css";

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("bugs")) || [];
  const [input, setInput] = useState("");

  // const [input, setInput] = useState("initialValue");

  const [bugs, setBugs] = useState(initialState);
  const [editBug, setEditBug] = useState(null);

  useEffect(() => {
    localStorage.setItem("bugs", JSON.stringify(bugs));
  }, [bugs]);
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            bugs={bugs}
            setBugs={setBugs}
            editBug={editBug}
            setEditBug={setEditBug}
          />
        </div>
        <div>
          <BugList bugs={bugs} setBugs={setBugs} setEditBug={setEditBug} />
        </div>
      </div>
    </div>
  );
};

export default App;
