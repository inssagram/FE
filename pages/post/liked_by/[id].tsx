import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import { FollowButton } from "@/components/atoms/Button";
import getLikePostMemberListAxios from "@/services/postInfo/getLikePostMemberList";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import { LikedPostMemberData } from "@/types/PostTypes";

const LikedPost: React.FC<LikedPostMemberData> = () => {
  const [postMembers, setPostMembers] = useState<LikedPostMemberData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const postId: number = typeof id === "string" ? parseInt(id, 10) : -1;
  const PageTitle = "좋아요";

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
      fetchLikePostMemberData(postId);
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

export default LikedPost;

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
