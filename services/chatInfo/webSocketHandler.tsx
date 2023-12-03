import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

interface WebSocketHandlerProps {
  roomId: number;
  onConnect: () => void;
  onMessageReceived: any;
}

const WebSocketHandler: React.FC<WebSocketHandlerProps> = ({
  roomId,
  onConnect,
  onMessageReceived,
}) => {
  useEffect(() => {
    if (roomId) {
      const socket = new SockJS("https://api.inssagram.shop/ws-stomp");
      const stompClient = Stomp.over(socket);
      const token = sessionStorage.getItem("token");

      const connectCallback = () => {
        console.log("Stomp client connected!");
        onConnect();

        stompClient.subscribe(
          `/exchange/chat.exchange/room.${roomId}`,
          (message) => {
            try {
              const receivedMessage = JSON.parse(message.body);
              onMessageReceived(receivedMessage);
            } catch (error) {
              console.error("Error parsing received message:", error);
            }
          }
        );
        stompClient.connect({ token: token }, connectCallback);

        return () => {
          if (stompClient.connected) {
            stompClient.disconnect(() => {
              console.log("Stomp client disconnected!");
            });
          }
        };
      };
    }
  }, [onConnect, roomId, onMessageReceived]);

  return null;
};

export default WebSocketHandler;
