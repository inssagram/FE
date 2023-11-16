import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import Footer from "@/components/Footer";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";
import { RootState } from "@/src/redux/Posts/store";

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
  const [post, setPost] = useState<ExplorePostData | null>(null);

  const router = useRouter();
  const { id } = router.query as { id: string };
  const pageTitle = "탐색 탭";

  const fetchPostDetailData = async (id: string) => {
    try {
      const res = await getPostDetailAxios(id);
      setPost(res.data);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
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
      {post && <PostContents post={post} userInfo={userInfo} />}
      <Footer />
    </>
  );
};

export default Post;
