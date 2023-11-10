import axiosInstance from "../axiosInstance";

const getPostAllAxios = (): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: "/post/all",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getPostAllAxios;
