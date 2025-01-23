import React, { useState } from "react";
import { updateWorkerApi } from "../../utils/api/worker";

function UpdateWorker({ workers, ids, workerActivities }) {
  const [updatedActivity, setUpdateActivity] = useState(null);
  const handleUpdateWorker = async ({ workerId, workspaceId, activityId }) => {
    console.log("handle update worker request...");
    try {
      const response = await updateWorkerApi({
        workerId,
        workspaceId,
        activityId,
      });
      setUpdateActivity(workerId);
    } catch (error) {}
  };

  console.log("workerActivities", workerActivities);

  return (
    <div className="container">
      <h3> Update Worker </h3>
      {updatedActivity ? (
        <p>{updatedActivity}: activity had been updated</p>
      ) : (
        ""
      )}
      <div className="multipleForm-container">
        {workers.length > 0
          ? workers.map((worker, index) => (
              <div key={worker.workerId}>
                <h4>Worker NAme : {worker.name}</h4>
                <h4>Worker Activity : {worker.activity.activityType}</h4>
                <h4>Worker Activity Id : {worker.activity.activityId}</h4>
                <button
                  onClick={() =>
                    handleUpdateWorker({
                      workerId: worker.workerId,
                      workspaceId: worker.workspaceId,
                      activityId: workerActivities[0].uuid,
                    })
                  }
                >
                  Update worker activity
                </button>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default UpdateWorker;
