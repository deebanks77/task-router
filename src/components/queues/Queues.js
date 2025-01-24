import React, { useState, useEffect } from "react";
import { defaultQueueForm } from "../../utils/defaultData";

function Queue({ handleCreateQueue, queues, ids }) {
  const [queueForm, setQueueForm] = useState(defaultQueueForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (queueForm.name === "" || ids.workspaceId.length <= 0) {
      return;
    }
    await handleCreateQueue({ ...queueForm, workspaceId: ids.workspaceId[0] });
  };

  const handleNameChange = (event) => {
    setQueueForm((prevQueue) => {
      return { ...prevQueue, name: event.target.value };
    });
  };

  useEffect(() => {
    console.log({ queues: queues });
  }, [queues]);

  return (
    <div className="container">
      <h3>Create Queue</h3>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-input">
            <label>Queue name</label>
            <select
              onChange={handleNameChange}
              value={queueForm.name}
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
        <div>
          <h3>List of Queues Created</h3>
          {queues.length > 0 ? (
            <div className="multipleForm-container border">
              {queues.map((queue) => (
                <div key={queue.queueId}>
                  <p>QueueId : {queue.queueId}</p>
                  <p>
                    addedWorkers :{" "}
                    {queue.addedWorkers > 0
                      ? queue.addedWorkers
                      : "No worker on the queue"}
                  </p>
                  <p>
                    removedWorkers :{" "}
                    {queue.removedWorkers > 0 ? queue.removedWorkers : 0}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Queue;
