import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";

const Account = styled.li`
  height: 60px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
`;

const Profile = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
  font-size: 14px;
`;

const Name = styled.span`
  padding-bottom: 3px;
`;

const Desc = styled.span`
  color: #7c7c7c;
`;

interface Item {
  id: number;
  userId: string;
  desc: string;
  profileUrl: string;
}

const ResultsList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(false);
      axios
        .get<Item[]>(`http://localhost:3001/accounts`)
        .then((response) => response.data)
        .then((data) => {
          const filteredResults = data.filter((item) =>
            item.userId.startsWith(searchTerm)
          );
          setResults(filteredResults);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류 발생:", error);
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {results.map((result: Item) => (
        <Link key={result.id} href="/my">
          <Account>
            <Profile>
              <Image
                src={result.profileUrl}
                alt="프로필"
                width={44}
                height={44}
              />
            </Profile>
            <Info>
              <Name>{result.userId}</Name>
              <Desc>{result.desc}</Desc>
            </Info>
          </Account>
        </Link>
      ))}
    </>
  );
};

export default ResultsList;
