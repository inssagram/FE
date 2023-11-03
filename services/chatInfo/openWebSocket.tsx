import axios from "../customAxios";

const ws = new WebSocket("ws://localhost:8080/ws-stomp");

ws.onopen = () => {
  const accessToken = sessionStorage.getItem("token") || null;

  axios
    .post("/endpoint-to-send-token", { token: accessToken })
    .then((response) => {
      console.log("Token sent:", response.data);
    })
    .catch((error) => {
      console.error("Error sending token:", error);
    });
};

ws.onmessage = (event) => {};

ws.onclose = (event) => {
  console.log("WebSocket connection closed:", event);
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};
