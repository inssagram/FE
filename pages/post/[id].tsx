import * as SC from "./styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PostContent from "../../components/atoms/post/PostContent";
import Footer from "../../components/Footer";

interface Post {
  id: number;
  title: string;
  imageUrl: string;
}

const Post: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

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
    }
  }, [id]);

  return (
    <>
      <SC.Header>
        <SC.BackIcon>
          <FontAwesomeIcon icon={faArrowLeft} fontSize={24} />
        </SC.BackIcon>
        <SC.Title>탐색 탭</SC.Title>
      </SC.Header>
      {post && <PostContent postId={post.id} />}
      <Footer />
    </>
  );
};

export default Post;