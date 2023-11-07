import customAxios from "../customAxios";

const getSearchResultAxios = async (keyword: string): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/search/${keyword}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getSearchResultAxios;
