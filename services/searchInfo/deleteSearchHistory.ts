import axiosInstance from "../axiosInstance";

const deleteSearchHistoryAxios = async (keyword: string): Promise<any> => {
  return await axiosInstance({
    method: "delete",
    url: `/search/${keyword}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default deleteSearchHistoryAxios;
