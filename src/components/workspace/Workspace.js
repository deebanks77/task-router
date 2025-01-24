import React, { useContext, useEffect, useState } from "react";
import CreateWorkspace from "./CreateWorkspace";
import UpdateWorkspace from "./UpdateWorkspace";
import { createWorkspaceApi, createWorkflowApi } from "../../utils/api";
import CreateWorkflow from "../workflow/CreateWorkflow";
import Queue from "../queues/Queues";
import { createQueueApi } from "../../utils/api";
import Worker from "../workers/Worker";
import Task from "../tasks/Tasks";
import { createTaskApi } from "../../utils/api/task";
import { createWorkerApi, updateWorkerApi } from "../../utils/api/worker";
import ErrorBoundary from "../../components/ErrorBoundery";
import { AppContext } from "../../store/store";
import { toast } from "react-toastify";

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

  useEffect(() => {
    localStorage.setItem("Workspace", JSON.stringify(updateWorkspace));
  }, [updateWorkspace]);

  useEffect(() => {
    localStorage.setItem("Queue", JSON.stringify(queues));
  }, [queues]);

  useEffect(() => {
    localStorage.setItem("Workflow", JSON.stringify(workflow));
  }, [workflow]);

  useEffect(() => {
    localStorage.setItem("CreateWorkerResponse", JSON.stringify(workerCreated));
  }, [workerCreated]);

  useEffect(() => {
    localStorage.setItem("Ids", JSON.stringify(Ids));
  }, [Ids]);

  useEffect(() => {
    localStorage.setItem("WorkerActivities", JSON.stringify(workerActivities));
  }, [workerActivities]);

  const { eventCallbackData } = useContext(AppContext);

  useEffect(() => {
    console.log("eventCallbackData", eventCallbackData);
    if (eventCallbackData?.msg === "keep alive") return;

    if (typeof eventCallbackData === "object") {
      if (eventCallbackData.eventType === "worker.created") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Worker Created</h3>
            <p>Name: {eventCallbackData.name}</p>
            <p>WorkerId: {eventCallbackData.workerId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>ActivityId: {eventCallbackData.activityId}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "worker.activity.update") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Worker activity updated</h3>
            <p>WorkerId: {eventCallbackData.workerId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>ActivityId: {eventCallbackData.activityId}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "task.assigned") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Task Assigned!</h3>
            <p>TaskId: {eventCallbackData.taskId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>Status: {eventCallbackData.assignmentStatus}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "task.reserved") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Task Reserved!</h3>
            <p>TaskId: {eventCallbackData.taskId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>Status: {eventCallbackData.assignmentStatus}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "task.completed") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Task Completed!</h3>
            <p>TaskId: {eventCallbackData.taskId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>Status: {eventCallbackData.assignmentStatus}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "reservation.accepted") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Reservation Accepted</h3>
            <p>WorkflowId: {eventCallbackData.workflowId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>QueueId: {eventCallbackData.queueId}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "reservation.canceled") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Reservation Cancled</h3>
            <p>WorkflowId: {eventCallbackData.workflowId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>QueueId: {eventCallbackData.queueId}</p>
          </div>
        );
      }
      if (eventCallbackData.eventType === "reservation.rejected") {
        console.log("event", eventCallbackData);
        toast.success(
          <div>
            <h3>Reservation Rejected</h3>
            <p>WorkflowId: {eventCallbackData.workflowId}</p>
            <p>WorkspaceId: {eventCallbackData.workspaceId}</p>
            <p>QueueId: {eventCallbackData.queueId}</p>
          </div>
        );
      }
    }
  }, [eventCallbackData]);

  return (
    <ErrorBoundary>
      {/* Workspace */}
      <CreateWorkspace handleCreateWorkspace={handleCreateWorkspace} />
      <UpdateWorkspace
        handleUpdateWorkspace={handleUpdateWorkspace}
        updateWorkspace={updateWorkspace}
      />

      {/* Queue */}
      <Queue handleCreateQueue={handleCreateQueue} queues={queues} ids={Ids} />

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
