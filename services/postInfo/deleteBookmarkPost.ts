import axiosInstance from "../axiosInstance";

const deleteBookmarkPostAxios = async (postId: number): Promise<any> => {
  const postData = {
    postId,
  };
  return await axiosInstance({
    method: "delete",
    url: `/bookmark/delete`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: postData,
  });
};

export default deleteBookmarkPostAxios;
