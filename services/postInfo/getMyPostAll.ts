import axiosInstance from "../axiosInstance";

const getMyPostAllAxios = async (memberId: number): Promise<any> => {
  return await axiosInstance({
    method: "get",
    url: `/post/member?`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "member-id": memberId,
    },
  });
};

export default getMyPostAllAxios;
