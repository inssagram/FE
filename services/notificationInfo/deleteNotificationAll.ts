import axiosInstance from "../axiosInstance";

const deleteNotificationAllAxios = (): Promise<any> => {
  return axiosInstance({
    method: "delete",
    url: `/notification/delete/all`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default deleteNotificationAllAxios;
