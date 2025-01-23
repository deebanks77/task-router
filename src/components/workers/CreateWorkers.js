import React, { useState, useEffect } from "react";
import { defaultWorkerForm } from "../../utils/defaultData";

function CreateWorkers({ handleCreateWorker, ids, workerActivities }) {
  const [worker, setWorker] = useState(defaultWorkerForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (worker.name === "" || ids.workspaceId.length <= 0) {
      return;
    }
    await handleCreateWorker(worker);
  };

  const handleNameChange = (event) => {
    setWorker((prevWorkers) => {
      return { ...prevWorkers, name: event.target.value };
    });
  };

  useEffect(() => {
    if (ids.workspaceId.length <= 0) return;

    setWorker((prevWorkers) => {
      return {
        ...prevWorkers,
        workspaceId: ids.workspaceId[0],
      };
    });
  }, [ids]);

  // useEffect(() => {
  //   if (workerActivities.length <= 0) return;
  //   console.log("workerActivities", workerActivities);

  //   const availableActivityId = workerActivities.filter(
  //     (activity) => activity.name === "Available"
  //   ).uuid;
  //   setWorker((prevWorkers) => {
  //     return {
  //       ...prevWorkers,
  //       activity: availableActivityId,
  //     };
  //   });
  // }, [workerActivities]);

  return (
    <div className="container">
      <h3>Create Worker</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Worker name</label>
          <input
            onChange={handleNameChange}
            value={worker.name}
            type="text"
            placeholder="Simplexi Workflow"
          />
        </div>
        <div>
          <button>Create Worker</button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkers;
