import React, { useState, useEffect } from "react";
import { defaultTaskForm } from "../../utils/defaultData";

function CreateTask({ handleCreateTask, ids }) {
  const [task, setTask] = useState(defaultTaskForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("task", task);
    await handleCreateTask(task);
  };

  const handleNameChange = (event) => {
    setTask((prevTask) => {
      return { ...prevTask, taskChannel: event.target.value };
    });
  };

  useEffect(() => {
    // console.log({ ids: ids });
    setTask((prevTask) => {
      return {
        ...prevTask,
        workflowId: ids.workflowId[0],
        workspaceId: ids.workspaceId[0],
        queueId: ids.queueId[0],
      };
    });
  }, [ids]);

  // useEffect(() => {
  //   console.log({ task: task });
  // }, [task]);

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
