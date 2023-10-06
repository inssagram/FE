import * as SC from "./styled";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

interface Post {
  id: number;
  name: string;
  imageUrl: string;
  content: string;
}

const PostContent: React.FC<{ postId: number }> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get<Post>(
          `http://localhost:3001/explores/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return (
      <SC.Loading>
        <FontAwesomeIcon icon={faSpinner} fontSize={"24px"} />
      </SC.Loading>
    );
  }

  return (
    <>
      <SC.ContentArea>
        <SC.ContentHeader>
          <SC.Account>
            <SC.Profile>
              <Image
                src="/images/profile.jpg"
                alt="프로필"
                width={32}
                height={32}
                style={{ borderRadius: "100%" }}
              />
            </SC.Profile>
            <SC.Id>{post.name}</SC.Id>
            <SC.FollowBtn>팔로우</SC.FollowBtn>
          </SC.Account>
          <SC.EtcIcon>
            <FontAwesomeIcon icon={faEllipsis} fontSize={"24px"} />
          </SC.EtcIcon>
        </SC.ContentHeader>
        <SC.ImageContent>
          <Image src={post.imageUrl} alt="프로필" width={412} height={412} />
        </SC.ImageContent>
        <SC.Details>
          <SC.Icons>
            <SC.Left>
              <FontAwesomeIcon icon={faHeart} fontSize={"24px"} />
              <FontAwesomeIcon icon={faComment} fontSize={"24px"} />
              <FontAwesomeIcon icon={faPaperPlane} fontSize={"24px"} />
            </SC.Left>
            <SC.Right>
              <FontAwesomeIcon icon={faBookmark} fontSize={"24px"} />
            </SC.Right>
          </SC.Icons>
          <SC.Likes>godchaani님 여러 명이 좋아합니다</SC.Likes>
          <SC.PostInfos>
            <SC.Desc>
              <SC.Writer>{post.name}</SC.Writer>
              <SC.PostContents>{post.content}</SC.PostContents>
            </SC.Desc>
            <SC.MoreComments>댓글 13개 모두 보기</SC.MoreComments>
          </SC.PostInfos>
          <SC.Date>2일전</SC.Date>
        </SC.Details>
      </SC.ContentArea>
    </>
  );
};

export default PostContent;
