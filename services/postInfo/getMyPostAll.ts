import customAxios from "../customAxios";

const getMyPostAllAxios = async (memberId: number): Promise<any> => {
  return await customAxios({
    method: "get",
    url: `/post/member?`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "member-id": memberId,
    },
  });
};

export default getMyPostAllAxios;
