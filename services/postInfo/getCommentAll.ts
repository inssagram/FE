import axiosInstance from "../axiosInstance";

const getCommentAllAxios = async (postId: number): Promise<any> => {
  return await axiosInstance({
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
