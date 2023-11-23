import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import Footer from "@/components/Footer";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";
import { PostDetailData } from "@/types/PostTypes";

const Post: React.FC = () => {
  const [post, setPost] = useState<PostDetailData | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const postId: number = typeof id === "string" ? parseInt(id, 10) : -1;
  const pageTitle = "탐색 탭";

  const fetchPostDetailData = async (postId: number) => {
    try {
      const res = await getPostDetailAxios(postId);
      setPost(res.data);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostDetailData(postId);
    }
  }, [postId]);

  return (
    <>
      <PageHeader title={pageTitle} />
      {post && <PostTop post={post} />}
      {post && <PostContents post={post} />}
      <Footer />
    </>
  );
};

export default Post;
