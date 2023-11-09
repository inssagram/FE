import axiosInstance from "../axiosInstance";

const getUserDetailAxios = async (nickname: string): Promise<any> => {
  return await axiosInstance({
    method: "get",
    url: `/member/detail/${nickname}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getUserDetailAxios;
