import styled from "styled-components";
import { useState, useEffect } from "react";
import { handleError } from "@/utils/errorHandler";
import { SearchHistoryHeader } from "@/components/atoms/Header";
import { SearchItem } from "@/components/atoms/Item";
import SearchBar from "@/components/input/SearchBar";
import Footer from "@/components/Footer";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";
import getSearchHistoryAxios from "@/services/searchInfo/getSearchHistory";
import postSearchTermAxios from "@/services/searchInfo/postSearchTerm";
import deleteSearchHistoryAxios from "@/services/searchInfo/deleteSearchHistory";

interface SearchItemData {
  memberId: number;
  email: string;
  searched: string;
  nickName: string;
  friendStatus: boolean;
  job: string;
  image: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newSearchTerm, setNewSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItemData[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchItemData[]>([]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  // 검색 결과 조회
  const fetchSearchResultData = async (keyword: string) => {
    try {
      const res = await getSearchResultAxios(keyword);
      setSearchResults(res);
    } catch (err) {
      handleError(err, "Error creating post:");
    }
  };

  // 검색 결과 저장
  const postSearchTermData = async (memberId: number) => {
    try {
      const res = await postSearchTermAxios(memberId);
      setNewSearchTerm(res.data);
    } catch (err) {
      handleError(err, "Error posting search value:");
    }
  };

  const handleSearchItemClick = (memberId: number) => {
    postSearchTermData(memberId);
  };

  // 최근 검색 기록 조회
  const fetchSearchHistoryData = async () => {
    try {
      const res = await getSearchHistoryAxios();
      setSearchHistory(res);
    } catch (err) {
      handleError(err, "Error loading search history:");
    }
  };

  useEffect(() => {
    fetchSearchHistoryData();
  }, []);

  // 최근 검색 기록 삭제
  const handleSearchItemDeleteClick = async (searched: string) => {
    try {
      const res = await deleteSearchHistoryAxios(searched);
      if (res) {
        const updatedSearchHistory = await getSearchHistoryAxios();
        setSearchHistory(updatedSearchHistory);
      }
    } catch (err) {
      handleError(err, "검색 기록 삭제 중 오류 발생:");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResultData(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      <Container>
        <PageHeader>
          <SearchBar onSearch={handleSearch} />
        </PageHeader>
        {searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <SearchItem
              key={index}
              result={result}
              handleClick={() => handleSearchItemClick(result.memberId)}
            />
          ))}
        {searchResults.length > 0 ? "" : <SearchHistoryHeader />}
        {searchHistory.length > 0 ? (
          searchHistory.map((history, index) => (
            <SearchItem
              key={index}
              result={history}
              handleDelete={() => handleSearchItemDeleteClick(history.searched)}
              isHistory
            />
          ))
        ) : (
          <NoHistory>최근 검색 기록이 없습니다.</NoHistory>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Search;

const Container = styled.section`
  width: 100%;
  height: 90vh;
  color: #222222;
  background-color: #ffffff;
  // color: #ffffff;
  // background-color: #000000;
`;

const PageHeader = styled.div`
  padding: 10px 16px;
`;

const NoHistory = styled.div`
  margin: 20px 16px 0;
  font-weight: lighter;
`;
