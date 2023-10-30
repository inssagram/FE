import * as SC from "@/components/styled/main";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import getPostAllAxios from "@/services/postInfo/getPostAll";

interface Post {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

const Main: React.FC = () => {
  const [post, setPost] = useState<Post[]>([]);

  const getPostAll = async () => {
    try {
      const response = await getPostAllAxios();
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostAll();
  }, []);

  return (
    <Layout>
      {post.map((item, index) => (
        <SC.Article key={index}>
          <PostTop post={item} />
          <PostContents post={item} />
        </SC.Article>
      ))}
    </Layout>
  );
};

export default Main;
