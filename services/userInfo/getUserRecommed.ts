import axiosInstance from "../axiosInstance";

const getUserRecommendAxios = (id: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/member/follow/recommend`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getUserRecommendAxios;
