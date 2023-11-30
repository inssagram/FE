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
import { DeleteButton } from "@/components/atoms/Button";
import getReplyAxios from "@/services/postInfo/getReply";
import postReplyAxios from "@/services/postInfo/postReply";
import postReplyToReplyAxios from "@/services/postInfo/postReplyToReply";
import { PostDetailData } from "@/types/PostTypes";
import { SearchItemData } from "@/types/SearchItemTypes";

interface SearchItemProps {
  result: SearchItemData;
  handleClick?: (memberId: number) => void;
  handleDelete?: (searched: string) => void;
  isHistory?: boolean;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  result,
  handleClick,
  handleDelete,
  isHistory,
}) => {
  const handleSearchItemClick = () => {
    if (handleClick) {
      handleClick(result.memberId);
    }
  };

  const handleSearchItemDeleteClick = () => {
    if (handleDelete && isHistory) {
      handleDelete(result.searched);
    }
  };

  return (
    <>
      {isHistory ? (
        <ItemContainer>
          <ClickTo
            href={`/user/${result.memberId}`}
            onClick={handleSearchItemClick}
          >
            <AccountImg
              src={result.image ? result?.image : "/images/noProfile.jpg"}
              alt="프로필 이미지"
              width={44}
              height={44}
            />
            <ContentArea>
              <AccountInfo>
                <Id>{result.searched}</Id>
                <Status>
                  <Job>{result.job}</Job>
                  <Follow>{result.friendStatus ? "팔로잉" : ""}</Follow>
                </Status>
              </AccountInfo>
              <DeleteButton onClick={handleSearchItemDeleteClick} />
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      ) : (
        <ItemContainer>
          <ClickTo
            href={`/user/${result.memberId}`}
            onClick={handleSearchItemClick}
          >
            {result.nickName.includes("#") ? (
              <HashtagImg>
                <Image
                  src="/images/hashtag.jpg"
                  alt="프로필 이미지"
                  width={16}
                  height={16}
                />
              </HashtagImg>
            ) : (
              <AccountImg
                src={result.image ? result.image : "/images/noProfile.jpg"}
                alt="프로필 이미지"
                width={44}
                height={44}
              />
            )}
            <ContentArea>
              <AccountInfo>
                <Id>{result.nickName}</Id>
                <Status>
                  <Job>{result.job}</Job>
                  <Follow>{result.friendStatus ? "팔로잉" : ""}</Follow>
                </Status>
              </AccountInfo>
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      )}
    </>
  );
};

interface CommentItemData {
  commentId: number;
  memberId: number;
  postId: number;
  nickname: string;
  content: string;
  memberImage: string;
  likeCount: number;
  replyFlag: boolean;
  createdAt: number;
  mentionList: string[];
  image: string;
}

interface CommentDataProps {
  post: PostDetailData;
  comment: CommentItemData;
  commentLikes: [];
  handleLikeCommentClick: (commentId: number) => void;
  handleShowModal: (comment: any) => void;
  isReply?: boolean;
  index: any;
  isReplying: boolean;
  startReplying: () => void;
  commentInputRef: React.RefObject<HTMLTextAreaElement>;
}

export const CommentItem: React.FC<CommentDataProps> = ({
  post,
  comment,
  commentLikes,
  handleLikeCommentClick,
  handleShowModal,
  isReply,
  index,
  commentInputRef,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.member);
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
      {!isReply ? (
        <OriginalComment>
          <OriginalProfile>
            <Image
              src={
                post.memberImage ? post.memberImage : "/images/noProfile.jpg"
              }
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
      ) : (
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
                    <Link
                      href={`/post/comment/liked_by/${replyComment.commentId}`}
                    >
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
                      <DeleteComment
                        onClick={() => handleShowModal(replyComment)}
                      >
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
        </>
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

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

const ClickTo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`;

const HashtagImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 100%;
  margin-right: 12px;
  width: 44px;
  height: 44px;
`;

const AccountImg = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 100%;
  margin-right: 12px;
`;

const ContentArea = styled.div`
  width: 324px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
`;

const Id = styled.span`
  color: inherit;
  font-size: inherit;
  padding-bottom: 3px;
`;

const Status = styled.p`
  display: flex;
  flex-direction: row;
`;

const Job = styled.span`
  padding-right: 5px;
  font-size: inherit;
  color: #0095f6;
`;

const Follow = styled.span`
  font-size: inherit;
  color: #7c7c7c;
`;

// Comment Item
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
