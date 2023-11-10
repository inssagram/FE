import axiosInstance from "../axiosInstance";

const postMemberFollowAxios = async (followId: number): Promise<any> => {
  const followData = {
    followId,
  };
  return await axiosInstance({
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
