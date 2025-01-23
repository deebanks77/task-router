import React, { useEffect, useState } from "react";
import { updateWorkspaceApi } from "../../utils/api/workspace";

function UpdateWorkspace({ handleUpdateWorkspace, updateWorkspace }) {
  const [workspaceInfo, setWorkspaceInfo] = useState([]);

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
    setWorkspaceInfo([...updateWorkspace]);
  }, [updateWorkspace]);

  return (
    <div className="container">
      <h3>Update Workspace</h3>
      <div className="multipleForm-container">
        {workspaceInfo.length > 0
          ? workspaceInfo.map((workspace, index) => (
              <form
                className="form"
                onSubmit={handleSubmit}
                key={workspace.name + index}
              >
                <div className="form-input">
                  <label>Workspace name</label>
                  <input
                    name="name"
                    onChange={handleNameChange}
                    value={workspace.name}
                    type="text"
                  />
                </div>
                <div className="form-input">
                  <label>Event Callback Url</label>
                  <input
                    name="eventCallbackUrl"
                    onChange={handleNameChange}
                    value={workspace.eventCallbackUrl}
                    type="text"
                  />
                </div>
                <div className="form-input">
                  <label>Multi Task Enabled</label>
                  <input
                    name="multiTaskEnabled"
                    onChange={handleNameChange}
                    value={workspace.multiTaskEnabled}
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
                    <option value={workspace.queueOrderPriority}>
                      {workspace.queueOrderPriority}
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
                    value={workspace.eventsFilters}
                    type="text"
                  />
                </div>
                <div className="form-input">
                  <label>Default Activity Id</label>
                  <input
                    name="defaultActivityId"
                    onChange={handleNameChange}
                    value={workspace.defaultActivityId}
                    type="text"
                  />
                </div>
                <div className="form-input">
                  <label>Timeout Activity Id</label>
                  <input
                    name="timeoutActivityId"
                    onChange={handleNameChange}
                    value={workspace.timeoutActivityId}
                    type="text"
                  />
                </div>
                <div>
                  <button>Update Workspace</button>
                </div>
              </form>
            ))
          : "No workspace has been created"}
      </div>
    </div>
  );
}

export default UpdateWorkspace;
