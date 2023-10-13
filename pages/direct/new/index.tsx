import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as SC from "@/styled/direct_new";
import { BackArrow } from "@/components/atoms/Icons";
import DirectSearchBar from "@/components/input/DirectSearchBar";
import DmSearchList from "@/components/list/DmSearchList";

const New: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleResultClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <>
      <SC.NewHeader>
        <BackArrow />
        <SC.HeaderTitle>새로운 메시지</SC.HeaderTitle>
        <Link href="/direct/in">
          <SC.Next>다음</SC.Next>
        </Link>
      </SC.NewHeader>
      <SC.NewContainer>
        <DirectSearchBar onSearch={handleSearch} selectedUserId={selectedUserId} />
        <SC.ResultsContainer>
          <DmSearchList onClick={handleResultClick} searchTerm={searchTerm} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
        </SC.ResultsContainer>
      </SC.NewContainer>
    </>
  );
};

export default New;
