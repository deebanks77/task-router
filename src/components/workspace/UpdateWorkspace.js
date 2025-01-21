import React, { useEffect, useState } from "react";
import { updateWorkspaceApi } from "../../utils/api/workspace";

function UpdateWorkspace({ handleUpdateWorkspace, updateWorkspace }) {
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: "",
    eventCallbackUrl: "",
    multiTaskEnabled: "",
    queueOrderPriority: "FIFO",
    eventsFilters: ["workspace.created"],
    defaultActivityId: "",
    timeoutActivityId: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("trying to update workspace");
    try {
      if (updateWorkspace.name === "") {
        return;
      }
      const result = await handleUpdateWorkspace(updateWorkspace);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    let name = e.target.name;
    console.log({
      name: name,
      name: e.target.name,
      value: e.target.value,
    });
    setWorkspaceInfo((prevWorkspace) => {
      return { ...prevWorkspace, name: e.target.value };
    });
  };

  useEffect(() => {
    setWorkspaceInfo((prevWorkspace) => {
      return {
        ...prevWorkspace,
        name: updateWorkspace.name,
        eventCallbackUrl: updateWorkspace.eventCallbackUrl,
        multiTaskEnabled: updateWorkspace.multiTaskEnabled,
        queueOrderPriority: updateWorkspace.queueOrderPriority,
        eventsFilters: updateWorkspace.eventsFilters,
        defaultActivityId: updateWorkspace.defaultActivityId,
        timeoutActivityId: updateWorkspace.timeoutActivityId,
      };
    });
  }, [updateWorkspace]);

  return (
    <div className="container">
      <h3>Update Workspace</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Workspace name</label>
          <div>{workspaceInfo.name}</div>
          <input
            name="name"
            onChange={handleNameChange}
            value={workspaceInfo.name}
            type="text"
          />
        </div>
        <div className="form-input">
          <label>Event Callback Url</label>
          <input
            name="eventCallbackUrl"
            onChange={handleNameChange}
            value={workspaceInfo.eventCallbackUrl}
            type="text"
          />
        </div>
        <div className="form-input">
          <label>Multi Task Enabled</label>
          <input
            name="multiTaskEnabled"
            onChange={handleNameChange}
            value={workspaceInfo.multiTaskEnabled}
            type="text"
          />
        </div>
        <div className="form-input">
          <label>Queue Order Priority</label>
          <select
            name="queueOrderPriority"
            onChange={handleNameChange}
            type="text"
          >
            <option value={workspaceInfo.queueOrderPriority}>
              {workspaceInfo.queueOrderPriority}
            </option>
            <option value="FIFO">FIFO</option>
            <option value="LIFO">LIFO</option>
          </select>
        </div>
        <div className="form-input">
          <label>Events Filters</label>
          <input
            name="eventFilters"
            onChange={handleNameChange}
            value={workspaceInfo.eventsFilters}
            type="text"
          />
        </div>
        <div className="form-input">
          <label>Default Activity Id</label>
          <input
            name="defaultActivityId"
            onChange={handleNameChange}
            value={workspaceInfo.defaultActivityId}
            type="text"
          />
        </div>
        <div className="form-input">
          <label>Timeout Activity Id</label>
          <input
            name="timeoutActivityId"
            onChange={handleNameChange}
            value={workspaceInfo.timeoutActivityId}
            type="text"
          />
        </div>
        <div>
          <button>Update Workspace</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateWorkspace;
