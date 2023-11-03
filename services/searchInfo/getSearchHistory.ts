import customAxios from "../customAxios";

const getSearchHistoryAxios = async (memberId: number): Promise<any> => {
  const searchData = {
    memberId,
  };

  return await customAxios({
    method: "get",
    url: `/search`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: searchData,
  });
};

export default getSearchHistoryAxios;
