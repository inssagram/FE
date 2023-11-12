import axiosInstance from "../axiosInstance";

const deleteNotificationAxios = (id: number): Promise<any> => {
  return axiosInstance({
    method: "delete",
    url: `/notification/${id}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default deleteNotificationAxios;
