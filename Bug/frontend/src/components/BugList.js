//import events from "inquirer/lib/utils/events";
//import { useState } from "react";
import React from "react";

const BugList = ({ bugs, setBugs, setEditBug }) => {
  const handleComplete = (bug) => {
    setBugs(
      bugs.map((item) => {
        if (item.id === bug.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const findBug = bugs.find((bug) => bug.id === id);
    setEditBug(findBug);
  };
  const handleDelete = ({ id }) => {
    setBugs(bugs.filter((bug) => bug.id != id));
  };
  return (
    <div>
      {bugs.map((bug) => (
        <li className="list-item" key={bug.id}>
          <input
            type="text"
            value={bug.title}
            className={'list ${bug.completed ? "complete" : ""}'}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              className="button-complete task-button"
              onClick={() => handleComplete(bug)}
            >
              <i className="fa fa-check-circle"></i>
            </button>

            <button
              className="button-edit task-button"
              onClick={() => handleEdit(bug)}
            >
              <i className="fa fa-edit"></i>
            </button>

            <button
              className="button-delete task-button"
              onClick={() => handleDelete(bug)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default BugList;

/* <i class="fa fa-times" aria-hidden="true">
                  <i class="fa-duotone fa-circle-half-stroke"></i> */
