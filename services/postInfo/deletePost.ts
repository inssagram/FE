import axiosInstance from "../axiosInstance";

const deletePostAxios = (postId: number): Promise<any> => {
  return axiosInstance({
    method: "delete",
    url: `/post/delete/${postId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default deletePostAxios;
