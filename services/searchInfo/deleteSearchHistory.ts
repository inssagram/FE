import customAxios from "../customAxios";

const deleteSearchHistoryAxios = async (keyword: string): Promise<any> => {
  return await customAxios({
    method: "delete",
    url: `/search/${keyword}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default deleteSearchHistoryAxios;
