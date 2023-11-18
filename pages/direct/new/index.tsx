import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/Posts/store";
import { handleError } from "@/utils/errorHandler";
import { DirectNewHeader } from "@/components/atoms/Header";
import SearchInput from "@/components/Chat/SearchInput";
import AccountList from "@/components/Chat/AccountList";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";
import postNewChatRoomAxios from "@/services/chatInfo/postNewChatRoom";

interface AccountData {
  memberId: number;
  nickName: string;
  job: string;
  friendStatus: boolean;
  image: string;
}

const New: React.FC<AccountData> = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<AccountData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(
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

  const handleSelectedAccount = (account: AccountData) => {
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
      <DirectNewHeader onChatRoomClick={handleChatRoomClick} />
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
