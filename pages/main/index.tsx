import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import getPostAllAxios from "@/services/postInfo/getPostAll";
import { RootState } from "@/src/redux/Posts/store";

interface PostData {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

const Main: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const userInfo: any = useSelector((state: RootState) => state.user.member);
  console.log("UserInfo:", userInfo);

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

  return (
    <Layout>
      <PostArea>
        {posts.map((post, index) => (
          <Post key={index}>
            <PostTop post={post} />
            <PostContents userInfo={userInfo} post={post} />
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
