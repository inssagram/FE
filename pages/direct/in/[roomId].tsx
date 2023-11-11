import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import WebSocketHandler from "@/services/chatInfo/webSocketHandler";
import { DirectInHeader } from "@/components/atoms/Header";
import DirectPartner from "@/components/atoms/DirectPartner";
import ChatRoom from "@/components/Chat/ChatRoom";
import MessageInput from "@/components/Chat/MessageInput";

interface InProps {}

const In: React.FC<InProps> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [partner, setPartner] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const router = useRouter();
  const { roomId } = router.query;

  // 메세지 보내기
  const handleSendMessage = (message: string, images: File[]) => {
    const getCurrentTime = (): string => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      return `${formattedHours}:${formattedMinutes}`;
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setImages((prevImages) => [...prevImages, ...images]);

    const messageData = {
      type: "message",
      chatRoomId: roomId,
      sender: "userInfo.nickname",
      message: message,
      // postId: 1,
      timestamp: getCurrentTime(),
    };

    if (stompClient) {
      stompClient.send(
        `/pub/chat.message.${roomId}`,
        {},
        JSON.stringify(messageData)
      );
      stompClient.send(
        `/pub/chat.messageWithPost.${roomId}`,
        {},
        JSON.stringify({ images })
      );
    }

    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      contentRef.current.focus();
    } else {
      console.error("WebSocket is not connected.");
    }
    console.log(`전달된 메시지: ${message}`);
  };

  // 메세지 받기
  const handleReceivedMessage = (receivedMessage: string) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  useEffect(() => {
    if (roomId !== null) {
      console.log(`Joining Chat Room: ${roomId}`);
    }
  }, [roomId]);

  return (
    <>
      {roomId && (
        <>
          <WebSocketHandler
            onConnect={() => {
              const socket = new SockJS("http://example.com/ws-stomp");
              const newStompClient = Stomp.over(socket);
              setStompClient(newStompClient);
            }}
            roomId={roomId}
            onMessageReceived={handleReceivedMessage}
          />
          <DirectInHeader selectedItem={partner} />
          <DirectPartner selectedItem={partner} />
          <ChatRoom
            messages={messages}
            images={images}
            contentRef={contentRef}
          />
          <MessageInput onMessageSend={handleSendMessage} images={images} />
        </>
      )}
    </>
  );
};

export default In;
