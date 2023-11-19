import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { CloseButton } from "@/components/atoms/Button";
import React, {useState, useRef} from "react";
import postReplyAxios from "@/services/postInfo/postReply";
import { handleError } from "@/utils/errorHandler";
import getReplyAxios from "@/services/postInfo/getReply";
import postReplyToReplyAxios from "@/services/postInfo/postReplyToReply";
import { useEffect } from "react";

interface SearchItemData {
  memberId: number;
  email: string;
  searched: string;
  nickName: string;
  friendStatus: boolean;
  job: string;
  image: string;
}

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
          <ClickTo href="/" onClick={handleSearchItemClick}>
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
                  {/* <Job>{result.job}</Job> */}
                  {/* <Follow>{result.friendStatus ? "팔로잉" : ""}</Follow> */}
                </Status>
              </AccountInfo>
              <CloseButton onClick={handleSearchItemDeleteClick} />
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      ) : (
        <ItemContainer>
          <ClickTo href="/" onClick={handleSearchItemClick}>
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

interface PostItemData {
  commentsCounts: number;
  contents: string;
  createdAt: number;
  hashTags: string;
  memberImage: string;
  image: string;
  likeCount: number;
  memberId: number;
  nickname: string;
  postId: number;
  taggedMemberId: string;
}

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
  post: PostItemData;
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
  const [replycomments, setReplyComments] = useState<Array>([]);

//   //답글달기 api 요청
//   const fetchPostReplyData = async (parentCommentId: number, contents: string, mentionList: string[]) => {
//     try {
//         const res = await postReplyAxios(parentCommentId, contents, mentionList);
//         setReplyContent(res.data);
//     } catch (err) {
//         handleError(err, "Error fetching posts reply");
//     }
// }

const handleMoreCommentClick = (commentId: number) => {
  setIsReplying((prevIsReplying) => !prevIsReplying);
  setReplyToCommentId(commentId);
  console.log(commentId);
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
const handleReplyToReply = async(commentId:number, parentCommentId: number) => {
  setIsReplyingToReply((prevIsReplying) => !prevIsReplying);
  setReplyToReplyId(commentId);
  setReplyToCommentId(parentCommentId);
  commentInputRef?.current?.focus();
}

//대댓글 작성한 데이터 보내기
const handleSendReplytoReply = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (replyContent.trim() !== '') {
      const data = {
        parentCommentId: replyToCommentId,
        replyId: replyToReply,
        contents: replyContent,
      };

      try {

        const result = await postReplyToReplyAxios(data);

        setReplyComments((prevComments: CommentItemData[]) => [...prevComments, result.data]);

        // Clear input fields
        setReplyContent('');
        setReplyToReplyId(null);
        setReplyToCommentId(null);
      } catch (error) {
        handleError(error, "Error posting reply to reply");
      }
    }
  }
};

//댓글 작성(엔터)
const handleKeyPress = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (replyContent.trim() !== '') {
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
        
        setReplyContent('');
        setReplyToCommentId(null);
      } catch (error) {
        handleError(error, "Error posting reply");
      }
    }
  }
};

useEffect(() => {
  console.log('Component re-rendered!', replycomments);
}, [replycomments, replyContent, replyToCommentId]);


  const isCurrentUserCommentAuthor =
    userInfo && comment && userInfo.member_id === comment.memberId;

  return (
  <>
    {!isReply ? (
      <Comment>
        <Profile>
          <Image
            src={
              post.memberImage ? post.memberImage : "/images/noProfile.jpg"
            }
            alt="프로필"
            width={42}
            height={42}
            style={{ borderRadius: "100%" }}
          />
        </Profile>
        <Info>
          <Desc>
            <ID>{post.nickname}</ID>
            <Content>{post.contents}</Content>
          </Desc>
          <Date>16주</Date>
        </Info>
      </Comment>
    ) : (
      <ReplyContainer>
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
        <Reply>
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
              <MoreComment onClick={() => handleMoreCommentClick(comment.commentId)}>답글달기</MoreComment>
              {isCurrentUserCommentAuthor && (
                <DeleteComment onClick={() => handleShowModal(comment)}>
                  삭제하기
                </DeleteComment>
              )}
            </Desc>
            <AllComment onClick={() => getMoreComment(comment.commentId)}>
              {replycomments.length > 0 ? '답글 숨기기' : '답글 보기'}
            </AllComment>
          </Info>
          <HeartButton>
            <FontAwesomeIcon
              onClick={() => handleLikeCommentClick(comment.commentId)}
              icon={commentLikes[index] ? fasHeart : farHeart}
              style={{ color: commentLikes[index] ? "red" : "inherit" }}
              fontSize={"12px"}
            />
          </HeartButton>

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
              <Reply>
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
                    <MoreComment onClick={() => handleReplyToReply(replyComment.commentId, comment.commentId)}>답글달기</MoreComment>
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
              </Reply>
              {isReplyingToReply && (
                <NewReplyInput
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onKeyDown={handleSendReplytoReply}
                />
              )}
            </ReplyContainer>
          ))}

          {isReplying && (
            <NewReplyInput
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          )}
        </Reply>
      </ReplyContainer>
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

const Comment = styled.div`
  min-height: 80px;
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #cccccc;
  margin-top:-1rem;
  position: relative;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1.5rem;
  min-height: 40px;
  margin-top: 1.5rem;
  line-height: 1.5rem;
`;


const ID = styled.p`
  padding-right: 5px;
  color: #262626;
`;

const Content = styled.p`
  max-width: 370px;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 265px;
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

const ReplyContainer = styled.div`
  position: relative;
  display: flex;
  padding: 12px;
  align-items: center;
  min-height: 80px;
`;

const Reply = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 316px;
  top: 0;
  left: 3.5rem;
`;

const MoreComment = styled.button`
  width: 60px;
  font-size: 12px;
  color: #737373;
  border: none;
  background-color: transparent;
`;

const AllComment = styled.button`
  width: 60px;
  font-size: 12px;
  color: #737373;
  border: none;
  background-color: transparent;
`

const DeleteComment = styled.button`
  width: 60px;
  font-size: 12px;
  color: #737373;
  border: none;
  background-color: transparent;
`;

const HeartButton = styled.p`
  position: relative;
  top: -2rem;
  left: 22rem;
  z-index: 2;
`

const NewReplyInput = styled.textarea`
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: -1rem;
  left: 0;
  top: 6rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;