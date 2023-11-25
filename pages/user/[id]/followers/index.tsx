import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import Footer from "@/components/Footer";
import getUserDetailAxios from "@/services/userInfo/getUserDetail";
import { UserInfoData, MemberInfoData } from "@/types/UserTypes";

const UserFollowers: React.FC = () => {
  const [followers, setFollowers] = useState<
    MemberInfoData["followers"] | null
  >(null);
  const router = useRouter();
  const { id } = router.query;
  const memberId: number = typeof id === "string" ? parseInt(id, 10) : -1;
  const pageTitle = "팔로워";

  const fetchFollowersList = async (id: number) => {
    try {
      const res = await getUserDetailAxios(id);
      setFollowers(res.data.followers);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
  };

  useEffect(() => {
    if (memberId) {
      fetchFollowersList(memberId);
    }
  }, [memberId]);

  return (
    <>
      <PageHeader title={pageTitle} />
      {followers ? (
        followers.map((follower) => (
          <ItemContainer key={follower.followerId}>
            <ClickTo href={`/user/${follower.followerId}`} passHref>
              <AccountImg
                src={follower.followerImage || "/images/noProfile.jpg"}
                alt="프로필 이미지"
                width={44}
                height={44}
              />
              <ContentArea>
                <AccountInfo>
                  <Id>{follower.followerName}</Id>
                </AccountInfo>
              </ContentArea>
            </ClickTo>
          </ItemContainer>
        ))
      ) : (
        <NoData>팔로워 정보가 없습니다.</NoData>
      )}
      <Footer />
    </>
  );
};

export default UserFollowers;

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

const NoData = styled.p`
  margin-top: 12px;
  padding: 12px 16px;
  font-size: 14px;
`;
