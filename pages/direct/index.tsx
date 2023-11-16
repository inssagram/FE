import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { DirectHeader } from "@/components/atoms/Header";
import ChatRoomList from "@/components/Chat/ChatRoomList";
import getChatRoomListAxios from "@/services/chatInfo/getChatRoomList";

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

const Direct: React.FC<ChatRoomListProps> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRoomList = async (memberId: number) => {
    try {
      const res = await getChatRoomListAxios(memberId);
      setChatRooms(res);
    } catch (err) {
      handleError(err, "fetching chat room data error");
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchChatRoomList(userInfo.member_id);
    }
  }, [userInfo]);

  return (
    <Container>
      <DirectHeader userInfo={userInfo} />
      <PageTitle>메시지</PageTitle>
      <ChatRoomList chatRooms={chatRooms} />
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
