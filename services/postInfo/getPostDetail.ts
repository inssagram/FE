import axiosInstance from "../axiosInstance";

const getPostDetailAxios = async (postId: number): Promise<any> => {
  return await axiosInstance({
    method: "get",
    url: `/post/search-detail/${postId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getPostDetailAxios;
