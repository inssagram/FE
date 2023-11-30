import axiosInstance from "../axiosInstance";

const getMyChatListAllAxios = (): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/chat`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getMyChatListAllAxios;
