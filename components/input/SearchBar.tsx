import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

const Xmark = styled.div`
  color: #888;
  cursor: pointer;
`;

const CancleButton = styled.div`
  width: 28px;
  color: #888;
  margin-left: 8px;
  cursor: pointer;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchArea>
        <SearchIcon>
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"15px"} />
        </SearchIcon>
        <Input type="text" placeholder="검색" />
        <Xmark>
          <FontAwesomeIcon icon={faCircleXmark} fontSize={"15px"} />
        </Xmark>
      </SearchArea>
      <CancleButton>취소</CancleButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
