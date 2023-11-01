import axios from "axios";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faComment,
  faPaperPlane,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";

interface UserInfo {
  email: string;
  member_id: number;
  nickname: string;
  job: string;
  profilePic: string;
}

interface PostData {
  postId: number;
  memberId: number;
  image: string;
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

interface PostContentsProps {
  userInfo: UserInfo;
  post: PostData;
}

const PostContents: React.FC<PostContentsProps> = ({ userInfo, post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    axios
      .post("http://localhost:3001/likeStatus", {
        like: !isLiked,
        user: userInfo,
      })
      .then((response) => {
        console.log("좋아요 상태가 서버에 업데이트되었습니다.", response);
      })
      .catch((error) => {
        console.error("좋아요 상태가 업데이트 중 오류가 발생했습니다", error);
      });
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    axios
      .post("http://localhost:3001/saveStatus", {
        save: !isSaved,
        user: userInfo,
      })
      .then((response) => {
        console.log("저장하기 상태가 서버에 업데이트되었습니다.", response);
      })
      .catch((error) => {
        console.error(
          "저장하기 상태가 업데이트 중 오류가 발생했습니다.",
          error
        );
      });
  };

  return (
    <>
      <PostImage
        src="/images/noImage.svg"
        alt="게시글"
        width={412}
        height={412}
      />
      {/* <PostImage src={post.image} alt="게시글" width={412} height={412} /> */}
      <PostDetails>
        <ButtonArea>
          <Left>
            <FontAwesomeIcon
              onClick={handleLikeClick}
              icon={isLiked ? fasHeart : farHeart}
              fontSize={"24px"}
              style={{ color: isLiked ? "red" : "inherit" }}
            />
            <FontAwesomeIcon icon={faComment} fontSize={"24px"} />
            {userInfo ? (
              <Link href={`/direct/in/${post.memberId}`}>
                <FontAwesomeIcon icon={faPaperPlane} fontSize={"24px"} />
              </Link>
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} fontSize={"24px"} />
            )}
          </Left>
          <Right>
            <FontAwesomeIcon
              onClick={handleSaveClick}
              icon={isSaved ? fasBookmark : farBookmark}
              fontSize={"24px"}
            />
          </Right>
        </ButtonArea>

        <LikesArea>godchaani님 외 {post.likeCount}명이 좋아합니다</LikesArea>

        <CommentsArea>
          <Details>
            <Name>{post.memberId}</Name>
            <Contents>{post.contents}</Contents>
          </Details>
          <MoreComments>댓글 {post.commentsCounts} 개 모두 보기</MoreComments>
          <CreatedAt>2일전</CreatedAt>
        </CommentsArea>
      </PostDetails>
    </>
  );
};

export default PostContents;

const PostImage = styled(Image)`
  min-width: 412px;
  min-height: 412px;
  width: 100%;
`;

const PostDetails = styled.section`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  font-size: 14px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  margin-top: 4px;
  padding: 6px 0 8px;
`;

const Left = styled.p`
  display: flex;
  flex-direction: row;

  & > * {
    padding: 8px;
  }
`;

const Right = styled.p`
  padding: 8px;
`;

const LikesArea = styled.div`
  margin-bottom: 14px;
`;

const CommentsArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  overflow: auto;
`;

const Details = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Name = styled.span`
  padding-right: 5px;
  font-weight: 600;
`;

const Contents = styled.span``;

const MoreComments = styled.button`
  display: flex;
  margin-bottom: 8px;
  border: none;
  font-size: inherit;
  color: #737373;
  background-color: transparent;
`;

const CreatedAt = styled.span`
  margin-bottom: 8px;
  font-size: 10px;
  color: #737373;
`;
