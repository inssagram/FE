import axiosInstance from "../axiosInstance";

const deleteBookmarkPostAxios = (postId: number): Promise<any> => {
  const postData = {
    postId,
  };
  return axiosInstance({
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
