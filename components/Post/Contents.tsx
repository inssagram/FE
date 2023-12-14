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
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/errorHandler";
import { HeartButton } from "@/components/atoms/Button";
import postLikePostAxios from "@/services/postInfo/postLikePost";
import postBookmarkPostAxios from "@/services/postInfo/postBookmarkPost";
import deleteBookmarkPostAxios from "@/services/postInfo/deleteBookmarkPost";
import { PostDetailData } from "@/types/PostTypes";

// type HandleLikeClick = (postId: number) => void;

interface PostContentsProps {
  post: PostDetailData;
  // handleLikeClick: HandleLikeClick;
}

const PostContents: React.FC<PostContentsProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const [slideProps, setSlideProps] = useState<number>(0)



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
    router.push(`/post/${post.postId}/comments`);
  };

  const handleSlideProps = (direction: string) => {
    if(direction === "right" && slideProps <= post.image.length){
      setSlideProps((prev) => prev + 1)
      return
    }
    if(direction === "left" && slideProps !== 0){
      setSlideProps((prev) => prev - 1)
      return
    }
  }


  console.log(post.image)

  

  return (
    <div>
      <Slide>
          {slideProps > 0 ? (
              <LeftButton onClick={() => handleSlideProps("left")}>
                <FontAwesomeIcon icon={faCircleChevronLeft}/>
              </LeftButton>)
              : null}
            {post.image.length > 1 && slideProps < post.image.length - 1 ? (
              <RightButton onClick={() => handleSlideProps("right")}>
                <FontAwesomeIcon icon={faCircleChevronRight}/>
              </RightButton>)
              : null 
          }
        <ImageList slideProps={slideProps}>
          {post.image.length > 0 ? (
            post.image.map((v, i) => (
            <ImageItem key={i}>
              <Image
                src={v}
                alt={v}
                fill={true}
                />
            </ImageItem>
            ))
        ) : undefined}
        </ImageList>
      </Slide>
      <PostDetails>
        <ButtonArea>
          <Left>
            <HeartButton
              isLiked={isLiked}
              onClick={() => handleActionClick(post.postId, "like")}
            />
            <Link href={`/post/${post.postId}/comments`}>
              <FontAwesomeIcon icon={faComment} fontSize={24} />
            </Link>
            <Link href={`/post/share/${post.postId}`}>
              <FontAwesomeIcon icon={faPaperPlane} fontSize={24} />
            </Link>
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

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

interface SlideProps{
  slideProps: number
}

const ImageList = styled.ul<SlideProps>`
  display: flex;
  gap: 20px;
  width: 100%;
  min-height: 412px;
  transform: translateX(${(props) => props.slideProps * (-432)}px);
  transition: 0.3s ease-in-out;
`

const ImageItem = styled.li`
  min-width: 412px;
  min-height: 412px;
  position: relative;
`

const LeftButton = styled.button`
  color: white;
  width: 30px;
  height: 30px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  left: 0;
  z-index: 10;
`

const RightButton = styled.button`
  color: white;
  width: 30px;
  height: 30px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 10;
`


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
