import invoke from "../invoke";
import axiosInstance from "../invoke";

export const createWorkspaceApi = async ({
  name,
  eventCallbackUrl,
  multiTaskEnabled,
  queueOrderPriority,
  eventsFilters,
}) => {
  const res = axiosInstance
    .post("/workspace", {
      name,
      eventCallbackUrl,
      multiTaskEnabled,
      queueOrderPriority,
      eventsFilters,
    })
    .then((response) => {
      console.log("Create workspace successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during create workspace:", error);
    });

  return res;
};

export const updateWorkspaceApi = async ({
  name,
  eventCallbackUrl,
  multiTaskEnabled,
  queueOrderPriority,
  eventsFilters,
  workspaceId,
}) => {
  const res = axiosInstance
    .put(`/workspace/${workspaceId}`, {
      name,
      eventCallbackUrl,
      multiTaskEnabled,
      queueOrderPriority,
      eventsFilters,
    })
    .then((response) => {
      console.log("Update workspace successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during update workspace:", error);
    });

  return res;
};
