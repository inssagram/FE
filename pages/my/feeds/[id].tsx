import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/atoms/Header";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import Footer from "@/components/Footer";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";

interface PostData {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  taggedMembers: string;
  hashTags: string;
}

const Feeds: React.FC<PostData[]> = () => {
  const [post, setPost] = useState<PostData[]>([]);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const pageTitle = `게시물`;

  const fetchPostDetailData = async (id: string) => {
    try {
      const response = await getPostDetailAxios(id);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPostDetailData(id);
    }
  }, [id]);

  const handleCommentClick = () => {
    router.push(`/my/feeds/${id}/comments`);
  };

  return (
    <>
      <PageHeader title={pageTitle} />
      <PostTop post={post} />
      <PostContents post={post} handleCommentClick={handleCommentClick} />
      <Footer />
    </>
  );
};

export default Feeds;
