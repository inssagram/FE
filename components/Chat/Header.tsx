import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { BackArrow } from "@/components/atoms/Icon";
import { UserInfoData } from "@/types/UserTypes";
import { MemberInfoData } from "@/types/ChatRoomTypes";

interface ChatListHeaderProps {
  userInfo: UserInfoData | null;
}

export const ChatListHeader: React.FC<ChatListHeaderProps> = ({ userInfo }) => {
  return (
    <>
      {userInfo && (
        <ChatList>
          <BackArrow />
          <h2>{userInfo.nickname}</h2>
          <Link href="/direct/new">
            <FontAwesomeIcon icon={faPenToSquare} fontSize={24} />
          </Link>
        </ChatList>
      )}
    </>
  );
};

interface NewChatRoomHeaderProps {
  onClick: () => void;
}

export const NewChatRoomHeader: React.FC<NewChatRoomHeaderProps> = ({
  onClick,
}) => {
  return (
    <>
      <NewChatRoom>
        <BackArrow />
        <Title>새로운 메시지</Title>
        <Next onClick={onClick}>다음</Next>
      </NewChatRoom>
    </>
  );
};

interface ChatRoomHeaderProps {
  chatRoom: {
    receiver: MemberInfoData | null;
  } | null;
}

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ chatRoom }) => {
  const receiver = chatRoom?.receiver;

  return (
    <>
      <ChatRoom>
        <BackArrow />
        {receiver && (
          <AccountArea>
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
            <Desc>
              <Account>
                {receiver.memberNickname ? receiver.memberNickname : ""}
              </Account>
              <RecentTime>1시간 전에 활동</RecentTime>
            </Desc>
          </AccountArea>
        )}
      </ChatRoom>
    </>
  );
};

const ChatList = styled.section`
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
  border-bottom: none;
`;

const NewChatRoom = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h2`
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

const ChatRoom = styled.section`
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

const AccountArea = styled.div`
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

const Desc = styled.div`
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
