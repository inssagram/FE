import axiosInstance from "../axiosInstance";

const postNewPostAxios = (
  memberId: number,
  image: string,
  contents: string,
  location: string,
  hashTags: string[]
): Promise<any> => {
  const postData = {
    memberId,
    image,
    contents,
    location,
    hashTags,
  };

  return axiosInstance({
    method: "post",
    url: `/post/create`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: postData,
  });
};

export default postNewPostAxios;
