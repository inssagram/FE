import axiosInstance from "../axiosInstance";

const postChatRoomAxios = (name: string): Promise<any> => {
  return axiosInstance({
    method: "post",
    url: `/chat/room`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      name: name,
    },
  });
};

export default postChatRoomAxios;
