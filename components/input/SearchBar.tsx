import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  // border: 1px solid #ccc;
  padding: 8px;
  border-radius: 7px;
  background-color: #404040;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 8px;
  color: #fff;
  background-color: #404040;
`;

const SearchIcon = styled.div`
  color: #888;
  margin-right: 8px;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchIcon>
        <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"15px"} />
      </SearchIcon>
      <Input type="text" placeholder="검색" />
    </SearchBarContainer>
  );
};

export default SearchBar;
