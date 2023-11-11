import axiosInstance from "../axiosInstance";

const postBookmarkPostAxios = (postId: number): Promise<any> => {
  const postData = {
    postId,
  };
  return axiosInstance({
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
