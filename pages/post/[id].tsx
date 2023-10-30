import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageHeader } from "@/components/atoms/Header";
import PostTop from "@/components/Post/Top";
import PostContents from "@/components/Post/Contents";
import Footer from "@/components/Footer";

interface Post {
  id: number;
  title: string;
  name: string;
  profileUrl: string;
  imageUrl: string;
  content: string;
}

interface Account {
  id: number;
  name: string;
  userId: string;
  profileUrl: string;
}

const Post: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const pageTitle = "탐색 탭";

  useEffect(() => {
    if (id) {
      axios
        .get<Post>(`http://localhost:3001/explores/${id}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        });

      axios
        .get<Account>(`http://localhost:3001/accounts/${id}`)
        .then((response) => {
          setAccount(response.data);
        })
        .catch((error) => {
          console.error("계정 데이터를 불러오는 중 오류 발생:", error);
        });
    }
  }, [id]);

  return (
    <>
      <PageHeader title={pageTitle} />
      {post && <PostTop post={post} />}
      {post && <PostContents post={post} account={account} />}
      <Footer />
    </>
  );
};

export default Post;
