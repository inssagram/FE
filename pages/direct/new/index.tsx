import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useRouter } from "next/router";
import { handleError } from "@/utils/errorHandler";
import { BackArrow } from "@/components/atoms/Icon";
import SearchInput from "@/components/Chat/SearchInput";
import AccountList from "@/components/Chat/AccountList";
import postChatRoomAxios from "@/services/chatInfo/postChatRoom";

interface SearchData {
  memberId: number;
  nickname: string;
  profileImg: string;
}

const New: React.FC<SearchData> = () => {
  const userToken = sessionStorage.getItem("token");
  const [roomId, setRoomId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const router = useRouter();

  // 채팅방 구독
  const subscribeToChatRoom = (roomId: number | null, token: string) => {
    if (roomId !== null) {
      const socket = new SockJS("http://3.36.239.69:8080/ws-stomp");
      const stompClient = Stomp.over(socket);

      const connectCallback = () => {
        console.log("Stomp client 연결됐어!!");

        stompClient.subscribe(
          `/exchange/chat.exchange/room.${roomId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("Received message:", receivedMessage);
          }
        );
      };

      stompClient.connect({ Authorization: token }, connectCallback);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleAccountSelect = (result: SearchData) => {
    setSelectedAccount(result.nickname);
  };

  // 채팅방 생성 및 입장 선택된 유저 id 담아서 요청?
  const handleChatRoomClick = async (name: string) => {
    if (selectedAccount) {
      try {
        const res = await postChatRoomAxios(name);
        const createdRoomId = res.roomId;

        // 채팅방 입장
        setRoomId(createdRoomId);
        subscribeToChatRoom(createdRoomId, userToken || "");
        console.log(`Joining Chat Room: ${createdRoomId}`);
        router.push(`/direct/in/${createdRoomId}`);
      } catch (err) {
        handleError(err, "Error creating chat room:");
      }
    }
  };

  useEffect(() => {
    if (roomId !== null) {
      subscribeToChatRoom(roomId, userToken || "");
    }
  }, [roomId, userToken]);

  const handleNextClick = () => {
    if (selectedAccount) {
      handleChatRoomClick("채팅방");
    }
  };

  return (
    <>
      <NewHeader>
        <BackArrow />
        <HeaderTitle>새로운 메시지</HeaderTitle>
        {/* {selectedItem && (
          <Link href={`/direct/in/${selectedItem.id}`}> */}
        <Next onClick={handleNextClick}>다음</Next>
        {/* </Link>
        )} */}
      </NewHeader>
      <div>
        <SearchInput
          onSearch={handleSearch}
          selectedAccount={selectedAccount}
        />
        <ResultsContainer>
          <AccountList
            searchTerm={searchTerm}
            onAccountSelect={handleAccountSelect}
          />
        </ResultsContainer>
      </div>
    </>
  );
};

export default New;

const NewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

const HeaderTitle = styled.h2`
  margin: 0 auto;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const Next = styled.button`
  padding-left: 12px;
  border: none;
  font-size: 14px;
  color: #0095f6;
  background-color: transparent;
`;

const ResultsContainer = styled.div`
  margin-top: 16px;
`;
