// const token = sessionStorage.getItem("token") || "";

const socket = new WebSocket("ws://localhost:8080/ws-stomp");

socket.onopen = function (event) {
  console.log("웹소켓이 열렸습니다.");
};

socket.onmessage = function (event) {
  console.log("메시지 수신:", event.data);
};

socket.onclose = function (event) {
  console.log("웹소켓이 닫혔습니다.");
};

socket.onerror = function (error) {
  console.error("웹소켓 에러:", error);
};

socket.send("이건 테스트");

socket.close();
