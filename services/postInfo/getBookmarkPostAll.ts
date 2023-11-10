import axiosInstance from "../axiosInstance";

const getBookmarkPostAllAxios = (): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/bookmark/all`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getBookmarkPostAllAxios;
