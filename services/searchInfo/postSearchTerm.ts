import customAxios from "../customAxios";

const postSearchTermAxios = async (memberId: number): Promise<any> => {
  const SearchData = {
    memberId,
  };

  return await customAxios({
    method: "post",
    url: `/search/save`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: SearchData,
  });
};

export default postSearchTermAxios;
