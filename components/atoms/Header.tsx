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

interface HeaderProps {
  title?: string;
}

export const PageHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Header>
      <BackChevron />
      <Title>{title}</Title>
    </Header>
  );
};

export const SearchHistoryHeader: React.FC = () => {
  return (
    <HistoryHeader>
      <HistoryTitle>최근 검색 항목</HistoryTitle>
      <DeleteBtn>모두 지우기</DeleteBtn>
    </HistoryHeader>
  );
};

interface MyHeaderProps {
  userInfo: any;
  isNotMe: boolean;
}

export const MyPageHeader: React.FC<MyHeaderProps> = ({
  userInfo,
  isNotMe,
}) => {
  return (
    <>
      <MyHeader>
        <Link href="/my/settings">
          <FontAwesomeIcon icon={faGear} fontSize={"24"} />
        </Link>
        <h2>{isNotMe ? "" : userInfo.nickname}</h2>
        <Link href="my/recommend" passHref>
          <FontAwesomeIcon icon={faUserPlus} fontSize={"24"} />
        </Link>
      </MyHeader>
    </>
  );
};

interface UserInfo {
  memberId: number;
  nickname: string;
}

interface MyDirectHeaderProps {
  userInfo: UserInfo;
  onCreateChatRoom: () => void;
}

export const DirectHeader: React.FC<MyDirectHeaderProps> = ({
  userInfo,
  onCreateChatRoom,
}) => {
  return (
    <>
      <DmHeader>
        <BackArrow />
        <h2>{userInfo.nickname}</h2>
        <div onClick={onCreateChatRoom}>
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

// Page
const Title = styled.span`
  margin: 0 auto;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

// SearchHistory
const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 16px 0;
  border-top: 1px solid #cccccc;
`;

const HistoryTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const DeleteBtn = styled.button`
  font-size: 14px;
  color: #0095f6;
  border: none;
  background-color: transparent;
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
