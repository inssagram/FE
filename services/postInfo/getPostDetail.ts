import customAxios from "../customAxios";

const getPostDetailAxios = async (id: string): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/post/search-detail/${id}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getPostDetailAxios;
