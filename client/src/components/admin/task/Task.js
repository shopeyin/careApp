import React, { useState } from "react";

import { addTaskToUser } from "./taskFunctions";
function Task({ serviceuserId, taskToggle, remountComponent }) {
  const [taskName, setTaskName] = useState("");


 

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const data = {
      nameOfTask: taskName,
    };

   await addTaskToUser(serviceuserId, data);
    setTaskName("");
    remountComponent();
    taskToggle();
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="form-group">
          <label htmlFor="exampleInputTitle">Task</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="TitleHelp"
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add task
        </button>
      </form>{" "}
    </div>
  );
}

export default Task;
