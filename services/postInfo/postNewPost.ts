import customAxios from "../customAxios";

const postNewPostAxios = async (
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

  return await customAxios({
    method: "post",
    url: `/post/create`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: postData,
  });
};

// 호출 페이지에서 try-catch 블록 사용
// try {
//   const response = await postNewPostAxios(memberId, image, contents, location, hashTags);
//   console.log("Post created:", response);
// } catch (error) {
//   console.error("Error creating post:", error);
// }

export default postNewPostAxios;
