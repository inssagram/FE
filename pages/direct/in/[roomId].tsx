import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Stomp from "stompjs";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { ChatRoomHeader } from "@/components/atoms/Header";
import MemberProfile from "@/components/Chat/MemberProfile";
import ChatRoom from "@/components/Chat/ChatRoom";
import MessageInput from "@/components/Chat/MessageInput";
import WebSocketHandler from "@/services/chatInfo/webSocketHandler";
import getChatRoomDataAxios from "@/services/chatInfo/getChatRoom";

interface ChatRoomData {
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
interface InProps {}

const In: React.FC<InProps> = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [chatRoom, setChatRoom] = useState<ChatRoomData | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();
  const { roomId } = router.query;

  // 웹소켓 연결 시 호출될 함수
  const handleConnect = () => {
    console.log("WebSocket connected!");
  };

  // 특정 채팅방 조회
  const fetchChatRoomDataAll = async (roomId: number) => {
    try {
      const res = await getChatRoomDataAxios(roomId);
      setChatRoom(res);
    } catch (err) {
      handleError(err, "fetching chat room data error");
    }
  };

  // 메시지 수신 시 호출될 함수
  const handleMessageReceived = (message: any) => {
    console.log("Received message:", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (roomId) {
      fetchChatRoomDataAll(roomId);
      // 채팅방에 들어가면 웹소켓 연결
      console.log("Joining Chat Room:", roomId);
    }
  }, [roomId]);

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

  return (
    <>
      {roomId && (
        <>
          <WebSocketHandler
            onConnect={handleConnect}
            roomId={roomId}
            onMessageReceived={handleMessageReceived}
          />
          <ChatRoomHeader memberInfo={chatRoom} />
          <MemberProfile memberInfo={chatRoom} />
          <ChatRoom
            messages={messages}
            images={images}
            contentRef={contentRef}
          />
          <MessageInput images={images} />
        </>
      )}
    </>
  );
};

export default In;
