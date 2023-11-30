import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { NewChatRoomHeader } from "@/components/Chat/Header";
import AccountList from "@/components/Chat/AccountList";
import SearchInput from "@/components/Chat/SearchInput";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";
import postNewChatRoomAxios from "@/services/chatInfo/postNewChatRoom";
import { SearchItemData } from "@/types/SearchItemTypes";

const New: React.FC<SearchItemData> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItemData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<SearchItemData | null>(
    null
  );
  const [isAccountSelected, setIsAccountSelected] = useState(false);

  const router = useRouter();

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (isAccountSelected) {
      setSearchTerm("");
      setIsAccountSelected(false);
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

  useEffect(() => {
    setSearchTerm("");
  }, [selectedAccount]);

  const handleSelectedAccount = (account: SearchItemData) => {
    setSelectedAccount(account);
  };

  const handleChatRoomClick = async () => {
    if (userInfo && selectedAccount) {
      const firstParticipantId = userInfo.member_id;
      const secondParticipantId = selectedAccount.memberId;

      try {
        const res = await postNewChatRoomAxios(
          firstParticipantId,
          secondParticipantId
        );
        const createdRoomId = res;
        router.push(`/direct/in/${createdRoomId.chatRoomId}`);
      } catch (err) {
        handleError(err, "Error creating chat room:");
      }
    }
  };

  return (
    <>
      <NewChatRoomHeader onClick={handleChatRoomClick} />
      <>
        <SearchInput
          onSearch={handleSearch}
          selectedAccount={selectedAccount}
          isAccountSelected={isAccountSelected}
        />
        <ResultsContainer>
          <AccountList
            searchResults={searchResults}
            onSelectAccount={handleSelectedAccount}
            isAccountSelected={isAccountSelected}
            setIsAccountSelected={setIsAccountSelected}
          />
        </ResultsContainer>
      </>
    </>
  );
};

export default New;

const ResultsContainer = styled.div`
  margin-top: 16px;
`;
