import axiosInstance from "../axiosInstance";

const getSearchHistoryAxios = async (): Promise<any> => {
  return await axiosInstance({
    method: "get",
    url: `/search`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getSearchHistoryAxios;
