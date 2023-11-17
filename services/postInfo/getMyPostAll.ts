import axiosInstance from "../axiosInstance";

const getMyPostAllAxios = (): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/my`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getMyPostAllAxios;
