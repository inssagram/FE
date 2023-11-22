import axiosInstance from "../axiosInstance";

const getFollowingMemberPostAllAxios = (): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/post/following-member`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getFollowingMemberPostAllAxios;
