import customAxios from "../customAxios";

const getPostAllAxios = async (): Promise<string> => {
  return await customAxios({
    method: "get",
    url: `/post/all`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
  });
};

export default getPostAllAxios;
