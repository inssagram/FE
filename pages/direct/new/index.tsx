import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { BackArrow } from "@/components/atoms/Icon";
import DirectSearchBar from "@/components/input/DirectSearchBar";
import DmSearchList from "@/components/list/DmSearchList";

interface Item {
  id: number;
  name: string;
  userId: string;
  profileUrl: string;
}

const New: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    setSelectedUser(item.name);
  };

  const handleNextClick = () => {
    if (selectedItem) {
      router.push(`/direct/in/${selectedItem.id}`);
    }
  };

  return (
    <>
      <NewHeader>
        <BackArrow />
        <HeaderTitle>새로운 메시지</HeaderTitle>
        {selectedItem && (
          <Link href={`/direct/in/${selectedItem.id}`}>
            <Next onClick={handleNextClick}>다음</Next>
          </Link>
        )}
      </NewHeader>
      <div>
        <DirectSearchBar onSearch={handleSearch} selectedItem={selectedUser} />
        <ResultsContainer>
          <DmSearchList
            onItemSelect={handleItemSelect}
            searchTerm={searchTerm}
          />
        </ResultsContainer>
      </div>
    </>
  );
};

export default New;

const NewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-bottom: 1px solid #ccc;
`;

const HeaderTitle = styled.span`
  margin: 0 auto;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const Next = styled.span`
  padding-left: 12px;
  font-size: 14px;
  color: #0095f6;
`;

const ResultsContainer = styled.div`
  margin-top: 16px;
`;
