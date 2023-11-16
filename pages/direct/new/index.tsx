import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { handleError } from "@/utils/errorHandler";
import { DirectNewHeader } from "@/components/atoms/Header";
import SearchInput from "@/components/Chat/SearchInput";
import AccountList from "@/components/Chat/AccountList";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";
import WebSocketHandler from "@/services/chatInfo/webSocketHandler";
import postChatRoomAxios from "@/services/chatInfo/postChatRoom";
import { RootState } from "@/src/redux/Posts/store";

interface UserData {
  member_id: number;
  nickname: string;
  job: string;
  image: string;
}

interface AccountData {
  memberId: number;
  nickName: string;
  job: string;
  friendStatus: boolean;
  image: string;
}

const New: React.FC<AccountData> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const userToken = sessionStorage.getItem("token");
  const [roomId, setRoomId] = useState<number | null>(null);
  console.log(roomId);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<AccountData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountData[]>([]);
  console.log(selectedAccount);

  const router = useRouter();

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (!searchValue) {
      setSelectedAccount([]);
    }
  };

  // 검색 결과 조회
  const fetchSearchResultList = async (keyword: string) => {
    try {
      const res = await getSearchResultAxios(keyword);
      setSearchResults(res);
    } catch (err) {
      handleError(err, "Error searching result:");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResultList(searchTerm);
    }
  }, [searchTerm]);

  const handleSelectedAccount = (account: AccountData) => {
    setSelectedAccount([account]);
  };

  const handleChatRoomClick = async () => {
    if (userInfo && selectedAccount.length > 0) {
      const firstParticipantId = userInfo.member_id;
      const secondParticipantId = selectedAccount[0].memberId;

      try {
        const res = await postChatRoomAxios(
          firstParticipantId,
          secondParticipantId
        );
        const createdRoomId = res;
        setRoomId(createdRoomId.chatRoomId);
        router.push(`/direct/in/${createdRoomId.chatRoomId}`);
      } catch (err) {
        handleError(err, "Error creating chat room:");
      }
    }
  };

  return (
    <>
      {/* <WebSocketHandler
        onConnect={() => {}}
        roomId={roomId}
        // onMessageReceived={handleNewMessageReceived}
      /> */}
      <DirectNewHeader onChatRoomClick={handleChatRoomClick} />
      <div>
        <SearchInput
          onSearch={handleSearch}
          selectedAccount={selectedAccount}
        />
        <ResultsContainer>
          <AccountList
            searchResults={searchResults}
            onSelectAccount={handleSelectedAccount}
          />
        </ResultsContainer>
      </div>
    </>
  );
};

const ResultsContainer = styled.div`
  margin-top: 16px;
`;

export default New;
