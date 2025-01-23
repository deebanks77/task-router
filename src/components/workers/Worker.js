import React, { useState, useEffect } from "react";
import CreateWorkers from "../workers/CreateWorkers";
import WorkerReservationResponse from "./WorkerRequestTask";
import UpdateWorker from "./UpdateWorker";
import GetWorkspaceWorker from "./GetWorkspaceWorker";
import GetWorkerReservation from "./GetWorkerReservation";

function Workers({
  handleCreateWorker,
  ids,
  workerActivities,
  workersReservation,
  handleSetWorkerReservation,
}) {
  const [workers, setWorkers] = useState([]);

  const handleSetWorkers = (worker) => {
    setWorkers(worker);
  };

  return (
    <div className="container">
      <CreateWorkers
        handleCreateWorker={handleCreateWorker}
        ids={ids}
        workerActivities={workerActivities}
      />

      <GetWorkspaceWorker
        handleSetWorkers={handleSetWorkers}
        workers={workers}
        ids={ids}
      />

      <UpdateWorker
        workers={workers}
        ids={ids}
        workerActivities={workerActivities}
      />

      <GetWorkerReservation
        workers={workers}
        handleSetWorkerReservation={handleSetWorkerReservation}
      />

      {/* Worker Reservation Response */}
      <WorkerReservationResponse
        workers={workers}
        workersReservation={workersReservation}
      />
    </div>
  );
}

export default Workers;
