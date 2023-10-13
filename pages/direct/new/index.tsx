import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as SC from "@/components/styled/direct_new";
import { BackArrow } from "@/components/atoms/Icons";
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
      <SC.NewHeader>
        <BackArrow />
        <SC.HeaderTitle>새로운 메시지</SC.HeaderTitle>
        {selectedItem && (
          <Link href={`/direct/in/${selectedItem.id}`}>
            <SC.Next onClick={handleNextClick}>다음</SC.Next>
          </Link>
        )}
      </SC.NewHeader>
      <SC.NewContainer>
        <DirectSearchBar onSearch={handleSearch} selectedItem={selectedUser} />
        <SC.ResultsContainer>
          <DmSearchList
            onItemSelect={handleItemSelect}
            searchTerm={searchTerm}
          />
        </SC.ResultsContainer>
      </SC.NewContainer>
    </>
  );
};

export default New;
