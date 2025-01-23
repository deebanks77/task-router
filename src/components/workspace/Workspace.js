import React, { useContext, useEffect, useState } from "react";
import CreateWorkspace from "./CreateWorkspace";
import UpdateWorkspace from "./UpdateWorkspace";
import { createWorkspaceApi, createWorkflowApi } from "../../utils/api";
import CreateWorkflow from "../workflow/CreateWorkflow";
import CreateQueue from "../queues/CreateQueue";
import { createQueueApi } from "../../utils/api";
import Worker from "../workers/Worker";
import Task from "../tasks/Tasks";
import { createTaskApi } from "../../utils/api/task";
import { createWorkerApi, updateWorkerApi } from "../../utils/api/worker";
import ErrorBoundary from "../../components/ErrorBoundery";
import { AppContext } from "../../store/store";

function getWorkspaceLocalstorage() {
  const workspace = localStorage.getItem("Workspace");
  return workspace ? JSON.parse(workspace) : [];
}
function getQueueLocalstorage() {
  const queue = localStorage.getItem("Queue");
  return queue ? JSON.parse(queue) : [];
}
function getWorkflowLocalstorage() {
  const workflow = localStorage.getItem("Workflow");
  return workflow ? JSON.parse(workflow) : [];
}
function getTaskLocalstorage() {
  const task = localStorage.getItem("Task");
  return task ? JSON.parse(task) : [];
}
function getCreateWorkerLocalstorage() {
  const worker = localStorage.getItem("CreateWorkerResponse");
  return worker ? JSON.parse(worker) : [];
}
function getWorkerLocalstorage() {
  const worker = localStorage.getItem("Worker");
  return worker ? JSON.parse(worker) : [];
}
function getWorkerReservationLocalstorage() {
  const worker = localStorage.getItem("WorkerReservation");
  return worker ? JSON.parse(worker) : [];
}
function getIdsLocalstorage() {
  const Ids = localStorage.getItem("Ids");
  return Ids
    ? JSON.parse(Ids)
    : {
        workspaceId: [],
        workerId: [],
        queueId: [],
        workflowId: [],
        taskId: [],
      };
}
function getWorkerActivitiessLocalstorage() {
  const workerActivities = localStorage.getItem("WorkerActivities");
  return workerActivities ? JSON.parse(workerActivities) : [];
}

function Workspace() {
  const [updateWorkspace, setUpdateWorkspace] = useState(
    getWorkspaceLocalstorage || []
  );
  const [queues, setQueues] = useState(getQueueLocalstorage || []);
  const [workflow, setWorkflow] = useState(getWorkflowLocalstorage || []);
  const [workerCreated, setWorkerCreated] = useState(
    getCreateWorkerLocalstorage || []
  );
  const [workerActivities, setWorkerActivities] = useState(
    getWorkerActivitiessLocalstorage || []
  );
  const [workersReservation, setWorkersReservation] = useState(
    getWorkerReservationLocalstorage || []
  );
  const [Ids, setIds] = useState(
    getIdsLocalstorage || {
      workspaceId: [],
      workerId: [],
      queueId: [],
      workflowId: [],
      taskId: [],
    }
  );

  // Create Workspace
  const handleCreateWorkspace = async (workspace) => {
    try {
      const response = await createWorkspaceApi(workspace);
      console.log("response", response);

      setUpdateWorkspace((workspace) => [
        ...workspace,
        {
          name: response.name,
          eventCallbackUrl: response.eventCallbackUrl,
          multiTaskEnabled: response.multiTaskEnabled,
          queueOrderPriority: response.queueOrderPriority,
          eventsFilters: response.eventsFilters,
          defaultActivityId: response.defaultActivityId,
          timeoutActivityId: response.timeoutActivityId,
          workspaceId: response.workspaceId,
        },
      ]);
      setWorkerActivities(response.activities);
      // setWorkerActivities((prevActivities) => [
      //   ...prevActivities,
      //   response.activities,
      // ]);
      console.log("handleCreateWorkspace", response);
      setIds((prevIDS) => {
        return {
          ...prevIDS,
          workspaceId: [...prevIDS.workspaceId, response.workspaceId],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update Workspace
  const handleUpdateWorkspace = async (workspace) => {
    return;
  };

  const handleCreateQueue = async (queue) => {
    console.log({ queue: queue });
    try {
      const response = await createQueueApi(queue);
      console.log("createQueueResponse", response);

      setQueues((prevQueues) => [...prevQueues, response]);

      setIds((prevIDS) => {
        return { ...prevIDS, queueId: [...prevIDS.queueId, response.queueId] };
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create Workflow
  const handleCreateWorkflow = async (worksflow) => {
    console.log("handleCreateWorkflow parameter", worksflow);
    try {
      const response = await createWorkflowApi(worksflow);
      console.log("handleCreateWorkflow ", response);
      setWorkflow((prevWorkflow) => [...prevWorkflow, response]);

      if (response === "undefined") return;
      setIds((prevIds) => {
        return {
          ...prevIds,
          workflowId: [...prevIds.workflowId, response.workflowId],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create Worker
  const handleCreateWorker = async (worker) => {
    console.log("handleCreateWorker parameter", worker);
    try {
      const response = await createWorkerApi(worker);
      console.log("handleCreateWorker", response);
      setWorkerCreated((prevWorkers) => [...prevWorkers, response]);

      setIds((prevIDS) => {
        return {
          ...prevIDS,
          workerId: [...prevIDS.workerId, response.workerId],
        };
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
      setWorkersReservation(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetWorkerReservation = (reservation) => {
    setWorkersReservation((prevReserv) => [...prevReserv, reservation]);
  };

  // Task
  const handleCreateTask = async (task) => {
    try {
      const response = await createTaskApi(task);
      setIds((prevIDS) => {
        return {
          ...prevIDS,
          taskId: [...prevIDS.taskId, response.taskId],
        };
      });
      console.log("handleCreateTask", response);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // Create a connection to the SSE stream on /events
  //   const eventSource = new EventSource("http://localhost:9091/events");

  //   // Check if the connection is established successfully
  //   if (typeof EventSource !== "undefined") {
  //     console.log("Event source listening");
  //   } else {
  //     console.log("Event Error");
  //   }

  //   // Listen for incoming messages (events) from the server
  //   eventSource.onmessage = function (event) {
  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log("Received event:", data);
  //       setEventCallback(data); // Ensure this is used elsewhere
  //     } catch (error) {
  //       console.error("Error parsing SSE data:", error);
  //     }
  //   };

  //   // Handle errors
  //   eventSource.onerror = (error) => {
  //     console.error("Error occurred with SSE", error);
  //     eventSource.close();
  //   };

  //   return () => eventSource.close();
  // }, [eventCallback]);

  useEffect(() => {
    localStorage.setItem("Workspace", JSON.stringify(updateWorkspace));
    // console.log("Workspace", updateWorkspace);
  }, [updateWorkspace]);

  useEffect(() => {
    localStorage.setItem("Queue", JSON.stringify(queues));
    // console.log("Queue", queues);
  }, [queues]);

  useEffect(() => {
    localStorage.setItem("Workflow", JSON.stringify(workflow));
    // console.log("Workflow", workflow);
  }, [workflow]);

  useEffect(() => {
    localStorage.setItem("CreateWorkerResponse", JSON.stringify(workerCreated));
    // console.log("CreateWorkerResponse", workerCreated);
  }, [workerCreated]);

  useEffect(() => {
    localStorage.setItem("Ids", JSON.stringify(Ids));
    // console.log("Ids", Ids);
  }, [Ids]);

  useEffect(() => {
    localStorage.setItem("WorkerActivities", JSON.stringify(workerActivities));
    // console.log("workerActivities", workerActivities);
  }, [workerActivities]);

  const { eventCallbackData } = useContext(AppContext);

  const eventCallback = JSON.parse(eventCallbackData);

  console.log("eventCallbackData", eventCallback);

  return (
    <ErrorBoundary>
      {/* Workspace */}
      <CreateWorkspace handleCreateWorkspace={handleCreateWorkspace} />
      <UpdateWorkspace
        handleUpdateWorkspace={handleUpdateWorkspace}
        updateWorkspace={updateWorkspace}
      />

      {/* Queue */}
      <CreateQueue
        handleCreateQueue={handleCreateQueue}
        queues={queues}
        ids={Ids}
      />

      {/* Workflow */}
      <CreateWorkflow
        handleCreateWorkflow={handleCreateWorkflow}
        workflow={workflow}
        ids={Ids}
        workerActivities={workerActivities}
      />

      {/* Workers*/}
      <Worker
        handleCreateWorker={handleCreateWorker}
        ids={Ids}
        workerActivities={workerActivities}
        workersReservation={workersReservation}
        handleSetWorkerReservation={handleSetWorkerReservation}
      />

      {/* Task*/}
      <Task handleCreateTask={handleCreateTask} ids={Ids} />

      {/* Tell us if task is assigned */}
      <div className="container">Tell us if task is assigned</div>
    </ErrorBoundary>
  );
}

export default Workspace;
