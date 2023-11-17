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
import { MemberInfoData } from "@/types/ChatRoomTypes";

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
  userInfo: { nickname: string };
  memberInfo: { nickname: string };
  isNotMe: boolean;
}

export const MyPageHeader: React.FC<MyHeaderProps> = ({
  userInfo,
  memberInfo,
  isNotMe,
}) => {
  return (
    <>
      {isNotMe ? (
        <MyHeader>
          <BackChevron />
          <h2>{memberInfo.nickname}</h2>
          <span></span>
        </MyHeader>
      ) : (
        <MyHeader>
          <Link href="/my/settings">
            <FontAwesomeIcon icon={faGear} fontSize={"24"} />
          </Link>
          <h2>{userInfo.nickname}</h2>
          <Link href="my/recommend" passHref>
            <FontAwesomeIcon icon={faUserPlus} fontSize={"24"} />
          </Link>
        </MyHeader>
      )}
    </>
  );
};

interface UserInfo {
  email: string;
  member_id: number;
  nickname: string;
  job: string;
  image: string;
}

interface DirectHeaderProps {
  userInfo: UserInfo | null;
}

export const DirectHeader: React.FC<DirectHeaderProps> = ({ userInfo }) => {
  if (!userInfo) {
    return null;
  }
  return (
    <>
      <DmHeader>
        <BackArrow />
        <h2>{userInfo.nickname}</h2>
        <Link href="/direct/new">
          <FontAwesomeIcon icon={faPenToSquare} fontSize={24} />
        </Link>
      </DmHeader>
    </>
  );
};

interface DirectNewHeaderProps {
  onChatRoomClick: () => void;
}

export const DirectNewHeader: React.FC<DirectNewHeaderProps> = ({
  onChatRoomClick,
}) => {
  return (
    <>
      <NewHeader>
        <BackArrow />
        <HeaderTitle>새로운 메시지</HeaderTitle>
        <Next onClick={onChatRoomClick}>다음</Next>
      </NewHeader>
    </>
  );
};

interface MemberInfoProps {
  receiver: MemberInfoData | null;
}

export const ChatRoomHeader: React.FC<MemberInfoProps> = ({ receiver }) => {
  return (
    <>
      <Header>
        <BackArrow />
        {receiver && (
          <Info>
            <Profile>
              <Image
                src={
                  receiver.memberProfile
                    ? receiver.memberProfile
                    : "/images/noProfile.jpg"
                }
                alt="프로필"
                width={24}
                height={24}
              />
            </Profile>
            <Recent>
              <Account>
                {receiver.memberNickname ? receiver.memberNickname : ""}
              </Account>
              <RecentTime>1시간 전에 활동</RecentTime>
            </Recent>
          </Info>
        )}
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

// DirectNew
const NewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

const HeaderTitle = styled.h2`
  margin: 0 auto;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const Next = styled.button`
  padding-left: 12px;
  border: none;
  font-size: 14px;
  color: #0095f6;
  background-color: transparent;
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
