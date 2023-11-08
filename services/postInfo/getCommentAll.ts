import customAxios from "../customAxios";

const getCommentAllAxios = async (postId: number): Promise<any> => {
  return await customAxios({
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
