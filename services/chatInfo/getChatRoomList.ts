import axiosInstance from "../axiosInstance";

const getChatRoomListAxios = (memberId: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/chat/room/list`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "member-id": memberId,
    },
  });
};

export default getChatRoomListAxios;
