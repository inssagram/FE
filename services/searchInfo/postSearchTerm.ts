import axiosInstance from "../axiosInstance";

const postSearchTermAxios = async (memberId: number): Promise<any> => {
  const SearchData = {
    memberId,
  };

  return await axiosInstance({
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
