import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/errorHandler";
import getSearchResultAxios from "@/services/searchInfo/getSearchResult";

interface SearchData {
  memberId: number;
  nickname: string;
  profileImg: string;
}

interface SearchDataProps {
  searchTerm: string;
  onAccountSelect: (selectedAccount: SearchData) => void;
}

const AccountList: React.FC<SearchDataProps> = ({
  searchTerm,
  onAccountSelect,
}) => {
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);

  // 검색 결과 조회
  const fetchSearchResultList = async (keyword: string) => {
    try {
      const res = await getSearchResultAxios(keyword);
      setSearchResults(res.data);
    } catch (err) {
      handleError(err, "Error searching result:");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResultList(searchTerm);
    }
  }, [searchTerm]);

  const handleSelectAccount = (selectedAccount: SearchData) => {
    onAccountSelect(selectedAccount);
  };

  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <ResultContainer key={index}>
            <Profile>
              <Image
                src="/images/noProfile.jpg"
                alt="프로필"
                width={44}
                height={44}
              />
            </Profile>
            <Account>
              <Name>{result.nickname}</Name>
              <Id>{result.memberId}</Id>
            </Account>
            <SelectBtn onClick={() => handleSelectAccount(result)}>
              <Icon icon={faCircleCheck} fontSize={"24px"} />
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

export default AccountList;

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
