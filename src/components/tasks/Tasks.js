import React, { useState, useEffect } from "react";
import CreateTask from "./CreateTasks";
import CancleTask from "./CancleTask";
import CompleteTask from "./CompleteTask";
import GetSingleTask from "./GetSingleTask";
import GetAllTask from "./GetAllTask";
import { defaultTaskForm } from "../../utils/defaultData";

function Task({ handleCreateTask, ids }) {
  const [taskForm, setTaskForm] = useState(defaultTaskForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleCreateTask(taskForm);
  };

  const handleNameChange = (event) => {
    setTaskForm((prevTask) => {
      return { ...prevTask, taskChannel: event.target.value };
    });
  };

  useEffect(() => {
    setTaskForm((prevTask) => {});
  }, [ids]);

  return (
    <div className="container">
      <h3>Create Task</h3>
      <CreateTask
        handleCreateTask={handleCreateTask}
        taskForm={taskForm}
        ids={ids}
      />

      {/* <GetAllTask ids={ids} /> */}

      <GetSingleTask ids={ids} />

      <CompleteTask ids={ids} />

      <CancleTask ids={ids} />
    </div>
  );
}

export default Task;
