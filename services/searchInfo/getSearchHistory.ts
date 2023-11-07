import customAxios from "../customAxios";

const getSearchHistoryAxios = async (): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/search`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getSearchHistoryAxios;
