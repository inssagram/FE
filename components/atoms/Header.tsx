import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUserPlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { BackArrow, BackChevron } from "@/components/atoms/Icon";

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Header>
      <BackChevron />
      <Title>{title}</Title>
    </Header>
  );
};

export const MyPageHeader: React.FC = ({ userInfo }) => {
  return (
    <>
      <MyHeader>
        <FontAwesomeIcon icon={faGear} fontSize={"24"} />
        <h2>{userInfo.nickname}</h2>
        <Link href="my/recommend" passHref>
          <FontAwesomeIcon icon={faUserPlus} fontSize={"24"} />
        </Link>
      </MyHeader>
    </>
  );
};

export const DirectHeader: React.FC = () => {
  return (
    <>
      <DmHeader>
        <BackArrow />
        <h2>februaar</h2>
        <div>
          <Link href="/direct/new">
            <FontAwesomeIcon icon={faPenToSquare} fontSize={24} />
          </Link>
        </div>
      </DmHeader>
    </>
  );
};

interface Item {
  name: string;
  profileUrl: string;
}

export const DirectInHeader: React.FC<{ selectedItem: Item | null }> = ({
  selectedItem,
}) => {
  return (
    <>
      <Header>
        <BackArrow />
        <Info>
          <Profile>
            {selectedItem && (
              <Image
                src={selectedItem.profileUrl}
                alt="프로필"
                width={24}
                height={24}
              />
            )}
          </Profile>
          <Recent>
            <Account>
              {selectedItem ? selectedItem.name : "No User Selected"}
            </Account>
            <RecentTime>1시간 전에 활동</RecentTime>
          </Recent>
        </Info>
      </Header>
    </>
  );
};

interface PageHeaderProps {
  title?: string;
}

// Page
const Title = styled.span`
  margin: 0 auto;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

// Direct
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

// My
const MyHeader = styled(Header)`
  justify-content: space-between;
`;

const DmHeader = styled(Header)`
  justify-content: space-between;
  border-bottom: none;
`;

// DirectIn
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
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
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  color: #737373;
`;
