import axiosInstance from "../axiosInstance";

const getSearchResultAxios = (keyword: string): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/search/${keyword}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getSearchResultAxios;
