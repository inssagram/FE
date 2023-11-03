import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import getPostAllAxios from "@/services/postInfo/getPostAll";
import { RootState } from "@/src/redux/Posts/store";

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

const Main: React.FC = () => {
  const userInfo: any = useSelector((state: RootState) => state.user.member);
  console.log("UserInfo:", userInfo);
  const [posts, setPosts] = useState<PostData[]>([]);

  const router = useRouter();
  const { id } = router.query as { id: string };

  const fetchPostData = async () => {
    try {
      const response = await getPostAllAxios();
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleCommentClick = () => {
    router.push(`/my/feeds/${id}/comments`);
  };

  return (
    <Layout>
      <PostArea>
        {posts.map((post, index) => (
          <Post key={index}>
            <PostTop post={post} />
            <PostContents
              post={post}
              userInfo={userInfo}
              handleCommentClick={handleCommentClick}
            />
          </Post>
        ))}
      </PostArea>
    </Layout>
  );
};

const PostArea = styled.section`
  padding: 44px 0 48px 0;
`;

const Post = styled.article`
  border-bottom: 1px solid #ccc;
`;

export default Main;
