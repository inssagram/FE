import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #c0c0c0;
  border-radius: 7px;
  background-color: #fff;
  // background-color: #404040;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 8px;
  color: #222;
  background-color: #fff;
  // color: #fff;
  // background-color: #404040;
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

const SearchBar: React.FC<{ onSearch: (searchValue: string) => void }> = ({
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancleClick = () => {
    router.back();
  };

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <SearchBarContainer>
      <SearchArea>
        <SearchIcon>
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"15px"} />
        </SearchIcon>
        <Link href="/explore/search" style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder="검색"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
        </Link>
        {searchValue && (
          <Xmark onClick={clearInput}>
            <FontAwesomeIcon icon={faCircleXmark} fontSize={"15px"} />
          </Xmark>
        )}
      </SearchArea>
      {isFocused && (
        <CancleButton onClick={handleCancleClick}>취소</CancleButton>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
