import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import { FollowButton } from "@/components/atoms/Button";
import getLikeCommentMemberListAxios from "@/services/postInfo/getLikeCommentMemberList";
import postMemberFollowAxios from "@/services/userInfo/postMemberFollow";
import { LikedPostMemberData } from "@/types/PostTypes";

const LikedPost: React.FC<LikedPostMemberData> = () => {
  const [commentMembers, setCommentMembers] = useState<LikedPostMemberData[]>(
    []
  );
  const [isFollowing, setIsFollowing] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const commentId: number = typeof id === "string" ? parseInt(id, 10) : -1;
  const PageTitle = "좋아요";

  const fetchLikeCommentMemberData = async (commentId: number) => {
    try {
      const res = await getLikeCommentMemberListAxios(commentId);
      setCommentMembers(res.data);
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
    if (commentId) {
      fetchLikeCommentMemberData(commentId);
    }
  }, [commentId]);

  return (
    <>
      <PageHeader title={PageTitle} />

      {commentMembers.map((comment) => (
        <ItemContainer key={comment.memberId}>
          <ClickTo href={`/user/${comment.memberId}`} passHref>
            <AccountImg
              src={comment.memberProfile || "/images/noProfile.jpg"}
              alt="프로필 이미지"
              width={44}
              height={44}
            />
            <ContentArea>
              <AccountInfo>
                <Id>{comment.memberNickname}</Id>
              </AccountInfo>
              <FollowButton
                onClick={() => handleFollowClick(comment.memberId)}
                isFollowing={isFollowing}
              />
            </ContentArea>
          </ClickTo>
        </ItemContainer>
      ))}
    </>
  );
};

export default LikedPost;

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
