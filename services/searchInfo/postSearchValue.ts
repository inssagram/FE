import customAxios from "../customAxios";

const postSearchValueAxios = async (memberId: number): Promise<any> => {
  return await customAxios({
    method: "post",
    url: `/search/save/${memberId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default postSearchValueAxios;
