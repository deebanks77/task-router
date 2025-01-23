import React, { useState, useEffect } from "react";
import { defaultWorksflowForm } from "../../utils/defaultData";

function CreateWorkflow({ handleCreateWorkflow, workflow, ids }) {
  const [workflowForm, setWorkflowForm] = useState(defaultWorksflowForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (workflowForm.name === "") {
      return;
    }
    await handleCreateWorkflow(workflowForm);
  };

  const handleNameChange = (event) => {
    setWorkflowForm((prevWorkflow) => {
      return {
        ...prevWorkflow,
        name: event.target.value,
      };
    });
  };

  useEffect(() => {
    setWorkflowForm({
      ...workflowForm,
      configuration: JSON.stringify({
        ...workflowForm.configuration,
        task_routing: {
          filters: [
            {
              name: "en-sales",
              expression: "#{language}=='en'&&#{department}=='sales'",
              targets: [
                {
                  queue: ids.queueId[0],
                  priority: 10,
                  timeout: 3600,
                },
              ],
            },
            {
              name: "en-support",
              expression: "#{language}=='en'&&#{department}=='support'",
              targets: [
                {
                  queue: ids.queueId[0],
                  priority: 0,
                  timeout: 3600,
                  expression: "#{task.preferred_agents}==#{worker.agent_id}",
                },
              ],
            },
          ],
          default_filter: {
            queue: ids.queueId[0],
          },
        },
      }),
      workspaceId: ids.workspaceId[0],
    });
  }, [ids.queueId, ids.workspaceId]);

  return (
    <div className="container">
      <h3>Create Worksflow</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Workflow name</label>
          <input
            name="name"
            onChange={handleNameChange}
            value={workflowForm.name}
            type="text"
            placeholder="Simplexi Workflow"
          />
        </div>
        <div>
          <button>Create Workflow</button>
        </div>
      </form>

      <div>
        <h3>List of Workflow</h3>
        {workflow.length > 0
          ? workflow.map((workflow) => (
              <p key={workflow.workflowId}>
                WorkflowId : {workflow.workflowId}
              </p>
            ))
          : ""}
      </div>
    </div>
  );
}

export default CreateWorkflow;
