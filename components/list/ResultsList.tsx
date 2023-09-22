import React from "react";
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
  color: #737373;
`;

const ResultsList: React.FC = () => {
  return (
    <Account>
      <Profile>
        <Image src="/images/profile.jpg" alt="프로필" width={44} height={44} />
      </Profile>
      <Info>
        <Name>Shiba_S2</Name>
        <Desc>시바견을 키우는 집사입니다 🐶</Desc>
      </Info>
    </Account>
  );
};

export default ResultsList;
