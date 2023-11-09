import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { CloseButton } from "@/components/atoms/Button";

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
  image: string;
  likeCount: number;
  memberId: number;
  nickname: string;
  postId: number;
  taggedMemberId: string;
}

interface CommentItemData {
  commentId: number;
  postId: number;
  memberId: number;
  nickname: string;
  content: string;
  likeCount: number;
  replyFlag: boolean;
  createdAt: number;
  mentionList: string[];
  image: string;
}

interface CommentDataProps {
  post: PostItemData;
  comment: CommentItemData;
  isLikeComment: boolean;
  handleLikeCommentClick: (commentId: number) => void;
  isReply?: boolean;
}

export const CommentItem: React.FC<CommentDataProps> = ({
  post,
  comment,
  isLikeComment,
  handleLikeCommentClick,
  isReply,
}) => {
  return (
    <>
      {!isReply ? (
        <Comment>
          <Profile>
            <Image
              src={
                post.image ? "/images/noProfile.jpg" : "/images/noProfile.jpg"
              }
              alt="프로필"
              width={42}
              height={42}
              style={{ borderRadius: "100%" }}
            />
            <Info>
              <Desc>
                <ID>{post.nickname}</ID>
                <Content>{post.contents}</Content>
              </Desc>
              <Date>16주</Date>
            </Info>
          </Profile>
        </Comment>
      ) : (
        <ReplyContainer>
          <Profile>
            <Image
              src={
                comment.image
                  ? "/images/noProfile.jpg"
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
                <Likes>좋아요 {comment.likeCount}개</Likes>
                <MoreComment>답글달기</MoreComment>
              </Desc>
            </Info>
            <HeartButton>
              <FontAwesomeIcon
                onClick={() => handleLikeCommentClick(comment.commentId)}
                icon={isLikeComment ? fasHeart : farHeart}
                fontSize={"12px"}
                style={{ color: isLikeComment ? "red" : "inherit" }}
              />
            </HeartButton>
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
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  margin-left: 5px;
  min-height: 40px;
`;

const ID = styled.p`
  padding-right: 5px;
  color: #262626;
`;

const Content = styled.p`
  max-width: 370px;
`;

const Desc = styled.p`
  display: flex;
  flex-direction: row;
  max-width: 200px;
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 316px;
`;

const MoreComment = styled.p`
  width: 80px;
  font-size: 12px;
  color: #737373;
  border: none;
  background-color: transparent;
`;

const HeartButton = styled.p`
  position: absolute;
  right: 12px;
`;
