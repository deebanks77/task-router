import React, { useEffect, useState } from "react";
import { getWorkspaceWorkerApi } from "../../utils/api/worker";

function GetWorkspaceWorker({ handleSetWorkers, workers, ids }) {
  const handleGetWorkspaceWorker = async () => {
    if (ids.workspaceId.length <= 0) return;
    console.log("workspaceId from GetWorkspaceWorker", ids.workspaceId[0]);

    try {
      const response = await getWorkspaceWorkerApi({
        workspaceId: ids.workspaceId[0],
      });
      handleSetWorkers(response);
    } catch (error) {
      console.log("handleGetWorkspaceWorker", error);
    }
  };

  useEffect(() => {
    console.log("workers", workers);
  }, [workers]);

  return (
    <div className="container">
      <h3>Get Workspace Workers</h3>
      <div>
        <button onClick={handleGetWorkspaceWorker}>Get Workers</button>
      </div>

      <div className="multipleForm-container">
        {workers.length > 0
          ? workers.map((worker, index) => (
              <div key={index}>
                <p>Worker Name: {worker.name}</p>
                <p>Activity Type: {worker.activityType}</p>
                <p>Activity ID: {worker.activityId}</p>
                <p>Worker ID: {worker.workerId}</p>
                <p>
                  Queue Ids:{" "}
                  {worker.queues.map((item, i) => (
                    <span key={i} className="item">
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default GetWorkspaceWorker;
