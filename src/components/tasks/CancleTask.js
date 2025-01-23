import React, { useEffect } from "react";
import { cancleTaskApi } from "../../utils/api/task";

function CancleTask({ ids }) {
  const [cancleTask, setCancleTask] = React.useState({});
  const [taskId, setTaskId] = React.useState(ids.taskId || []);

  const handleCancleTask = async (task) => {
    try {
      const response = await cancleTaskApi({
        workspaceId: ids.workspaceId[0],
        taskId: task,
        reason: "Workers are busy at the moment",
      });
      setCancleTask(response);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    setTaskId(ids.taskId);
  }, [ids]);

  return (
    <div className="container">
      <h3>Cancle Task </h3>
      {taskId?.length > 0
        ? taskId.map((task, index) => (
            <div key={index}>
              <button onClick={() => handleCancleTask(task)}>
                Cancle task : {task}
              </button>
            </div>
          ))
        : ""}

      {Object.keys(cancleTask).length > 0 ? (
        <div>
          <p>Status: {cancleTask?.status}</p>
          <p>Message: {cancleTask?.message}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CancleTask;
