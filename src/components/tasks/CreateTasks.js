import React, { useState, useEffect } from "react";

function CreateTask({ handleCreateTask, defaultTask }) {
  const [task, setTask] = useState(defaultTask);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (task.workspaceId === "") {
    //   return;
    // }
    console.log("task", task);
    await handleCreateTask(task);
  };

  const handleNameChange = (event) => {
    setTask((prevTask) => {
      return { ...prevTask, taskChannel: event.target.value };
    });
  };

  useEffect(() => {
    console.log({ defaultTask: defaultTask });

    setTask(defaultTask);
  }, [defaultTask]);

  return (
    <div className="container">
      <h3>Create Task</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Voice task</label>
          <input
            onChange={handleNameChange}
            value={task.taskChannel}
            type="text"
            placeholder="Simplexi Workflow"
          />
        </div>
        <div>
          <button>Create Task</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
