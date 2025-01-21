import React, { useState, useEffect } from "react";

function CreateWorkflow({ handleCreateWorkflow, defaultWorkflow }) {
  const [workflow, setWorkflow] = useState(defaultWorkflow);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (workflow.name === "" || workflow.workspaceId === "") {
      return;
    }
    await handleCreateWorkflow(workflow);
  };

  const handleNameChange = (event) => {
    setWorkflow((prevWorkflow) => {
      return { ...prevWorkflow, name: event.target.value };
    });
  };

  useEffect(() => {
    console.log({ updatedtWorkflow: defaultWorkflow });

    setWorkflow((prevWorkflow) => {
      return {
        ...prevWorkflow,
        name: defaultWorkflow.name,
        configuration: defaultWorkflow.configuration,
        documentContentType: "application/json",
        taskReservationTimeout: 3600,
        assignmentCallbackUrl: defaultWorkflow.assignmentCallbackUrl,
        fallbackCallbackUrl: defaultWorkflow.fallbackCallbackUrl,
        workspaceId: defaultWorkflow.workspaceId,
      };
    });
  }, [defaultWorkflow]);

  return (
    <div className="container">
      <h3>Create Worksflow</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Workflow name</label>
          <input
            onChange={handleNameChange}
            value={workflow.name}
            type="text"
            placeholder="Simplexi Workflow"
          />
        </div>
        <div>
          <button>Create Workflow</button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkflow;
