import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import {
  MemberInfoData,
  PreviousMessageData,
  NewMessageData,
} from "@/types/ChatRoomTypes";
import { ChatRoomHeader } from "@/components/Chat/Header";
import MemberProfile from "@/components/Chat/MemberProfile";
import ChatRoom from "@/components/Chat/ChatRoom";
import MessageInput from "@/components/Chat/MessageInput";
import WebSocketHandler from "@/services/chatInfo/webSocketHandler";
import getChatRoomDataAxios from "@/services/chatInfo/getChatRoom";
import getChatRoomHistoryAxios from "@/services/chatInfo/getChatRoomHistory";

const In: React.FC = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [chatRoom, setChatRoom] = useState<{
    sender: MemberInfoData | null;
    receiver: MemberInfoData | null;
  } | null>(null);
  const [previousMessages, setPreviousMessages] = useState<
    PreviousMessageData[]
  >([]);
  const [newMessage, setNewMessage] = useState<NewMessageData[]>([]);
  const router = useRouter();
  const { roomId } = router.query;

  const socket = new SockJS("http://3.36.239.69:8080/ws-stomp");
  const stompClient = Stomp.over(socket);
  const accessToken = sessionStorage.getItem("token");

  const parsedRoomId =
    typeof roomId === "string" ? parseInt(roomId, 10) : undefined;

  const handleConnect = () => {
    console.log("웹 소켓 연결 됐어용");
  };

  // 특정 채팅방
  const fetchChatRoomDataAll = async (roomId: number) => {
    try {
      const res = await getChatRoomDataAxios(roomId);

      const memberList = res.memberList;
      const senderId = Object.keys(memberList)[0];
      const receiverId = Object.keys(memberList)[1];
      const sender = memberList[senderId];
      const receiver = memberList[receiverId];

      setChatRoom({
        sender: sender || null,
        receiver: receiver || null,
      });
    } catch (err) {
      handleError(err, "fetching chat room data error");
    }
  };

  // 특정 채팅방 과거 대화내용
  const fetchChatRoomContents = async (roomId: number) => {
    try {
      const res = await getChatRoomHistoryAxios(roomId);
      setPreviousMessages(res.data);
    } catch (err) {
      handleError(err, "fetching chat room contents error");
    }
  };

  useEffect(() => {
    if (parsedRoomId !== undefined) {
      fetchChatRoomDataAll(parsedRoomId);
      fetchChatRoomContents(parsedRoomId);
    }
  }, [parsedRoomId]);

  // 메시지 보내기
  const handleSendMessage = (messageData: NewMessageData) => {
    if (stompClient && messageData.message.trim() !== "" && chatRoom) {
      stompClient.send(
        `/pub/chat.message.${parsedRoomId}`,
        { token: accessToken },
        JSON.stringify(messageData)
      );

      setNewMessage((prevMessages) => [...prevMessages, messageData]);
    }
  };

  const handleEnterKeyPress = (messageData: NewMessageData) => {
    handleSendMessage(messageData);
  };

  return (
    <>
      {parsedRoomId !== undefined && (
        <>
          <WebSocketHandler
            onConnect={handleConnect}
            roomId={parsedRoomId}
            // onMessageReceived={previouseMessage}
          />
          <ChatRoomHeader receiver={chatRoom?.receiver} />
          <MemberProfile receiver={chatRoom?.receiver} />
          <ChatRoom
            userInfo={userInfo}
            sender={chatRoom?.sender}
            receiver={chatRoom?.receiver}
            previousMessages={previousMessages}
            newMessage={newMessage}
          />
          <MessageInput
            roomId={roomId}
            receiver={chatRoom?.receiver}
            onEnterKeyPress={handleEnterKeyPress}
          />
        </>
      )}
    </>
  );
};

export default In;

// // 메세지 보내기
// const handleSendMessage = (message: string, images: File[]) => {
//   // const getCurrentTime = (): string => {
//   //   const now = new Date();
//   //   const hours = now.getHours();
//   //   const minutes = now.getMinutes();
//   //   const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
//   //   const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//   //   return `${formattedHours}:${formattedMinutes}`;
//   // };

//   setMessages((prevMessages) => [...prevMessages, message]);
//   setImages((prevImages) => [...prevImages, ...images]);

//   const messageData = {
//     type: "message",
//     chatRoomId: roomId,
//     sender: "userInfo.nickname",
//     message: message,
//     // postId: 1,
//     timestamp: getCurrentTime(),
//   };

//   if (stompClient) {
//     stompClient.send(
//       `/pub/chat.message.${roomId}`,
//       {},
//       JSON.stringify(messageData)
//     );
//     stompClient.send(
//       `/pub/chat.messageWithPost.${roomId}`,
//       {},
//       JSON.stringify({ images })
//     );
//   }

//   if (contentRef.current) {
//     contentRef.current.scrollTop = contentRef.current.scrollHeight;
//     contentRef.current.focus();
//   } else {
//     console.error("WebSocket is not connected.");
//   }
//   console.log(`전달된 메시지: ${message}`);
// };
