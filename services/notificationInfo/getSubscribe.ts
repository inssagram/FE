import customAxios from "../customAxios";

const getNotificationSubscribeAxios = async (): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/notification/subscribe`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getNotificationSubscribeAxios;
