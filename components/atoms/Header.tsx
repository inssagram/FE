import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import * as SC from "@/components/styled/atoms_header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { BackChevron } from "@/components/atoms/Icon";
import { FollowStatusButton } from "@/components/atoms/Button";
import { UserInfoData, MemberInfoData } from "@/types/UserTypes";

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Header>
      <BackChevron />
      <Title>{title}</Title>
    </Header>
  );
};

interface MyPageHeaderProps {
  userInfo: UserInfoData;
}

export const MyPageHeader: React.FC<MyPageHeaderProps> = ({ userInfo }) => {
  return (
    <>
      {userInfo && (
        <>
          <DetailPage>
            <Link href="/my/settings">
              <FontAwesomeIcon icon={faGear} fontSize={"24"} />
            </Link>
            <h2>{userInfo.nickname}</h2>
            <Link href="my/recommend">
              <FontAwesomeIcon icon={faUserPlus} fontSize={"24"} />
            </Link>
          </DetailPage>
          <SC.Container>
            <SC.Profile>
              <Image
                src={userInfo.image ? userInfo.image : "/images/noProfile.jpg"}
                alt="프로필"
                width={77}
                height={77}
                style={{ borderRadius: "100%" }}
              />
            </SC.Profile>

            <SC.MyDescContainer>
              <SC.Intro>
                <SC.Id>{userInfo.nickname}</SC.Id>
                <SC.Company>{userInfo.job}</SC.Company>
              </SC.Intro>
              <SC.EditArea>
                <SC.ProfileEdit>
                  <Link href="my/settings/profile" passHref>
                    <SC.Desc>프로필 편집</SC.Desc>
                  </Link>
                </SC.ProfileEdit>
                <SC.StoryEdit>
                  <SC.Desc>보관된 스토리 보기</SC.Desc>
                </SC.StoryEdit>
              </SC.EditArea>
            </SC.MyDescContainer>
          </SC.Container>
        </>
      )}
    </>
  );
};

interface UserPageHeaderProps {
  memberId: number;
  memberInfo: MemberInfoData;
  isFollowing: boolean;
  handleFollowClick: (memberId: number) => void;
  handleChatClick: () => void;
}

export const UserPageHeader: React.FC<UserPageHeaderProps> = ({
  memberId,
  memberInfo,
  isFollowing,
  handleFollowClick,
  handleChatClick,
}) => {
  return (
    <>
      {memberInfo && (
        <>
          <DetailPage>
            <BackChevron />
            <h2>{memberInfo.nickname}</h2>
            <span></span>
          </DetailPage>
          <SC.Container>
            <SC.Profile>
              <Image
                src={
                  memberInfo.profilePic
                    ? memberInfo.profilePic
                    : "/images/noProfile.jpg"
                }
                alt="프로필"
                width={77}
                height={77}
                style={{ borderRadius: "100%" }}
              />
            </SC.Profile>
            <SC.MyDescContainer>
              <SC.Intro>
                <SC.Id>{memberInfo.nickname}</SC.Id>
                <SC.Company>{memberInfo.companyName}</SC.Company>
              </SC.Intro>
              <SC.DetailArea>
                <FollowStatusButton
                  onClick={() => handleFollowClick(memberId)}
                  isFollowing={isFollowing}
                />
                <SC.Desc onClick={handleChatClick}>메세지 보내기</SC.Desc>
              </SC.DetailArea>
            </SC.MyDescContainer>
          </SC.Container>
        </>
      )}
    </>
  );
};

const Header = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 44px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.span`
  margin: 0 auto;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const DetailPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 44px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
`;
