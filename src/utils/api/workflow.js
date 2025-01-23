import axiosInstance from "../invoke";

export const createWorkflowApi = async ({
  name,
  configuration,
  documentContentType,
  taskReservationTimeout,
  assignmentCallbackUrl,
  fallbackCallbackUrl,
  workspaceId,
}) => {
  const res = axiosInstance
    .post(`/workflow/${workspaceId}`, {
      name,
      configuration,
      documentContentType,
      taskReservationTimeout,
      assignmentCallbackUrl,
      fallbackCallbackUrl,
    })
    .then((response) => {
      console.log("Create workflow successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during create workflow:", error);
      throw new Error(error);
    });

  return res;
};
