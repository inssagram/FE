import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
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
import { handleError } from "@/utils/errorHandler";
import { HeartButton } from "@/components/atoms/Button";
import postLikePostAxios from "@/services/postInfo/postLikePost";
import postBookmarkPostAxios from "@/services/postInfo/postBookmarkPost";
import deleteBookmarkPostAxios from "@/services/postInfo/deleteBookmarkPost";

interface PostData {
  postId: number;
  memberId: number;
  nickName: string;
  image: [string];
  contents: string;
  likeCount: number;
  commentsCounts: number;
  hashTags: string;
}

interface CommentData {
  postId: number;
}

interface UserInfo {
  email: string;
  member_id: number;
  nickname: string;
  job: string;
  profilePic: string;
}

type HandleLikeClick = (postId: number) => void;

interface PostContentsProps {
  post: PostData;
  userInfo: UserInfo;
  handleLikeClick: HandleLikeClick;
}

const PostContents: React.FC<PostContentsProps> = ({ post, userInfo }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleActionClick = async (postId: number, actionType: string) => {
    try {
      let res;
      switch (actionType) {
        case "like":
          res = await postLikePostAxios(postId);
          setIsLiked(!isLiked);
          break;
        case "bookmark":
          res = await (isSaved
            ? deleteBookmarkPostAxios(postId)
            : postBookmarkPostAxios(postId));
          setIsSaved(!isSaved);
          break;
        default:
          break;
      }
      console.log("success", res);
    } catch (err) {
      handleError(err, "error");
    }
  };

  const handleCommentClick = () => {
    router.push(`/my/feeds/${post.postId}/comments`);
  };

  return (
    <div>
      {post.image ? (
        <PostImage src={post.image[0]} alt="게시글" width={412} height={412} />
      ) : (
        <PostImage
          src={"/images/noImage.svg"}
          alt="게시글"
          width={412}
          height={412}
        />
      )}
      <PostDetails>
        <ButtonArea>
          <Left>
            <HeartButton
              isLiked={isLiked}
              handleLikeClick={() => handleActionClick(post.postId, "like")}
            />
            <Link href={`/my/feeds/${post.postId}/comments`}>
              <FontAwesomeIcon icon={faComment} fontSize={24} />
            </Link>
            {userInfo ? (
              <Link href={`/direct/in/${post.memberId}`}>
                <FontAwesomeIcon icon={faPaperPlane} fontSize={24} />
              </Link>
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} fontSize={24} />
            )}
          </Left>
          <Right>
            <FontAwesomeIcon
              onClick={() => handleActionClick(post.postId, "bookmark")}
              icon={isSaved ? fasBookmark : farBookmark}
              fontSize={24}
            />
          </Right>
        </ButtonArea>
        <Link href={`/post/liked_by/${post.postId}`}>
          {post.likeCount > 0 && (
            <LikesArea>{post.likeCount} 명이 좋아합니다</LikesArea>
          )}
        </Link>
        <CommentsArea>
          <Details>
            <Name>{post.nickName}</Name>
            <Contents>{post.contents}</Contents>
          </Details>
          {post.commentsCounts > 0 && (
            <MoreComments onClick={handleCommentClick}>
              댓글 {post.commentsCounts}개 보기
            </MoreComments>
          )}
          <CreatedAt>2일전</CreatedAt>
        </CommentsArea>
      </PostDetails>
    </div>
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
  margin-bottom: 13px;
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
