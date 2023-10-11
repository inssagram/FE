import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styled from "styled-components";

const ResultContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
`;

const Profile = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-right: 12px;
`;

const Account = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
  font-size: 14px;
`;
const Name = styled.span``;

const Id = styled.span`
  color: #737373;
`;

const ResultsList = styled.div`
  padding: 24px;
  height: 35px;
`;

const Results = styled.div`
  color: #737373;
  font-size: 14px;
  font-weight: 400;
`;

interface Item {
  id: number;
  name: string;
  userId: string;
  imageUrl: string;
}

const DmSearchList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
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
              <Image src={item.imageUrl} alt="프로필" width={44} height={44} />
            </Profile>
            <Account>
              <Name>{item.name}</Name>
              <Id>{item.userId}</Id>
            </Account>
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
