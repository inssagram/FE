import customAxios from "../customAxios";

const getNotificationListAllAxios = async (): Promise<string> => {
  return await customAxios({
    method: "get",
    url: `/notification/all`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getNotificationListAllAxios;
