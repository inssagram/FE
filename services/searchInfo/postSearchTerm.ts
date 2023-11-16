import axiosInstance from "../axiosInstance";

const postSearchTermAxios = (memberId: number): Promise<any> => {
  const SearchData = {
    memberId,
  };

  return axiosInstance({
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
