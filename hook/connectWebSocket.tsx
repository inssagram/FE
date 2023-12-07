import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useEffect } from "react";

interface WebSocketHandlerProps {
  accessToken: string | null;
  stompClient: Stomp.Client;
  onConnect: () => void;
  roomId: number;
  onMessageReceived: any;
}

const WebSocketHandler: React.FC<WebSocketHandlerProps> = ({
  accessToken,
  stompClient,
  onConnect,
  roomId,
  onMessageReceived,
}) => {
  useEffect(() => {
    if (roomId && stompClient) {
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

        stompClient.connect({ token: accessToken }, connectCallback);

        return () => {
          if (stompClient.connected) {
            stompClient.disconnect(() => {
              console.log("Stomp client disconnected!");
            });
          }
        };
      };
    }
  }, [accessToken, stompClient, onConnect, roomId, onMessageReceived]);

  return null;
};

export default WebSocketHandler;
