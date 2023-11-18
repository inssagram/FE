import axiosInstance from "../axiosInstance";

const getChatRoomDataAxios = (roomId: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/chat/room/${roomId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getChatRoomDataAxios;
