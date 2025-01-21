import React, { useEffect, useState } from "react";
import CreateWorkspace from "./CreateWorkspace";
import UpdateWorkspace from "./UpdateWorkspace";
import {
  createWorkspace,
  workspaceData,
  defaultWorksflowData,
  defaultQueueData,
  defaultWorkerData,
  defaultTaskData,
} from "../../utils/defaultData";
import {
  createWorkspaceApi,
  updateWorkspaceApi,
  createWorkflowApi,
} from "../../utils/api";
import CreateWorkflow from "../workflow/CreateWorkflow";
import CreateQueue from "../queues/CreateQueue";
import { createQueueApi } from "../../utils/api";
import CreateWorkers from "../workers/CreateWorkers";
import CreateTask from "../tasks/CreateTasks";
import { createTaskApi } from "../../utils/api/task";
import {
  createWorkerApi,
  getWorkerReservationApi,
  updateWorkerApi,
} from "../../utils/api/worker";

function Workspace() {
  const [defaultWorkspace, setDefaultWorkspace] = useState(createWorkspace);
  const [updateWorkspace, setUpdateWorkspace] = useState(workspaceData);
  const [defaultQueue, setDefaultQueue] = useState(defaultQueueData);
  const [defaultWorkflow, setDefaultWorkflow] = useState(defaultWorksflowData);
  const [defaultWorker, setDefaultWorker] = useState(defaultWorkerData);
  const [workerActivities, setWorkerActivities] = useState();
  const [defaultTask, setDefaultTask] = useState(defaultTaskData);
  const [eventCallback, setEventCallback] = useState(null);
  const [Ids, setIds] = useState({
    workspaceId: null,
    workerId: null,
    queueId: null,
    workflowId: null,
  });
  const [workerReservation, setWorkerReservation] = useState({
    createdAt: "",
    reservationId: "",
    reservationsStatus: "",
    taskId: "",
    updatedAt: "",
    workerId: "",
    workspaceId: "",
  });

  const handleCreateWorkspace = async (workspace) => {
    try {
      const response = await createWorkspaceApi(workspace);
      // localStorage.setItem("workspace", response);
      console.log(response);
      setDefaultWorkspace({
        name: response.name,
        eventCallbackUrl: response.eventCallbackUrl,
        multiTaskEnabled: response.multiTaskEnabled,
        queueOrderPriority: response.queueOrderPriority,
        eventsFilters: response.eventsFilters,
        defaultActivityId: response.defaultActivityId,
        timeoutActivityId: response.timeoutActivityId,
      });
      setUpdateWorkspace({
        name: response.name,
        eventCallbackUrl: response.eventCallbackUrl,
        multiTaskEnabled: response.multiTaskEnabled,
        queueOrderPriority: response.queueOrderPriority,
        eventsFilters: response.eventsFilters,
        defaultActivityId: response.defaultActivityId,
        timeoutActivityId: response.timeoutActivityId,
        workspaceId: response.workspaceId,
      });
      setWorkerActivities(response.activities);
      // add workspaceId to the data
      setDefaultWorkflow((prevWorkflow) => {
        return { ...prevWorkflow, workspaceId: response.workspaceId };
      });
      setDefaultQueue((prevQueue) => {
        return { ...prevQueue, workspaceId: response.workspaceId };
      });
      setDefaultWorker((prevWorker) => {
        return {
          ...prevWorker,
          workspaceId: response.workspaceId,
          activity: response.activities[0].uuid,
        };
      });
      setDefaultTask((prevTask) => {
        return { ...prevTask, workspaceId: response.workspaceId };
      });
      setIds((prevIDS) => {
        return { ...prevIDS, workspaceId: response.workspaceId };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateWorkspace = async (workspace) => {
    return;
    // console.log("handleUpdateWorkspace", workspace);
    // try {
    //   const response = await updateWorkspaceApi(workspace);
    //   console.log("handleUpdateWorkspace response", response);
    //   setDefaultWorkspace({
    //     name: response.name,
    //     eventCallbackUrl: response.eventCallbackUrl,
    //     multiTaskEnabled: response.multiTaskEnabled,
    //     queueOrderPriority: response.queueOrderPriority,
    //     eventsFilters: response.eventsFilters,
    //     defaultActivityId: response.defaultActivityId,
    //     timeoutActivityId: response.timeoutActivityId,
    //   });
    //   setUpdateWorkspace({
    //     name: response.name,
    //     eventCallbackUrl: response.eventCallbackUrl,
    //     multiTaskEnabled: response.multiTaskEnabled,
    //     queueOrderPriority: response.queueOrderPriority,
    //     eventsFilters: response.eventsFilters,
    //     defaultActivityId: response.defaultActivityId,
    //     timeoutActivityId: response.timeoutActivityId,
    //   });
    //   setDefaultWorkflow((prevWorkflow) => {
    //     return { ...prevWorkflow, workspaceId: response.workspaceId };
    //   });
    //   setDefaultQueue((prevQueue) => {
    //     return { ...prevQueue, workspaceId: response.workspaceId };
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleCreateQueue = async (queue) => {
    console.log({ queue: queue });
    try {
      const response = await createQueueApi(queue);
      localStorage.setItem("queue", JSON.stringify(response));
      console.log({ createQueueResponse: response });

      setDefaultWorkflow((prevWorkflow) => {
        return {
          ...prevWorkflow,
          configuration: JSON.stringify({
            ...prevWorkflow.configuration,
            task_routing: {
              filters: [
                {
                  name: "en-sales",
                  expression: "#{language}=='en'&&#{department}=='sales'",
                  targets: [
                    {
                      queue: response.queueId,
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
                      queue: response.queueId,
                      priority: 0,
                      timeout: 3600,
                      expression:
                        "#{task.preferred_agents}==#{worker.agent_id}",
                    },
                  ],
                },
              ],
              default_filter: {
                queue: response.queueId,
              },
            },
          }),
        };
      });

      setDefaultTask((prevTask) => {
        return { ...prevTask, queueId: response.queueId };
      });
      setIds((prevIDS) => {
        return { ...prevIDS, queueId: response.queueId };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateWorkflow = async (worksflow) => {
    try {
      const response = await createWorkflowApi(worksflow);
      console.log(handleCreateWorkflow, response);
      setDefaultWorkflow({
        name: worksflow.name,
        configuration: worksflow.configuration,
        documentContentType: "application/json",
        taskReservationTimeout: 3600,
        assignmentCallbackUrl: worksflow.assignmentCallbackUrl,
        fallbackCallbackUrl: worksflow.fallbackCallbackUrl,
      });
      setDefaultTask((prevTask) => {
        return { ...prevTask, workflowId: response.workflowId };
      });
      setIds((prevIds) => {
        return { ...prevIds, workflowId: response.workflowId };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateWorker = async (worker) => {
    console.log("activities", workerActivities);
    console.log("worker", worker);
    try {
      const response = await createWorkerApi(worker);
      console.log("handleCreateWorker", response);
      setDefaultWorker({
        name: worker.name,
        attributes: worker.attributes,
        activity: worker.activity,
        workspaceId: worker.workspaceId,
      });
      setIds((prevIDS) => {
        return { ...prevIDS, workerId: response.workerId };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateWorker = async () => {
    const activity = workerActivities.filter(
      (activity) => activity.name === "Available"
    );
    try {
      const response = await updateWorkerApi({
        workerId: Ids.workerId,
        workspaceId: Ids.workspaceId,
        activiteId: activity.uuid,
      });
      console.log("Update worker response", response);
      setWorkerReservation(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetWorkerReservation = async () => {
    try {
      const response = await getWorkerReservationApi({
        workerId: Ids.workerId,
        workspaceId: Ids.workspaceId,
      });
      console.log("handleGetWorkerReservation", response);
      setWorkerReservation(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async (task) => {
    try {
      const response = await createTaskApi(task);
      console.log(handleCreateWorker, response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Create a connection to the SSE stream on /events
    const eventSource = new EventSource("http://localhost:9091/events");

    // Check if the connection is established successfully
    if (typeof EventSource !== "undefined") {
      console.log("Event source listening");
    } else {
      console.log("Event Error");
    }

    // Listen for incoming messages (events) from the server
    eventSource.onmessage = function (event) {
      try {
        const data = JSON.parse(event.data);
        console.log("Received event:", data);
        setEventCallback(data); // Ensure this is used elsewhere
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    // Handle errors
    eventSource.onerror = (error) => {
      console.error("Error occurred with SSE", error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [eventCallback]);

  useEffect(() => {
    console.log(Ids);
  }, [Ids]);

  return (
    <div>
      {/* Workspace */}
      <CreateWorkspace
        handleCreateWorkspace={handleCreateWorkspace}
        defaultWorkspace={defaultWorkspace}
      />
      <UpdateWorkspace
        handleUpdateWorkspace={handleUpdateWorkspace}
        updateWorkspace={updateWorkspace}
      />

      {/* Queue */}
      <CreateQueue
        handleCreateQueue={handleCreateQueue}
        defaultQueue={defaultQueue}
      />

      {/* Workflow */}
      <CreateWorkflow
        handleCreateWorkflow={handleCreateWorkflow}
        defaultWorkflow={defaultWorkflow}
      />

      {/* Workers*/}
      <CreateWorkers
        handleCreateWorker={handleCreateWorker}
        defaultWorker={defaultWorker}
        handleGetWorkerReservation={handleGetWorkerReservation}
        workerReservation={workerReservation}
        handleUpdateWorker={handleUpdateWorker}
      />

      {/* Task*/}
      <CreateTask
        handleCreateTask={handleCreateTask}
        defaultTask={defaultTask}
      />

      {/* Tell us if task is assigned */}
      <div className="container">Tell us if task is assigned</div>
    </div>
  );
}

export default Workspace;
