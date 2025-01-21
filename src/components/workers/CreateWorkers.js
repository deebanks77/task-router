import React, { useState, useEffect } from "react";

function CreateWorkers({
  handleCreateWorker,
  defaultWorker,
  handleGetWorkerReservation,
  workerReservation,
  handleUpdateWorker,
}) {
  const [worker, setWorker] = useState(defaultWorker);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (worker.name === "" || worker.workspaceId === "") {
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
    console.log({ defaultWorker: defaultWorker });

    setWorker((prevWorkers) => {
      return {
        ...prevWorkers,
        name: defaultWorker.name,
        attributes: {
          language: ["en"],
          department: "sales",
        },
        activity: defaultWorker.activity,
        workspaceId: defaultWorker.workspaceId,
      };
    });
  }, [defaultWorker]);

  return (
    <div className="container">
      <div>
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

      {/* Get worker reservation status */}
      <div className="container">
        <h3>Worker reservation status</h3>
        <div>
          <button onClick={handleGetWorkerReservation}>
            Get worker reservation status
          </button>
        </div>

        <form className="form">
          <div className="form-input">
            <label>Reservation ID</label>
            <input
              value={workerReservation.reservationId}
              type="text"
              readOnly
            />
          </div>
          <div className="form-input">
            <label>Reservations Status</label>
            <input
              value={workerReservation.reservationsStatus}
              type="text"
              readOnly
            />
          </div>
          <div className="form-input">
            <label>Task ID</label>
            <input value={workerReservation.taskId} type="text" readOnly />
          </div>
          <div className="form-input">
            <label>Worker ID</label>
            <input value={workerReservation.workerId} type="text" readOnly />
          </div>
          <div className="form-input">
            <label>Workspace ID</label>
            <input value={workerReservation.workspaceId} type="text" readOnly />
          </div>
        </form>
      </div>

      {/* Update Worker */}
      <div className="container">
        <h3> Update Worker </h3>
        <div>
          <button onClick={handleUpdateWorker}>
            Update worker reservation
          </button>
        </div>
      </div>

      {/* Reservation Response */}
      <div className="container">
        <h3>Worker reservation</h3>

        <form className="form" onSubmit={handleGetWorkerReservation}>
          <div className="form-input">
            <label>Reservation ID</label>
            <input
              onChange={handleNameChange}
              value={workerReservation.reservationId}
              type="text"
            />
          </div>
          <div className="form-input">
            <label>Reservations Status</label>
            <input
              onChange={handleNameChange}
              value={workerReservation.reservationsStatus}
              type="text"
            />
          </div>
          <div className="form-input">
            <label>Task ID</label>
            <input
              onChange={handleNameChange}
              value={workerReservation.taskId}
              type="text"
            />
          </div>
          <div className="form-input">
            <label>Worker ID</label>
            <input
              onChange={handleNameChange}
              value={workerReservation.workerId}
              type="text"
            />
          </div>
          <div className="form-input">
            <label>Workspace ID</label>
            <input
              onChange={handleNameChange}
              value={workerReservation.workspaceId}
              type="text"
            />
          </div>
          <div>
            <button>worker reservation </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWorkers;
