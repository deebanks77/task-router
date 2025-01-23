import React from "react";
import { getAllTaskApi } from "../../utils/api/task";

function GetAllTask({ ids }) {
  const [tasks, setTasks] = React.useState([]);
  const handleGetAllTask = async () => {
    try {
      const response = await getAllTaskApi({
        pageNumber: 0,
        pageSize: 10,
        workspaceId: ids.workspaceId[0],
      });
      setTasks(response);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <div className="container">
      <h3>Get All task</h3>
      <div>
        <button onClick={handleGetAllTask}>Get All Task</button>
      </div>
      <div>
        {tasks.length > 0
          ? tasks.map((task, index) => (
              <div key={index}>
                <h4>Task Queue: {task.queueId}</h4>
                <h4>WorkflowId: {task.workspaceId}</h4>
                <h4>Task Channel: {task.taskChannelId}</h4>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default GetAllTask;
