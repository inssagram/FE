import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { ChatListData } from "@/types/ChatRoomTypes";
import { DirectHeader } from "@/components/atoms/Header";
import ChatRoomList from "@/components/Chat/ChatRoomList";
import getMyChatListAllAxios from "@/services/chatInfo/getMyChatListAll";

interface ChatRoomListProps {
  myChatList: ChatListData[] | null;
}

const Direct: React.FC<ChatRoomListProps> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [myChatList, setMyChatList] = useState<ChatListData[] | null>(null);
  console.log(myChatList);
  const router = useRouter();

  const fetchChatRoomList = async () => {
    try {
      const res = await getMyChatListAllAxios();
      setMyChatList(res.data);
    } catch (err) {
      handleError(err, "fetching chat room data error");
    }
  };

  useEffect(() => {
    if (myChatList) {
      fetchChatRoomList();
    }
  }, [myChatList]);

  const handleChatRoomClick = (roomId: number) => {
    router.push(`/direct/in/${roomId}`);
  };

  return (
    <Container>
      <DirectHeader userInfo={userInfo} />
      <PageTitle>메시지</PageTitle>
      <ChatRoomList
        myChatList={myChatList}
        onChatRoomClick={handleChatRoomClick}
      />
    </Container>
  );
};

export default Direct;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const PageTitle = styled.div`
  display: flex;
  padding: 14px 16px 10px;
  font-size: 16px;
`;
