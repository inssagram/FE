import customAxios from "../customAxios";

const getPostDetailAxios = async (postId: number): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/post/search-detail/${postId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getPostDetailAxios;
