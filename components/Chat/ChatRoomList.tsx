import Image from "next/image";
import styled from "styled-components";
import { ChatListData } from "@/types/ChatRoomTypes";

interface ChatRoomListProps {
  myChatList: ChatListData[] | null;
  onChatRoomClick: (roomId: number) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  myChatList,
  onChatRoomClick,
}) => {
  return (
    <>
      {myChatList ? (
        myChatList.map((list) => (
          <ContentContainer
            key={list.chatroom_id}
            onClick={() => onChatRoomClick(list.chatroom_id)}
          >
            <Profile>
              <Image
                src={
                  list.sender_image
                    ? list.sender_image
                    : "/images/noProfile.jpg"
                }
                alt="프로필"
                width={56}
                height={56}
              />
            </Profile>
            <Content>
              <Name>{list.sender_name}</Name>
              <Recent>
                <span>{list.message}</span>
                <span>{list.created_at}</span>
              </Recent>
            </Content>
          </ContentContainer>
        ))
      ) : (
        <Error>참여중인 방이 없습니다.</Error>
      )}
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

const Error = styled.p`
  font-size: 14px;
  margin-top: 5px;
  padding: 14px 16px;
`;
