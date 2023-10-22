import React, { useState } from "react";
import * as SC from "@/components/styled/search";
import SearchBar from "@/components/input/SearchBar";
import SearchList from "@/components/list/SearchList/SearchList";
import Footer from "@/components/Footer";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  return (
    <>
      <SC.Container>
        <SC.PageHeader>
          <SearchBar onSearch={handleSearch} />
        </SC.PageHeader>
        <SC.ResultsContainer>
          <SearchList searchTerm={searchTerm} />
        </SC.ResultsContainer>
      </SC.Container>
      <Footer />
    </>
  );
};

export default Search;
