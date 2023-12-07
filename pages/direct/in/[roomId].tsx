import Stomp from "stompjs";
import SockJS from "sockjs-client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { ChatRoomHeader } from "@/components/Chat/Header";
import MemberProfile from "@/components/Chat/MemberProfile";
import ChatRoom from "@/components/Chat/ChatRoom";
import MessageInput from "@/components/Chat/MessageInput";
import WebSocketHandler from "@/hook/connectWebSocket";
import getChatRoomDataAxios from "@/services/chatInfo/getChatRoom";
import getChatHistoryWithRoomIdAxios from "@/services/chatInfo/getChatHistoryWithRoomId";
import getChatHistoryWithMemberIdAxios from "@/services/chatInfo/getChatHistoryWithMemberId";

import {
  MemberInfoData,
  PreviousMessageData,
  SendNewMessageData,
} from "@/types/ChatRoomTypes";

const In: React.FC = () => {
  // const contentRef = useRef<HTMLDivElement | null>(null);
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [chatRoom, setChatRoom] = useState<{
    sender: MemberInfoData | null;
    receiver: MemberInfoData | null;
  } | null>(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [previousMessages, setPreviousMessages] = useState<
    PreviousMessageData[]
  >([]);
  const [newMessage, setNewMessage] = useState<SendNewMessageData[]>([]);

  const router = useRouter();
  const { roomId: roomId } = router.query;
  const withRoomId: number =
    typeof roomId === "string" ? parseInt(roomId, 10) : -1;
  const { memberId: memberId } = router.query;
  const withMemberId: number =
    typeof memberId === "string" ? parseInt(memberId, 10) : -1;

  const accessToken = sessionStorage.getItem("token");
  const socket = new SockJS("https://api.inssagram.shop/ws-stomp");
  const stompClient = Stomp.over(socket);

  const handleConnect = () => {
    console.log("WebSocket connected!");
  };

  const handleSendMessage = (messageData: SendNewMessageData) => {
    if (stompClient && messageData.message.trim() !== "" && chatRoom) {
      stompClient.send(
        `/pub/chat.message.${withRoomId}`,
        { token: accessToken },
        JSON.stringify(messageData)
      );

      setNewMessage((prevMessages) => [...prevMessages, messageData]);
    }
  };

  const handleEnterKeyPress = (messageData: SendNewMessageData) => {
    handleSendMessage(messageData);
  };

  const fetchChatRoomDataAll = useCallback(
    async (roomId: number) => {
      try {
        const res = await getChatRoomDataAxios(roomId);
        const memberList = res.memberList;
        const currentUserId = userInfo?.member_id;
        const otherMemberId = Object.keys(memberList).find(
          (memberId) => Number(memberId) !== Number(currentUserId)
        );

        if (currentUserId && otherMemberId) {
          const senderId = currentUserId;
          const receiverId = otherMemberId;
          const sender = memberList[senderId];
          const receiver = memberList[receiverId];

          setChatRoom({
            sender: sender || null,
            receiver: receiver || null,
          });
        }
      } catch (err) {
        handleError(err, "fetching chat room data error");
      }
    },
    [userInfo?.member_id]
  );

  const fetchChatRoomHistory = useCallback(async (id: number) => {
    try {
      const res = await getChatHistoryWithRoomIdAxios(id);
      setPreviousMessages(res.data);
    } catch (err) {
      handleError(err, "fetching chat room contents error");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchChatRoomDataAll(withRoomId);
      await fetchChatRoomHistory(withRoomId);
    };

    if (withRoomId !== -1) {
      fetchData();
    }
  }, [withRoomId, fetchChatRoomDataAll, fetchChatRoomHistory]);

  return (
    <>
      <WebSocketHandler
        accessToken={accessToken}
        stompClient={stompClient}
        onConnect={handleConnect}
        roomId={withRoomId}
        onMessageReceived={setPreviousMessages}
      />
      <ChatRoomHeader chatRoom={chatRoom} />
      <MemberProfile chatRoom={chatRoom} />
      <ChatRoom
        userInfo={userInfo}
        previousMessages={previousMessages}
        newMessage={newMessage}
      />
      <MessageInput
        roomId={withRoomId}
        chatRoom={chatRoom}
        onEnterKeyPress={handleEnterKeyPress}
      />
    </>
  );
};

export default In;

// 두가지 루트로 이전 대화 내용 조회
// const fetchChatRoomHistory = async (id: number) => {
//   try {
//     if (isFetchingData) return;

//     setIsFetchingData(true);

//     if (withRoomId !== -1 && !withMemberId) {
//       const res = await getChatHistoryWithRoomIdAxios(id);
//       setPreviousMessages(res.data);
//     }

//     if (withMemberId !== -1 && !withRoomId) {
//       const res = await getChatHistoryWithMemberIdAxios(id);
//       setPreviousMessages(res.data);
//     }
//   } catch (err) {
//     handleError(err, "Error handling chat room action");
//   } finally {
//     setIsFetchingData(false);
//   }
// };

// useEffect(() => {
//   const fetchData = async () => {
//     if (withRoomId !== -1) {
//       fetchChatRoomDataAll(withRoomId);
//       await fetchChatRoomHistory(withRoomId);
//     }

//     if (withMemberId !== -1) {
//       await fetchChatRoomHistory(withMemberId);
//     }
//   };

//   fetchData();
// }, [withRoomId, withMemberId, userInfo?.member_id]);
