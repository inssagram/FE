import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import Layout from "@/components/Layout";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import getFollowingMemberPostAllAxios from "@/services/postInfo/getFollowingMemberPostAll";
import { PostDetailData } from "@/types/PostTypes";

const Main: React.FC = () => {
  const [posts, setPosts] = useState<PostDetailData[]>([]);

  const fetchFollowingMemberPostData = useCallback(async () => {
    try {
      const res = await getFollowingMemberPostAllAxios();
      setPosts(res.data);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
  }, []);

  useEffect(() => {
    fetchFollowingMemberPostData();
  }, [fetchFollowingMemberPostData]);

  return (
    <Layout>
      <PostArea>
        {posts.map((post, index) => (
          <Post key={index}>
            <PostTop post={post} />
            <PostContents post={post} />
          </Post>
        ))}
      </PostArea>
    </Layout>
  );
};

export default Main;

const PostArea = styled.section`
  padding: 44px 0 48px 0;
`;

const Post = styled.article`
  border-bottom: 1px solid #ccc;
`;
