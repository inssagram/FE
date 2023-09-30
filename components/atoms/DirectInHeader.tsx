import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%
  height: 44px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

const BackIcon = styled.div`
  padding-right: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  gap: 6px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
`;

const Recent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
`;

const Account = styled.span`
  font-size: 16px;
`;

const RecentTime = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #737373;
`;

const DirectInHeader: React.FC = () => {
  return (
    <>
      <Header>
        <BackIcon>
          <FontAwesomeIcon icon={faArrowLeft} fontSize={24} />
        </BackIcon>
        <Info>
          <Profile>
            <Image
              src="/images/profile.jpg"
              alt="프로필"
              width={24}
              height={24}
            />
          </Profile>
          <Recent>
            <Account>정경진</Account>
            <RecentTime>1시간 전에 활동</RecentTime>
          </Recent>
        </Info>
      </Header>
    </>
  );
};

export default DirectInHeader;
