import customAxios from "../customAxios";

const getNotificationAllAxios = async (): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/notification/all`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getNotificationAllAxios;
