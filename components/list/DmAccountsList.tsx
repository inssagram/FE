import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const ContentContainer = styled.li`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  font-size: 14px;
`;

const Profile = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 36px;
  font-size: 14px;
`;

const Id = styled.span`
  padding-bottom: 3px;
`;

const Recent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  color: #737373;
`;

const RecentConvo = styled.span``;

const RecentTime = styled.span``;

interface DmAccount {
  id: number;
  profileUrl: string;
  userId: string;
  recentMessage: string;
  recentTime: string;
}

const DmAccountsList: React.FC = () => {
  const [dmList, setDmList] = useState<DmAccount[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/messages")
      .then((response) => {
        setDmList(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <>
      {dmList.map((dm, index) => (
        <Link key={index} href={`/direct/in/${dm.id}`}>
          <ContentContainer>
            <Profile>
              <Image src={dm.profileUrl} alt="프로필" width={56} height={56} />
            </Profile>
            <Content>
              <Id>{dm.userId}</Id>
              <Recent>
                <RecentConvo>{dm.recentMessage}</RecentConvo>
                <RecentTime>{dm.recentTime}</RecentTime>
              </Recent>
            </Content>
          </ContentContainer>
        </Link>
      ))}
    </>
  );
};

export default DmAccountsList;
