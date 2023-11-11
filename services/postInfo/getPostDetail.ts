import axiosInstance from "../axiosInstance";

const getPostDetailAxios = (postId: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/post/search-detail/${postId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getPostDetailAxios;
