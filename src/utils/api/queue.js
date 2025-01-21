import axiosInstance from "../invoke";

export const createQueueApi = async ({
  name,
  taskOrder,
  expression,
  maxReservedWorkers,
  reservationActivityId,
  assignmentActivityId,
  workspaceId,
}) => {
  console.log({
    name,
    taskOrder,
    expression,
    maxReservedWorkers,
    reservationActivityId,
    assignmentActivityId,
    workspaceId,
  });
  const res = axiosInstance
    .post(`/queue/${workspaceId}`, {
      name,
      taskOrder,
      expression,
      maxReservedWorkers,
      reservationActivityId,
      assignmentActivityId,
    })
    .then((response) => {
      console.log("Create Queue successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during create queue:", error);
    });

  return res;
};
