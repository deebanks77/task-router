import React, { useState, useEffect } from "react";
import { getWorkerReservationApi } from "../../utils/api/worker";

function GetWorkerReservation({ workers, handleSetWorkerReservation }) {
  const [reservation, setReservation] = useState([]);
  // const [workersReservationSet, setWorkersReservationSet] = useState([]);

  const handleWorkerReservation = async ({ workerId, workspaceId }) => {
    try {
      const response = await getWorkerReservationApi({ workerId, workspaceId });
      console.log("handleWorkerReservation", response);
      if (response.length <= 0) return;
      setReservation((prevReserva) => [...prevReserva, response]);
      handleSetWorkerReservation(response);
    } catch (error) {
      console.log("error handleWorkerReservation", error);
    }
  };

  // useEffect(() => {
  //    console.log("workersReservation", workersReservation);
  //    const WorkerReservationSet = Array.from(
  //      new Set(
  //       reservation
  //          ?.flat(Infinity)
  //          .map((workerReservation) => workerReservation.reservationId)
  //      ) // Extract unique `id`s
  //    );
  //    setWorkersReservationSet(WorkerReservationSet);
  //  }, [reservation]);

  return (
    <div className="container">
      <h3>Get Worker Reservation </h3>
      <div className="multipleForm-container">
        {workers !== null && workers.length > 0
          ? workers.map((worker, index) => (
              <div key={worker.workerId + index}>
                <h4>Worker NAme : {worker.name}</h4>
                <h4>Worker Activity : {worker.activity.activityType}</h4>
                <h4>Worker Activity Id : {worker.activity.activityId}</h4>
                <button
                  onClick={() =>
                    handleWorkerReservation({
                      workerId: worker.workerId,
                      workspaceId: worker.workspaceId,
                    })
                  }
                >
                  Get worker reservation
                </button>
              </div>
            ))
          : ""}
      </div>

      <div className="multipleForm-container">
        {reservation?.length > 0 || reservation !== undefined
          ? reservation.flat(Infinity).map((reservation, index) => (
              <div
                key={reservation.reservationId + index}
                className="container"
              >
                <h4>reservationsStatus: {reservation?.reservationsStatus}</h4>
                <h4>reservationsId: {reservation?.reservationId}</h4>
                <h4>workerId: {reservation?.workerId}</h4>
                <h4>taskId: {reservation?.taskId}</h4>
                <h4>workspaceId: {reservation?.workspaceId}</h4>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default GetWorkerReservation;
