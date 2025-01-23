import React, { useEffect, useState } from "react";
import { workerReservationResponseApi } from "../../utils/api/worker";

function WorkerReservationResponse({ workers, workersReservation }) {
  const [reservationStatus, setReservationStatus] = useState(false);
  const [workersReservationSet, setWorkersReservationSet] = useState([]);

  const handleWorkerReservationResponse = async ({
    workerId,
    workspaceId,
    reservationId,
  }) => {
    console.log("Request reservation");
    try {
      const response = await workerReservationResponseApi({
        workerId,
        workspaceId,
        reservationId,
        instruction: "accept",
        activityId: null,
      });

      console.log("handleWorkerReservationResponse", response);
      setReservationStatus(true);
      // handleSetWorkerReservation(response);
    } catch (error) {
      console.log("error handleWorkerReservationResponse", error);
    }
  };

  useEffect(() => {
    console.log("workersReservation", workersReservation);
    const WorkerReservationSet = Array.from(
      new Set(workersReservation?.flat(Infinity)) // Extract unique `id`s
    );
    setWorkersReservationSet(WorkerReservationSet);
  }, [workersReservation]);

  return (
    <div>
      {/* Reservation Response */}
      <div className="container">
        <h3>Worker to accept a task</h3>

        <div className="multipleForm-container">
          {workersReservation !== null && workersReservation.length > 0
            ? workersReservationSet.map((worker, index) => (
                <div key={worker.workerId + index}>
                  <button
                    onClick={() =>
                      handleWorkerReservationResponse({
                        workerId: worker.workerId,
                        workspaceId: worker.workspaceId,
                        reservationId: worker.reservationId,
                      })
                    }
                  >
                    Worker reservation response : {worker.workerId}
                  </button>
                </div>
              ))
            : ""}
        </div>

        <div>Reservation Status: {reservationStatus}</div>
      </div>
    </div>
  );
}

export default WorkerReservationResponse;
