import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { handleError } from "@/utils/errorHandler";
import { PageHeader } from "@/components/atoms/Header";
import AccountList from "@/components/Chat/AccountList";
import SearchInput from "@/components/Chat/SearchInput";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";
import postSharePostAxios from "@/services/chatInfo/postSharePost";
import { SearchItemData } from "@/types/SearchItemTypes";

const SharePost: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItemData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<SearchItemData | null>(
    null
  );
  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const pageTitle = "공유";
  const router = useRouter();
  const { id } = router.query;
  const postId: number = typeof id === "string" ? parseInt(id, 10) : -1;

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (isAccountSelected) {
      setSearchTerm("");
      setIsAccountSelected(false);
    }
  };

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

  const handleSharePost = async (
    type: string,
    receiverMemberId: number,
    postId: number,
    message: string
  ) => {
    try {
      const res = await postSharePostAxios(
        type,
        receiverMemberId,
        postId,
        message
      );

      if (res.status === "success") {
        router.push(`/post/${postId}`);
      }
      console.log(res);
    } catch (err) {
      handleError(err, "SharedPost error");
    }
  };

  const handleSelectedAccount = (account: SearchItemData) => {
    setSelectedAccount(account);
  };

  const handleSendPost = () => {
    if (selectedAccount && postId) {
      handleSharePost(
        "message",
        selectedAccount.memberId,
        postId,
        "share post"
      );
    }
  };

  return (
    <>
      <PageHeader title={pageTitle} />
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
      <SendArea>
        <SendButton onClick={handleSendPost}>보내기</SendButton>
      </SendArea>
    </>
  );
};

export default SharePost;

const ResultsContainer = styled.div`
  margin-top: 16px;
  min-height: 740px;
`;

const SendArea = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`;

const SendButton = styled.button`
  width: 380px;
  height: 32px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  background-color: #0095f6;
`;
