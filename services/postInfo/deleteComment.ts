import axiosInstance from "../axiosInstance";

const deleteCommentAxios = (id: number): Promise<any> => {
  return axiosInstance({
    method: "delete",
    url: `/comment/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default deleteCommentAxios;
