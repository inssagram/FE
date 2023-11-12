import axiosInstance from "../axiosInstance";

const getLikePostMemberListAxios = (postId: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/like/member-list/post`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "post-id": postId,
    },
  });
};

export default getLikePostMemberListAxios;
