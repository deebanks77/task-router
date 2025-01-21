import React, { useState, useEffect } from "react";

function CreateQueue({ handleCreateQueue, defaultQueue }) {
  const [queue, setQueue] = useState(defaultQueue);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (queue.name === "" || queue.workspaceId === "") {
      return;
    }
    await handleCreateQueue(queue);
  };

  const handleNameChange = (event) => {
    setQueue((prevQueue) => {
      return { ...prevQueue, name: event.target.value };
    });
  };

  useEffect(() => {
    console.log({ defaultQueue: defaultQueue });

    setQueue((prevWorkflow) => {
      return {
        ...prevWorkflow,
        name: defaultQueue.name,
        taskOrder: defaultQueue.taskOrder,
        expression: defaultQueue.expression,
        maxReservedWorkers: defaultQueue.maxReservedWorkers,
        reservationActivityId: defaultQueue.reservationActivityId,
        assignmentActivityId: defaultQueue.assignmentActivityId,
        workspaceId: defaultQueue.workspaceId,
      };
    });
  }, [defaultQueue]);

  useEffect(() => {
    console.log({ queue: queue });

    // setQueue((prevWorkflow) => {
    //   return {
    //     ...prevWorkflow,
    //     name: defaultQueue.name,
    //     taskOrder: defaultQueue.taskOrder,
    //     expression: defaultQueue.expression,
    //     maxReservedWorkers: defaultQueue.maxReservedWorkers,
    //     reservationActivityId: defaultQueue.reservationActivityId,
    //     assignmentActivityId: defaultQueue.assignmentActivityId,
    //     workspaceId: defaultQueue.workspaceId,
    //   };
    // });
  }, [defaultQueue.name]);

  return (
    <div className="container">
      <h3>Create Queue</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Queue name</label>
          <select
            onChange={handleNameChange}
            value={queue.name}
            type="text"
            placeholder="Sales Queue"
          >
            <option value={"sales-queue"}>sales queue</option>
            <option value={"customer-service"}>customer service</option>
          </select>
        </div>
        <div>
          <button>Create Queue</button>
        </div>
      </form>
    </div>
  );
}

export default CreateQueue;
