import customAxios from "../customAxios";

const postBookmarkPostAxios = async (postId: number): Promise<any> => {
  const postData = {
    postId,
  };
  return await customAxios({
    method: "post",
    url: `/bookmark/save`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: postData,
  });
};

export default postBookmarkPostAxios;
