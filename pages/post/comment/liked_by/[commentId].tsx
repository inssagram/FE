import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import { FollowButton } from "@/components/atoms/Button";
import getLikeCommentMemberListAxios from "@/services/postInfo/getLikeCommentMemberList";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";

interface LikeMemberData {
  member_id: number;
  email: string;
  nickname: string;
  job: string;
  image: string;
  friendStatus: boolean;
}

const LikedPost: React.FC<LikeMemberData> = () => {
  const [commentMembers, setCommentMembers] = useState<LikeMemberData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const router = useRouter();
  const { commentId } = router.query;

  const PageTitle = "좋아요";

  // 댓글 좋아요 멤버 목록
  const fetchLikeCommentMemberData = async (commentId: number) => {
    try {
      const res = await getLikeCommentMemberListAxios(commentId);
      setCommentMembers(res.data);
    } catch (err) {
      handleError(err, "Error fetching likepostlist:");
    }
  };

  const handleFollowClick = async () => {
    try {
      const followId = post.memberId;
      const response = await postMemberFollowAxios(followId);
      console.log("success", response);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (commentId) {
      fetchLikeCommentMemberData(commentId as number);
    }
  }, [commentId]);

  return (
    <>
      <PageHeader title={PageTitle} />

      {commentMembers.map((comment) => (
        <ItemContainer key={comment.member_id}>
          <ClickTo href="/" passHref>
            <AccountImg
              src={comment.image || "/images/noProfile.jpg"}
              alt="프로필 이미지"
              width={44}
              height={44}
            />
            <ContentArea>
              <AccountInfo>
                <Id>{comment.nickname}</Id>
                <Status>{comment.job && <Job>{comment.job}</Job>}</Status>
              </AccountInfo>
              <FollowButton onClick={handleFollowClick} />
              {/* <Follow>{comment.friendStatus ? "팔로잉" : "팔로잉"}</Follow> */}
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      ))}
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

export default LikedPost;
