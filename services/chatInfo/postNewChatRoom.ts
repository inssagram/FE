import axiosInstance from "../axiosInstance";

const postNewChatRoomAxios = (
  firstParticipantId: number,
  secondParticipantId: number
): Promise<any> => {
  const createChatData = {
    firstParticipantId,
    secondParticipantId,
  };
  return axiosInstance({
    method: "post",
    url: `/chat/room/create`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: createChatData,
  });
};

export default postNewChatRoomAxios;
