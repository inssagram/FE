import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { DirectHeader } from "@/components/atoms/Header";
import DmAccountsList from "@/components/list/DmAccountsList";
import { RootState } from "@/src/redux/Posts/store";

const Direct: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");

  //   if (token) {
  //     const socket = new SockJS("/ws://http://3.36.239.69:8080/we-stomp");
  //     const stompClient = Stomp.over(socket);

  //     stompClient.connect({ Authorization: `${token}` }, () => {
  //       console.log("Websocket connected with token:", token);
  //     });
  //   }
  // }, []);

  // const token = sessionStorage.getItem("token");
  // const webSocket = new WebSocket("ws://localhost:8080/ws-stomp");

  // const handleCreateChatRoom = async () => {
  //   try {
  //     const newChatRoomId = await createChatRoom();
  //     setChatRoomId(newChatRoomId);
  //   } catch (error) {
  //     console.error("채팅방을 생성하는 중에 오류가 발생했습니다", error);
  //   }
  // };

  return (
    <Container>
      <DirectHeader
        userInfo={userInfo}
        // onCreateChatRoom={handleCreateChatRoom}
      />
      <PageTitle>메시지</PageTitle>
      {/* <DirectAccount>
        <DmAccountsList />
      </DirectAccount> */}
    </Container>
  );
};

export default Direct;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const PageTitle = styled.div`
  display: flex;
  padding: 14px 16px 10px;
  font-size: 16px;
`;

const DirectAccount = styled.div``;
