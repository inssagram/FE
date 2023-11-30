import axiosInstance from "../axiosInstance";

const postNewMessageAxios = (roomId: number): Promise<any> => {
  return axiosInstance({
    method: "post",
    url: `/chat.message.${roomId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default postNewMessageAxios;
