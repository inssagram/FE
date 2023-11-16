import Image from "next/image";
import styled from "styled-components";

interface ChatRoomListData {
  chatRoomId: number;
  firstMemberId: number;
  firstMemberNickname: string;
  firstMemberProfile: string;
  firstMemberFollowState: boolean;
  firstMemberFollowerCounts: number;
  firstMemberPostCounts: number;
  secondMemberId: number;
  secondMemberNickname: string;
  secondMemberProfile: string;
  secondMemberFollowState: boolean;
  secondMemberFollowCounts: number;
  secondMemberPostCounts: number;
}

interface ChatRoomListProps {
  chatRooms: ChatRoomListData[];
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms }) => {
  return (
    <>
      {chatRooms &&
        chatRooms.map((chatRoom) => (
          <ContentContainer key={chatRoom.chatRoomId}>
            <Profile>
              <Image
                src={
                  chatRoom.secondMemberProfile
                    ? chatRoom.secondMemberProfile
                    : "/images/noProfile.jpg"
                }
                alt="프로필"
                width={56}
                height={56}
              />
            </Profile>
            <Content>
              <Name>{chatRoom.secondMemberNickname}</Name>
              <Recent>
                <span>최근 대화 내용</span>
                <span>| 2일전</span>
              </Recent>
            </Content>
          </ContentContainer>
        ))}
    </>
  );
};

export default ChatRoomList;

const ContentContainer = styled.li`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  font-size: 14px;
`;

const Profile = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
  font-size: 14px;
  gap: 3px;
`;

const Name = styled.span`
  padding-bottom: 3px;
`;

const Recent = styled.div`
  display: flex;
  flex-direction: row;
  color: #737373;
  gap: 5px;
`;
