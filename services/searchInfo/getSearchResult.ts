import axiosInstance from "../axiosInstance";

const getSearchResultAxios = async (keyword: string): Promise<any> => {
  return await axiosInstance({
    method: "get",
    url: `/search/${keyword}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getSearchResultAxios;
