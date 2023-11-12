import SockJS from "sockjs-client";
import Stomp from "stompjs";

const socket = new SockJS("http://3.36.239.69:8080/ws-stomp");

socket.onopen = function () {
  console.log("Connection opened");

  socket.send("Hello, chanee!");
};

socket.onmessage = function (e) {
  console.log("Received message:", e.data);

  socket.close();
};

socket.onclose = function () {
  console.log("Connection closed");
};

// 메세지 전송
const sendMessageToChatRoom = (roomId, token, message) => {
  const socket = new SockJS("http://3.36.239.69:8080/ws-stomp");
  const stompClient = Stomp.over(socket);

  const connectCallback = () => {
    console.log("Stomp client connected!");

    const messageDestination = `/pub/chat.message.${roomId}`;
    const messageWithPostDestination = `/pub/chat.messageWithPost.${roomId}`;

    stompClient.send(
      messageDestination,
      { Authorization: token },
      JSON.stringify(message)
    );

    stompClient.send(messageWithPostDestination, {}, JSON.stringify(message));
  };

  stompClient.connect({ Authorization: token }, connectCallback);
};

const roomId = 1;
const userToken = sessionStorage.getItem("token");

const message = {
  type: "message",
  chatRoomId: roomId,
  sender: "hong",
  message: "Hello, sam",
  postId: 1,
};

sendMessageToChatRoom(roomId, userToken, message);

// 채팅방 구독
// const subscribeToChatRoom = (roomId: number, token: string) => {
//   const socket = new SockJS("http://3.36.239.69:8080/ws-stomp");
//   const stompClient = Stomp.over(socket);

//   stompClient.connect(
//     { Authorization: token },
//     () => {
//       console.log("Stomp client connected!");

//       stompClient.subscribe(
//         `/exchange/chat.exchange/room.${roomId}`,
//         (message) => {
//           const receivedMessage = JSON.parse(message.body);
//           console.log("Received message:", receivedMessage);
//         }
//       );
//     },
//     (error) => {
//       console.error("Error connecting to WebSocket:", error);
//     }
//   );
// };

//   const errorCallback = (error) => {
//     console.error("Stomp client failed to connect:", error);
//   };

//   const token = sessionStorage.getItem("token");

//   stompClient.connect(
//     {
//       Authorization: token,
//     },
//     connectCallback,
//     errorCallback
//   );

//   // return () => {
//   //   // 컴포넌트가 언마운트 될 때 연결을 해제합니다.
//   //   stompClient.disconnect();
//   // };
// }, []);
