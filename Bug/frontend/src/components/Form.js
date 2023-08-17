//import events from "inquirer/lib/utils/events";
import { useEffect } from "react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, bugs, setBugs, editBug, setEditBug }) => {
  const updateBug = (title, id, completed) => {
    const newBug = bugs.map((bug) =>
      bug.id === id ? { title, id, completed } : bug
    );
    setBugs(newBug);
    setEditBug("");
  };

  useEffect(() => {
    if (editBug) {
      setInput(editBug.title);
    } else {
      setInput("");
    }
  }, [setInput, editBug]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editBug) {
      setBugs([...bugs, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateBug(input, editBug.id, editBug.completed);
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Bug List....."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />

      <button className="button-add" type="submit">
        {editBug ? "OK" : "Add"}
      </button>
    </form>
  );
};

export default Form;
