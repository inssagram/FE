import axiosInstance from "../axiosInstance";

const getCommentAllAxios = (postId: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/comment/search`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "post-id": postId,
    },
  });
};

export default getCommentAllAxios;
