import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import Footer from "@/components/Footer";
import getUserDetailAxios from "@/services/userInfo/getUserDetail";
import { MemberInfoData } from "@/types/UserTypes";

const Following: React.FC = () => {
  const [following, setFollowing] = useState<
    MemberInfoData["following"] | null
  >(null);
  const router = useRouter();
  const { id } = router.query;
  const memberId: number = typeof id === "string" ? parseInt(id, 10) : -1;
  const pageTitle = "팔로잉";

  const fetchFollowingList = async (id: number) => {
    try {
      const res = await getUserDetailAxios(id);
      setFollowing(res.data.following);
    } catch (err) {
      handleError(err, "Error fetching posts:");
    }
  };

  useEffect(() => {
    if (memberId) {
      fetchFollowingList(memberId);
    }
  }, [memberId]);

  return (
    <>
      <PageHeader title={pageTitle} />
      {following ? (
        following.map((following) => (
          <ItemContainer key={following.following_Id}>
            <ClickTo href={`/user/${following.following_Id}`} passHref>
              <AccountImg
                src={following.following_Image || "/images/noProfile.jpg"}
                alt="프로필 이미지"
                width={44}
                height={44}
              />
              <ContentArea>
                <AccountInfo>
                  <Id>{following.following_Name}</Id>
                </AccountInfo>
              </ContentArea>
            </ClickTo>
          </ItemContainer>
        ))
      ) : (
        <NoData>팔로우 정보가 없습니다.</NoData>
      )}
      <Footer />
    </>
  );
};

export default Following;

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
