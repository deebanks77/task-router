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
      throw new Error(error);
    });

  return res;
};
export const getWorkspaceWorkerApi = async ({ workspaceId }) => {
  const res = axiosInstance
    .get(`/worker/${workspaceId}`)
    .then((response) => {
      console.log("Get workspace workers successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};
export const updateWorkerApi = async ({
  workerId,
  workspaceId,
  activityId,
}) => {
  const res = axiosInstance
    .put(`/worker/${workspaceId}/${workerId}`, {
      activityId,
    })
    .then((response) => {
      console.log("Update Reservation Status successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
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
      throw new Error(error);
    });

  return res;
};

export const workerReservationResponseApi = async ({
  workerId,
  workspaceId,
  reservationId,
  instruction,
  activityId,
}) => {
  const res = axiosInstance
    .post(
      `/worker/assignment/response/${workspaceId}/${workerId}/${reservationId}`,
      { instruction, activityId }
    )
    .then((response) => {
      console.log("Worker Reservation Response Status successful:", response);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};
