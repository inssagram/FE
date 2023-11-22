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
      {myChatList &&
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
              <Name style={{ fontWeight: list.read_status ? "500" : "600" }}>
                {list.sender_name}
              </Name>
              <Recent>
                <Message
                  style={{
                    color: list.read_status ? "#737373" : "#222222",
                    fontWeight: list.read_status ? "500" : "600",
                  }}
                >
                  {list.message}
                </Message>
                <CreatedAt>
                  {/* {list.created_at} */}
                  1주
                </CreatedAt>
              </Recent>
            </Content>
            {list.read_status ? "" : <Mark />}
          </ContentContainer>
        ))}
    </>
  );
};

export default ChatRoomList;

const ContentContainer = styled.li`
  position: relative;
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
  height: 100%;
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
`;

const Message = styled.span`
  max-width: 265px;
  height: 18px;
  padding-right: 12px;
`;

const CreatedAt = styled.p`
  max-width: 22px;
  overflow: hidden;
`;

const Mark = styled.p`
  position: absolute;
  top: 50%;
  right: 25px;
  width: 10px;
  height: 10px;
  background-color: #0095f6;
  border-radius: 100%;
`;
