import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import getReplyAxios from "@/services/postInfo/getReply";
import postReplyAxios from "@/services/postInfo/postReply";
import postReplyToReplyAxios from "@/services/postInfo/postReplyToReply";
import { PostDetailData, CommentItemData } from "@/types/PostTypes";

interface CommentDataProps {
  post: PostDetailData;
}

export const CommentItem: React.FC<CommentDataProps> = ({ post }) => {
  return (
    <>
      <OriginalComment>
        <OriginalProfile>
          <Image
            src={post.memberImage ? post.memberImage : "/images/noProfile.jpg"}
            alt="프로필"
            width={42}
            height={42}
            style={{ borderRadius: "100%" }}
          />
        </OriginalProfile>
        <OriginalInfo>
          <OriginalDesc>
            <ID>{post.nickName}</ID>
            <Content>{post.contents}</Content>
          </OriginalDesc>
          <Date>16주</Date>
        </OriginalInfo>
      </OriginalComment>
    </>
  );
};

interface ReplyDataProps {
  userInfo: any;
  comment: CommentItemData;
  commentLikes: boolean[];
  handleLikeCommentClick: (commentId: number) => void;
  handleShowModal: (comment: any) => void;
  index: any;
  commentInputRef: React.RefObject<HTMLInputElement>
}

export const ReplyItem: React.FC<ReplyDataProps> = ({
  userInfo,
  comment,
  commentLikes,
  handleLikeCommentClick,
  handleShowModal,
  index,
  commentInputRef,
}) => {
  const [replyContent, setReplyContent] = useState<String>("");
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyToReply, setReplyToReplyId] = useState<number | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isReplyingToReply, setIsReplyingToReply] = useState(false);
  const [replycomments, setReplyComments] = useState<CommentItemData[]>([]);

  //   //답글달기 api 요청
  //   const fetchPostReplyData = async (parentCommentId: number, contents: string, mentionList: string[]) => {
  //     try {
  //         const res = await postReplyAxios(parentCommentId, contents, mentionList);
  //         setReplyContent(res.data);
  //     } catch (err) {
  //         handleError(err, "Error fetching posts reply");
  //     }
  // }

  //답글 달기
  const handleMoreCommentClick = (commentId: number) => {
    setIsReplying((prevIsReplying) => !prevIsReplying);
    setReplyToCommentId(commentId);
    setReplyContent(`@${comment.nickname} `); // Include the tagged username
    commentInputRef?.current?.focus();
  };
  //대댓글 불러오기
  const getMoreComment = async (commentId: number) => {
    if (replycomments.length > 0) {
      // 기존 답글이 있는 경우, 숨깁니다.
      setReplyComments([]);
    } else {
      // 기존 답글이 없는 경우, 가져와서 표시합니다.
      const result = await getReplyAxios(commentId);
      setReplyComments(result.data);
    }
  };

  //대댓글 작성하기
  const handleReplyToReply = async (
    commentId: number,
    parentCommentId: number
  ) => {
    setIsReplyingToReply((prevIsReplying) => !prevIsReplying);
    setReplyToReplyId(commentId);
    setReplyToCommentId(parentCommentId);
    commentInputRef?.current?.focus();
  };

  //대댓글 작성한 데이터 보내기
  const handleSendReplytoReply = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (replyContent.trim() !== "") {
        const data = {
          parentCommentId: replyToCommentId,
          replyId: replyToReply,
          contents: replyContent,
        };

        try {
          const result = await postReplyToReplyAxios(data);

          setReplyComments((prevComments: CommentItemData[]) => [
            ...prevComments,
            result.data as CommentItemData,
          ]);

          // Clear input fields
          setReplyContent("");
          setReplyToReplyId(null);
          setReplyToCommentId(null);
        } catch (error) {
          handleError(error, "Error posting reply to reply");
        }
      }
    }
  };

  //댓글 작성(엔터)
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (replyContent.trim() !== "") {
        const data = {
          parentCommentId: replyToCommentId,
          contents: replyContent,
        };

        try {
          const result = await postReplyAxios(data);

          setReplyComments((prevComments: CommentItemData[]) => [
            ...prevComments,
            result.data,
          ]);

          setReplyContent("");
          setReplyToCommentId(null);
        } catch (error) {
          handleError(error, "Error posting reply");
        }
      }
    }
  };

  useEffect(() => {}, [replycomments, replyContent, replyToCommentId]);

  const isCurrentUserCommentAuthor =
    userInfo && comment && userInfo.member_id === comment.memberId;

  return (
    <>
      <CommentContainer>
        <Profile>
          <Image
            src={
              comment.memberImage
                ? comment.memberImage
                : "/images/noProfile.jpg"
            }
            alt="프로필"
            width={42}
            height={42}
            style={{ borderRadius: "100%" }}
          />
        </Profile>
        <Comment>
          <Info>
            <Desc>
              <ID>{comment.nickname}</ID>
              <Content>{comment.content}</Content>
            </Desc>
            <Desc>
              <Date>16주</Date>
              <Link href={`/post/comment/liked_by/${comment.commentId}`}>
                <Likes>좋아요 {comment.likeCount}개</Likes>
              </Link>
              <MoreComment
                onClick={() => handleMoreCommentClick(comment.commentId)}
              >
                답글달기
              </MoreComment>
              {isCurrentUserCommentAuthor && (
                <DeleteComment onClick={() => handleShowModal(comment)}>
                  삭제하기
                </DeleteComment>
              )}
            </Desc>
          </Info>
          <ReplyComment>
            <AllComment onClick={() => getMoreComment(comment.commentId)}>
              {replycomments.length > 0 ? "답글 숨기기" : "답글 보기"}
            </AllComment>
          </ReplyComment>
          <HeartButton>
            <FontAwesomeIcon
              onClick={() => handleLikeCommentClick(comment.commentId)}
              icon={commentLikes[index] ? fasHeart : farHeart}
              style={{ color: commentLikes[index] ? "red" : "inherit" }}
              fontSize={"12px"}
            />
          </HeartButton>
        </Comment>
      </CommentContainer>
      {replycomments.map((replyComment: any, index: number) => (
        <ReplyContainer key={index}>
          <Profile>
            <Image
              src={
                replyComment.memberImage
                  ? replyComment.memberImage
                  : "/images/noProfile.jpg"
              }
              alt="프로필"
              width={42}
              height={42}
              style={{ borderRadius: "100%" }}
            />
          </Profile>
          <Comment>
            <Info>
              <Desc>
                <ID>{replyComment.nickname}</ID>
                <Content>{replyComment.content}</Content>
              </Desc>
              <Desc>
                <Date>16주</Date>
                <Link href={`/post/comment/liked_by/${replyComment.commentId}`}>
                  <Likes>좋아요 {replyComment.likeCount}개</Likes>
                </Link>
                <MoreComment
                  onClick={() =>
                    handleReplyToReply(
                      replyComment.commentId,
                      comment.commentId
                    )
                  }
                >
                  답글달기
                </MoreComment>
                {isCurrentUserCommentAuthor && (
                  <DeleteComment onClick={() => handleShowModal(replyComment)}>
                    삭제하기
                  </DeleteComment>
                )}
              </Desc>
            </Info>
            <HeartButton>
              <FontAwesomeIcon
                onClick={() => handleLikeCommentClick(comment.commentId)}
                icon={commentLikes[index] ? fasHeart : farHeart}
                style={{ color: commentLikes[index] ? "red" : "inherit" }}
                fontSize={"12px"}
              />
            </HeartButton>
          </Comment>
        </ReplyContainer>
      ))}
      {isReplying && (
        <InputContainer>
          <NewReplyInput
            value={replyContent.toString()}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </InputContainer>
      )}
      {isReplyingToReply && (
        <NewReplyInput
          value={replyContent.toString()}
          onChange={(e) => setReplyContent(e.target.value)}
          onKeyDown={handleSendReplytoReply}
        />
      )}
    </>
  );
};

const OriginalComment = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #cccccc;
  height: 70px;
`;

const OriginalProfile = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const OriginalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  margin-left: 5px;
  width: 100%;
  height: 80%;
`;

const OriginalDesc = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  max-width: 265px;
  /* padding-bottom: 7px; */
  font-size: 12px;
  color: #737373;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 5px;
  margin-left: 5px;
  height: 100%;
`;

const ID = styled.p`
  padding-right: 5px;
  color: #222222;
`;

const Content = styled.p`
  max-width: 370px;
  color: #222222;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 265px;
  padding-bottom: 7px;
  font-size: 12px;
  color: #737373;
  // height: 100%;
  // display: flex;
  // flex-direction: row;
  // max-width: 265px;
  // /* padding-bottom: 7px; */
  // font-size: 12px;
  // color: #737373;
  // align-items: center;
`;

const Date = styled.p`
  color: #737373;
  font-size: 12px;
  font-weight: lighter;
  margin-right: 12px;
`;

const Likes = styled.p`
  color: #737373;
  font-size: 12px;
  font-weight: lighter;
  margin-right: 12px;
`;

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  min-height: 80px;
`;

const Comment = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 90%;
`;

const MoreComment = styled.button`
  margin-right: 12px;
  border: none;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
`;

const DeleteComment = styled.button`
  border: none;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
`;

const HeartButton = styled.button`
  position: absolute;
  right: 12px;
  background-color: transparent;
  border: none;
`;

const ReplyContainer = styled.div`
  display: flex;
  padding: 10px 12px;
  align-items: center;
  margin-left: 50px;
  min-height: 80px;
`;

const ReplyComment = styled.div`
  width: 265px;
  height: 100%;
  margin-left: 10px;
`;

const AllComment = styled.button`
  border: none;
  font-size: 12px;
  color: #737373;
  background-color: transparent;
`;

const InputContainer = styled.div``;

const NewReplyInput = styled.textarea`
  padding: 12px;
  margin-left: 55px;
  width: 314px;
  height: 40px;
  border: 1px solid #cccccc;
`;
