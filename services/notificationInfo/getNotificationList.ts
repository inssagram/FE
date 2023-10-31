import customAxios from "../customAxios";

const getNotificationListAxios = async (
  token: string,
  pageParam: number
): Promise<NotificationListType> => {
  const response = await customAxios({
    method: "get",
    url: "",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};

export default getNotificationListAxios;
