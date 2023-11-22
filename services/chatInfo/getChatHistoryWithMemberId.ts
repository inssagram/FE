import axiosInstance from "../axiosInstance";

const getChatHistoryWithMemberIdAxios = (id: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/chat/enter-after-search/room/receiver`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      receiverMemberId: id,
    },
  });
};

export default getChatHistoryWithMemberIdAxios;
