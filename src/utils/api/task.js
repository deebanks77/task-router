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
      throw new Error(error);
    });

  return res;
};

export const getAllTaskApi = async ({ pageNumber, pageSize, workspaceId }) => {
  const res = axiosInstance
    .get(`/task/${workspaceId}/${pageNumber}/${pageSize}`)
    .then((response) => {
      console.log("Get all Task successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};

export const getSingleTaskApi = async ({ taskId, workspaceId }) => {
  const res = axiosInstance
    .get(`/task/${workspaceId}/${taskId}`)
    .then((response) => {
      console.log("Get Task successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};

export const completeTaskApi = async ({ taskId, workspaceId, reason }) => {
  const res = axiosInstance
    .post(`/task/complete/${workspaceId}/${taskId}`, {
      reason,
    })
    .then((response) => {
      console.log("complete Task successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};

export const cancleTaskApi = async ({ reason, taskId, workspaceId }) => {
  const res = axiosInstance
    .post(`/task/cancle/${workspaceId}/${taskId}`, {
      reason,
    })
    .then((response) => {
      console.log("Cancle Task successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};
