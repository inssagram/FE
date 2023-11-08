import customAxios from "../customAxios";

const postLikeCommentAxios = async (commentId: number): Promise<any> => {
  return await customAxios({
    method: "post",
    url: `/like/comment`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "comment-id": commentId,
    },
  });
};

export default postLikeCommentAxios;
