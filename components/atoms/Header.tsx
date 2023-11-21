import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { BackChevron } from "@/components/atoms/Icon";
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
        <DetailPage>
          <Link href="/my/settings">
            <FontAwesomeIcon icon={faGear} fontSize={"24"} />
          </Link>
          <h2>{userInfo.nickname}</h2>
          <Link href="my/recommend">
            <FontAwesomeIcon icon={faUserPlus} fontSize={"24"} />
          </Link>
        </DetailPage>
      )}
    </>
  );
};

interface UserPageHeaderProps {
  memberInfo: MemberInfoData;
}

export const UserPageHeader: React.FC<UserPageHeaderProps> = ({
  memberInfo,
}) => {
  return (
    <>
      {memberInfo && (
        <DetailPage>
          <BackChevron />
          <h2>{memberInfo.nickname}</h2>
          <span></span>
        </DetailPage>
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
