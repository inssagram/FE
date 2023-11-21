import axiosInstance from "../axiosInstance";

const postSharePostAxios = (
  type: string,
  receiverMemberId: number,
  postId: number,
  message: string
): Promise<any> => {
  const sharePostData = {
    type,
    receiverMemberId,
    postId,
    message,
  };
  return axiosInstance({
    method: "post",
    url: `/chat/share/post`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: sharePostData,
  });
};

export default postSharePostAxios;
