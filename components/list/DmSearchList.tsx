import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ResultContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-right: 12px;
  border-radius: 100%;
`;

const Account = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 288px;
  height: 36px;
  font-size: 14px;
`;
const Name = styled.span``;

const Id = styled.span`
  color: #737373;
`;

const ResultsList = styled.div`
  padding: 12px 24px;
`;

const Results = styled.div`
  color: #737373;
  font-size: 14px;
  font-weight: 400;
`;

const SelectBtn = styled.button`
  border: none;
  outline: none;
  margin-left: 12px;
  color: transparent;
  background-color: transparent;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;

  &:active {
    color: #0095f6;
    border: 1px solid transparent;
  }
`;

interface Item {
  id: number;
  name: string;
  userId: string;
  profileUrl: string;
}

const DmSearchList: React.FC<{
  searchTerm: string;
  onItemSelect: (item: Item) => void;
}> = ({ searchTerm, onItemSelect }) => {
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get<Item[]>("http://localhost:3001/accounts")
        .then((response) => response.data)
        .then((data) => {
          const filteredResults = data.filter((item) =>
            item.userId.startsWith(searchTerm)
          );
          setSearchResults(filteredResults);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      {searchResults.length > 0 ? (
        searchResults.map((item: Item) => (
          <ResultContainer key={item.id}>
            <Profile>
              <Image
                src={item.profileUrl}
                alt="프로필"
                width={44}
                height={44}
              />
            </Profile>
            <Account>
              <Name>{item.name}</Name>
              <Id>{item.userId}</Id>
            </Account>
            <SelectBtn onClick={() => onItemSelect(item)}>
              <Icon icon={faCircleCheck} fontSize={24} />
            </SelectBtn>
          </ResultContainer>
        ))
      ) : (
        <ResultsList>
          <Results>계정을 찾을 수가 없습니다.</Results>
        </ResultsList>
      )}
    </>
  );
};

export default DmSearchList;
