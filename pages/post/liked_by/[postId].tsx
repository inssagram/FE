import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import { FollowButton } from "@/components/atoms/Button";
import getLikePostMemberListAxios from "@/services/postInfo/getLikePostMemberList";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";

interface LikeMemberData {
  memberId: number;
  memberNickname: string;
  memberProfile: string;
  followedState: boolean;
}

const LikedPost: React.FC<LikeMemberData> = () => {
  const [postMembers, setPostMembers] = useState<LikeMemberData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  const PageTitle = "좋아요";

  // 게시글 좋아요 멤버 목록
  const fetchLikePostMemberData = async (postId: number) => {
    try {
      const res = await getLikePostMemberListAxios(postId);
      setPostMembers(res.data);
    } catch (err) {
      handleError(err, "Error fetching likepostlist:");
    }
  };

  const handleFollowClick = async (followId: number) => {
    try {
      const response = await postMemberFollowAxios(followId);
      console.log("success", response);
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchLikePostMemberData(postId as number);
    }
  }, [postId]);

  return (
    <>
      <PageHeader title={PageTitle} />

      {postMembers.map((member) => (
        <ItemContainer key={member.memberId}>
          <ClickTo href={`/user/${member.memberId}`} passHref>
            <AccountImg
              src={member.memberProfile || "/images/noProfile.jpg"}
              alt="프로필 이미지"
              width={44}
              height={44}
            />
            <ContentArea>
              <AccountInfo>
                <Id>{member.memberNickname}</Id>
              </AccountInfo>
            </ContentArea>
          </ClickTo>
          <FollowButton
            onClick={() => handleFollowClick(member.memberId)}
            isFollowing={isFollowing}
          />
        </ItemContainer>
      ))}
    </>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  align-items: center;
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
  width: 242px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
