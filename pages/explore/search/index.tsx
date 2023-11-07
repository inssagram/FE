import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SearchHistoryHeader } from "@/components/atoms/Header";
import { SearchItem } from "@/components/atoms/Item";
import SearchBar from "@/components/input/SearchBar";
import Footer from "@/components/Footer";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";
import getSearchHistoryAxios from "@/services/searchInfo/getSearchHistory";
import postSearchTermAxios from "@/services/searchInfo/postSearchTerm";
import deleteSearchHistoryAxios from "@/services/searchInfo/deleteSearchHistory";
import { RootState } from "@/src/redux/Posts/store";

interface SearchItemData {
  memberId: number;
  email: string;
  nickName: string;
  friendStatus: boolean;
  job: string;
  image: string;
}

const Search: React.FC = () => {
  // const userInfo = useSelector((state: RootState) => state.user.member);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSearchTerm, setNewSearchTerm] = useState("");
  console.log(newSearchTerm);
  const [searchResults, setSearchResults] = useState<SearchItemData[]>([]);
  console.log(searchResults);
  const [searchHistory, setSearchHistory] = useState<SearchItemData[]>([]);
  console.log(searchHistory);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const fetchSearchResultData = async (keyword: string) => {
    try {
      const response = await getSearchResultAxios(keyword);
      setSearchResults(response);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    const fetchSearchHistoryData = async () => {
      try {
        const response = await getSearchHistoryAxios();
        setSearchHistory(response.data);
      } catch (error) {
        console.error("Error loading search history:", error);
      }
    };

    if (searchHistory.length > 0) {
      fetchSearchHistoryData();
    }
  }, [searchHistory]);

  const postSearchTermData = async (memberId: number) => {
    try {
      const response = await postSearchTermAxios(memberId);
      setNewSearchTerm(response.data);
    } catch (error) {
      console.error("Error posting search value:", error);
    }
  };

  const handleSearchItemClick = (memberId: number) => {
    postSearchTermData(memberId);
  };

  // const deleteSearchHistoryData = async (keyword: string) => {
  //   try {
  //     const deletedTerm = searchHistory[keyword].searched;
  //     const response = await deleteSearchHistoryAxios(deletedTerm);
  //     if (response) {
  //       const newSearchHistory = searchHistory.filter((_, i) => i !== index);
  //       setSearchHistory(newSearchHistory);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting search history:", error);
  //   }
  // };

  // const handleSearchItemDelete = (keyword: string) => {
  //   postSearchTermData(keyword);
  // };

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
              onClick={() => handleSearchItemClick(result.memberId)}
            />
          ))}
        {searchResults.length > 0 ? "" : <SearchHistoryHeader />}
        {/* {searchResults.length > 0 ? (
          searchHistory.map((history, index) => (
            <SearchItem
              key={index}
              history={history}
              onClick={() => handleSearchItemDelete(history.keyword)}
              isHistory
            />
          ))
        ) : (
          <NoHistory>최근 검색 기록이 없습니다.</NoHistory>
        )} */}
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
