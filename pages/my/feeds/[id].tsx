import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/atoms/Header";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import Footer from "@/components/Footer";
import getPostDetailAxios from "@/services/postInfo/getPostDetail";
import { RootState } from "@/src/redux/Posts/store";
import getCommentAxios from "@/services/postInfo/getComment";


interface PostData {
  postId: number;
  memberId: number;
  nickname: string;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}



const Feeds: React.FC = () => {
  const userInfo: any = useSelector((state: RootState) => state.user.member);
  const [post, setPost] = useState<PostData[]>([]);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const pageTitle = "게시물";

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

  return (
    <>
      <PageHeader title={pageTitle} />
      <PostTop post={post} />
      <PostContents
        post={post}
        userInfo={userInfo}
      />
      <Footer />
    </>
  );
};

export default Feeds;
