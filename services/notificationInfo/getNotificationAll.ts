import axiosInstance from "../axiosInstance";

const getNotificationAllAxios = async (): Promise<any> => {
  return await axiosInstance({
    method: "get",
    url: `/notification/all`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getNotificationAllAxios;
