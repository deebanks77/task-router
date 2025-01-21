import React, { useState } from "react";

function CreateWorkspace({ handleCreateWorkspace, defaultWorkspace }) {
  const [workspace, setWorkspace] = useState(defaultWorkspace);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handle submit clicked");
    await handleCreateWorkspace(workspace);
  };

  const handleNameChange = (event) => {
    setWorkspace((prevWorkspace) => {
      return { ...prevWorkspace, name: event.target.value };
    });
  };

  return (
    <div className="container">
      <h3>Create Workspace</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Workspace name</label>
          <input
            onChange={handleNameChange}
            value={workspace.name}
            type="text"
          />
        </div>
        <div>
          <button>Create Workspace</button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkspace;
