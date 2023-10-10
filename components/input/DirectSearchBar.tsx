import { useState, useEffect } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.span``;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 4px 12px 4px 20px;
  font-size: 16px;
  color: #222;
  background-color: #fff;
`;

const DirectSearchBar: React.FC<{
  onSearch: (searchValue: string) => void;
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
}> = ({ onSearch, selectedUserId, setSelectedUserId }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(event.target.value);
    onSearch(newValue);
  };

  useEffect(() => {
    setSearchValue(selectedUserId || "");
  }, [selectedUserId]);

  return (
    <>
      <SearchBarContainer>
        <Title>받는 사람:</Title>
        <Input
          type="text"
          placeholder="검색..."
          value={searchValue}
          onChange={handleInputChange}
        />
      </SearchBarContainer>
    </>
  );
};

export default DirectSearchBar;
