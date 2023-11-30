import axiosInstance from "../axiosInstance";

const putUpdatePostAxios = (
  type: string,
  postId: number,
  postData: {
    contents: string;
    location?: string | null;
    taggedMemberIds?: number[] | null;
  }
): Promise<any> => {
  const { contents, location, taggedMemberIds } = postData;
  const postUpdateData = {
    type,
    contents,
    location,
    taggedMemberIds,
  };

  return axiosInstance({
    method: "put",
    url: `/post/update/${postId}`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: postUpdateData,
  });
};

export default putUpdatePostAxios;
