import axiosInstance from "../axiosInstance";

const postMemberFollowAxios = (followId: number): Promise<any> => {
  const followData = {
    followId,
  };
  return axiosInstance({
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
