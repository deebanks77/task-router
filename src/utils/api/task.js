import axiosInstance from "../invoke";

export const createTaskApi = async ({
  workflowId,
  taskChannel,
  priority,
  timeout,
  virtualStartTime,
  attributes,
  routingTarget,
  ignoreCapacity,
  queueId,
  callbackUrl,
  workspaceId,
}) => {
  console.log({
    workflowId,
    taskChannel,
    priority,
    timeout,
    virtualStartTime,
    attributes,
    routingTarget,
    ignoreCapacity,
    queueId,
    callbackUrl,
    workspaceId,
  });
  const res = axiosInstance
    .post(`/task/${workspaceId}`, {
      workflowId,
      taskChannel,
      priority,
      timeout,
      virtualStartTime,
      attributes,
      routingTarget,
      ignoreCapacity,
      queueId,
      callbackUrl,
      workspaceId,
    })
    .then((response) => {
      console.log("Create Task successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during create Task:", error);
    });

  return res;
};
