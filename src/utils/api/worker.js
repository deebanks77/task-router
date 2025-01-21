import axiosInstance from "../invoke";

export const createWorkerApi = async ({
  name,
  attributes,
  activity,
  workspaceId,
}) => {
  const res = axiosInstance
    .post(`/worker/${workspaceId}`, {
      name,
      attributes,
      activity,
    })
    .then((response) => {
      console.log("Create worker successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during create worker:", error);
    });

  return res;
};
export const updateWorkerApi = async ({
  workerId,
  workspaceId,
  activiteId,
}) => {
  const res = axiosInstance
    .put(`/worker/${workspaceId}/${workerId}`, {
      activityId: activiteId,
    })
    .then((response) => {
      console.log("Update Reservation Status successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during Update Worker Reservation Status :", error);
    });

  return res;
};

export const getWorkerReservationApi = async ({ workerId, workspaceId }) => {
  const res = axiosInstance
    .get(`/worker/reservation/${workspaceId}/${workerId}`)
    .then((response) => {
      console.log("Get Worker Reservation Status successful:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error during get Worker Reservation Status :", error);
    });

  return res;
};
