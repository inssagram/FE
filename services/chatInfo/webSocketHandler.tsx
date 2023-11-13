import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

interface WebSocketHandlerProps {
  onConnect: () => void;
  roomId: any;
  onMessageReceived: (message: any) => void;
}

const WebSocketHandler: React.FC<WebSocketHandlerProps> = ({
  onConnect,
  roomId,
  onMessageReceived,
}) => {
  useEffect(() => {
    if (roomId) {
      // 웹소켓 연결
      const socket = new SockJS("http://3.36.239.69:8080/ws-stomp");
      const stompClient = Stomp.over(socket);
      const token = sessionStorage.getItem("token");

      const connectCallback = () => {
        console.log("Stomp client connected!");
        onConnect();

        stompClient.subscribe(
          `/exchange/chat.exchange/room.${roomId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            onMessageReceived(receivedMessage);
          }
        );
        stompClient.connect({ Authorization: token }, connectCallback);

        return () => {
          if (stompClient.connected) {
            stompClient.disconnect();
          }
        };
      };
    }
  }, [onConnect, roomId, onMessageReceived]);

  return null;
};

export default WebSocketHandler;
