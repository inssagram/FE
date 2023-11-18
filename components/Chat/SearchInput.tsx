import { useState, useEffect } from "react";
import styled from "styled-components";

interface AccountData {
  memberId: number;
  nickName: string;
  job: string;
  friendStatus: boolean;
  image: string;
}

interface SearchInputProps {
  onSearch: (searchValue: string) => void;
  selectedAccount: AccountData | null;
  isAccountSelected: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  selectedAccount,
  isAccountSelected,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  useEffect(() => {
    if (isAccountSelected) {
      setSearchValue("");
    }
  }, [isAccountSelected]);

  return (
    <>
      <SearchBarContainer>
        <Title>받는 사람:</Title>
        {selectedAccount && selectedAccount.nickName && (
          <SelectedAccount>
            <Tag>
              <Name>
                {selectedAccount.nickName ? selectedAccount.nickName : ""}
              </Name>
            </Tag>
          </SelectedAccount>
        )}
        <Input
          type="text"
          placeholder={"검색..."}
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
