import { useState, useEffect } from "react";
import styled from "styled-components";

const SearchInput: React.FC<{
  onSearch: (searchValue: string) => void;
  selectedAccount: string | null;
}> = ({ onSearch, selectedAccount }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  useEffect(() => {
    if (selectedAccount) {
      setSelectedItem((prevSelectedItem) => [
        ...prevSelectedItem,
        selectedAccount,
      ]);
      setSearchValue("");
      onSearch("");
    }
  }, [selectedAccount, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <>
      <SearchBarContainer>
        <Title>받는 사람:</Title>
        {selectedItem.length > 0 && (
          <SelectedAccount>
            {selectedItem.map((item, index) => (
              <Tag key={index}>
                <Name>{item}</Name>
              </Tag>
            ))}
          </SelectedAccount>
        )}
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.p`
  min-width: 75px;
`;

const Input = styled.input`
  flex-grow: 1;
  overflow-y: visible;
  border: none;
  outline: none;
  padding: 4px 12px 4px 20px;
  height: 42px;
  font-size: 16px;
  color: #222;
  background-color: #fff;
`;

const SelectedAccount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 200px;
  overflow-x: auto;
  flex-shrink: 0;
`;

const Tag = styled.div`
  margin-left: 7px;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  min-width: 60px;
  height: 26px;
  background-color: #e0f1ff;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #0095f6;
`;

export default SearchInput;
