import customAxios from "../customAxios";

const postMemberFollowAxios = async (followId: number): Promise<any> => {
  const followData = {
    followId,
  };
  return await customAxios({
    method: "post",
    url: `/member/follow`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: followData,
  });
};

export default postMemberFollowAxios;
