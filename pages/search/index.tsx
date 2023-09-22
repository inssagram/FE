import React from "react";
import * as SC from "./styled";
import SearchBar from "../../components/input/SearchBar";
import ResultsList from "../../components/result/ResultsList";
import Footer from "../../components/Footer";

const Search: React.FC = () => {
  return (
    <>
      <SC.Container>
        <SC.PageHeader>
          <SearchBar />
        </SC.PageHeader>
        <SC.ResultsContainer>
          <ResultsList />
          <ResultsList />
          <ResultsList />
          <ResultsList />
        </SC.ResultsContainer>
      </SC.Container>
      <Footer />
    </>
  );
};

export default Search;
