import axiosInstance from "../axiosInstance";

const getMemberPostAllAxios = (memberId: number): Promise<any> => {
  return axiosInstance({
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

export default getMemberPostAllAxios;
