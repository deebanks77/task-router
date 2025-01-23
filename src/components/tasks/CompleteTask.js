import React, { useEffect } from "react";
import { completeTaskApi } from "../../utils/api/task";

function CompleteTask({ ids }) {
  const [completeTask, setCompleteTask] = React.useState({});
  const [taskId, setTaskId] = React.useState(ids.taskId || []);

  const handleCompleteTask = async (task) => {
    try {
      const response = await completeTaskApi({
        workspaceId: ids.workspaceId[0],
        taskId: task,
        reason: "Workers are busy at the moment",
      });
      setCompleteTask(response);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    setTaskId(ids.taskId);
  }, [ids]);

  return (
    <div className="container">
      <h3>Complete Task </h3>
      {taskId?.length > 0
        ? taskId?.map((task, index) => (
            <div key={index}>
              <button onClick={() => handleCompleteTask(task)}>
                complete task : {task}
              </button>
            </div>
          ))
        : ""}

      {Object.keys(completeTask).length > 0 ? (
        <div>
          <p>Status: {completeTask?.status}</p>
          <p>Message: {completeTask?.message}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CompleteTask;
