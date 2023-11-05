import customAxios from "../customAxios";

const postLikePostAxios = async (postId: number): Promise<any> => {
  return await customAxios({
    method: "post",
    url: `/like/post`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "post-id": postId,
    },
  });
};

export default postLikePostAxios;
