import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/atoms/Header";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import Footer from "@/components/Footer";
import { RootState } from "@/src/redux/Posts/store";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";
import postLikePostAxios from "@/services/postInfo/postLikePost";

interface ExplorePostData {
  postId: number;
  memberId: number;
  nickname: string;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

const Post: React.FC = () => {
  const userInfo: any = useSelector((state: RootState) => state.user.member);
  console.log("UserInfo:", userInfo);
  const [post, setPost] = useState<ExplorePostData | null>(null);

  const router = useRouter();
  const { id } = router.query as { id: string };
  const pageTitle = "탐색 탭";

  const fetchPostDetailData = async (id: string) => {
    try {
      const response = await getPostDetailAxios(id);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLikeClick = (postId: number) => {
    postLikePostAxios(postId)
      .then((response) => {
        console.log(
          "게시물 좋아요가 서버에 성공적으로 전송되었습니다.",
          response
        );
      })
      .catch((error) => {
        console.error(
          "게시물 좋아요를 서버로 전송하는 중 오류가 발생했습니다.",
          error
        );
      });
  };

  useEffect(() => {
    if (id) {
      fetchPostDetailData(id);
    }
  }, [id]);

  return (
    <>
      <PageHeader title={pageTitle} />
      {post && <PostTop post={post} />}
      {post && (
        <PostContents
          post={post}
          userInfo={userInfo}
          handleLikeClick={handleLikeClick}
        />
      )}
      <Footer />
    </>
  );
};

export default Post;
