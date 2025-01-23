import React, { useEffect } from "react";
import { getSingleTaskApi } from "../../utils/api/task";

function GetSingleTask({ ids }) {
  const [task, setTask] = React.useState({});
  const [taskId, setTaskId] = React.useState(ids.taskId || []);

  const handleGetTask = async (task) => {
    console.log({ taskId: task, workspaceId: ids.workspaceId[0] });
    try {
      const response = await getSingleTaskApi({
        workspaceId: ids.workspaceId[0],
        taskId: task,
      });
      console.log("handleGetTask response", response);
      setTask(response);
    } catch (error) {
      console.log("something went wrong handleGetTask");
    }
  };

  useEffect(() => {
    setTaskId(ids.taskId);
  }, [ids]);

  useEffect(() => {
    console.log("task", task);
  }, [task]);

  return (
    <div className="container">
      <h3>Get Single task</h3>
      <div className="flex-container ">
        {taskId?.length > 0
          ? taskId?.map((task, index) => (
              <div key={index}>
                <button onClick={() => handleGetTask(task)}>
                  Get Task : {task}
                </button>
              </div>
            ))
          : ""}
      </div>

      <div>
        {Object?.keys(task)?.length > 0 ? (
          <div>
            <h4>Assigment status: {task.assignmentStatus}</h4>
            <h4>Task Queue: {task.queueId}</h4>
            <h4>WorkflowId: {task.workspaceId}</h4>
            <h4>Task Channel: {task.taskChannelId}</h4>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GetSingleTask;
