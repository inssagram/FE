import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface AccountData {
  memberId: number;
  nickName: string;
  job: string;
  friendStatus: boolean;
  image: string;
}

interface AccountListProps {
  searchResults: AccountData[];
  onSelectAccount: (selectedAccount: AccountData) => void;
}

const AccountList: React.FC<AccountListProps> = ({
  searchResults,
  onSelectAccount,
}) => {
  const handleSelectAccount = (selectedAccount: AccountData) => {
    onSelectAccount(selectedAccount);
  };

  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <ResultContainer key={index}>
            <Profile>
              <Image
                src={result.image ? result.image : "/images/noProfile.jpg"}
                alt="프로필"
                width={44}
                height={44}
              />
            </Profile>
            <Account>
              <Name>{result.nickName}</Name>
              <Follow>{result.friendStatus ? "팔로잉" : ""}</Follow>
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
  gap: 3px;
  min-width: 288px;
  height: 36px;
  font-size: 14px;
`;
const Name = styled.span``;

const Follow = styled.span`
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
