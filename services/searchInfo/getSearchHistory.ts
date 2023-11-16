import axiosInstance from "../axiosInstance";

const getSearchHistoryAxios = (): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/search`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getSearchHistoryAxios;
