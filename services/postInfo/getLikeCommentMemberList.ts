import axiosInstance from "../axiosInstance";

const getLikeCommentMemberListAxios = (commentId: number): Promise<any> => {
  return axiosInstance({
    method: "get",
    url: `/like/member-list/comment`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    params: {
      "comment-id": commentId,
    },
  });
};

export default getLikeCommentMemberListAxios;
