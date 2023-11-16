import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { handleError } from "@/utils/errorHandler";
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
  const [posts, setPosts] = useState<PostData[]>([]);

  const fetchPostData = useCallback(async () => {
    try {
      const res = await getPostAllAxios();
      setPosts(res.data);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
  }, []);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  return (
    <Layout>
      <PostArea>
        {posts.map((post, index) => (
          <Post key={index}>
            <PostTop post={post} />
            <PostContents post={post} userInfo={userInfo} />
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
