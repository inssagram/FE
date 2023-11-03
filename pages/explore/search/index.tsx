import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SearchHistoryHeader } from "@/components/atoms/Header";
import { SearchItem } from "@/components/atoms/Item";
import SearchBar from "@/components/input/SearchBar";
import Footer from "@/components/Footer";
import getSearchHistoryAxios from "@/services/searchInfo/getSearchHistory";
import deleteSearchHistoryAxios from "@/services/searchInfo/deleteSearchHistory";
import postSearchValueAxios from "@/services/searchInfo/postSearchValue";
import { RootState } from "@/src/redux/Posts/store";

interface SearchHistoryData {
  searched: string;
}

const Search: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  const [searchResults, setSearchResults] = useState<SearchHistoryData[]>([]);

  useEffect(() => {
    if (userInfo && userInfo.member_id) {
      fetchSearchHistoryData(userInfo.member_id);
    }
  }, [userInfo]);

  const fetchSearchHistoryData = async (memberId: number) => {
    try {
      const response = await getSearchHistoryAxios(memberId);
      setSearchHistory(response);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (userInfo && userInfo.member_id) {
      postSearchTermData(userInfo.member_id);
    }

    if (searchHistory.length > 0) {
      const filteredResults = searchHistory.filter((history) =>
        history.searched.includes(searchValue)
      );
      setSearchResults(filteredResults);
    }
  };

  const postSearchTermData = async (memberId: number) => {
    try {
      await postSearchValueAxios(memberId);
    } catch (error) {
      console.error("Error posting search value:", error);
    }
  };

  const handleDeleteHistory = async (index: number) => {
    try {
      const deletedTerm = searchHistory[index].searched;
      const response = await deleteSearchHistoryAxios(deletedTerm);
      if (response) {
        const newSearchHistory = searchHistory.filter((_, i) => i !== index);
        setSearchHistory(newSearchHistory);
      }
    } catch (error) {
      console.error("Error deleting search history:", error);
    }
  };

  return (
    <>
      <Container>
        <PageHeader>
          <SearchBar onSearch={handleSearch} />
        </PageHeader>
        {searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <SearchItem key={index} searchTerm={result.searched} />
          ))}
        <SearchHistoryHeader />
        {searchHistory.length > 0 ? (
          searchHistory.map((history, index) => (
            <SearchItem
              key={index}
              searchTerm={history.searched}
              onClick={() => handleDeleteHistory(index)}
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
