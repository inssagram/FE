import Image from "next/image";
import styled from "styled-components";

const ContentContainer = styled.li`
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

const Account = styled.span`
  padding-bottom: 3px;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  color: #737373;
`;

const RecentConvo = styled.span``;

const LastConvo = styled.span``;

const DirectList = () => {
  return (
    <ContentContainer>
      <Profile>
        <Image src="/images/profile.jpg" alt="프로필" width={56} height={56} />
      </Profile>
      <Content>
        <Account>daily-manjoo</Account>
        <Conversation>
          <RecentConvo>만쥬 좋아하세요?</RecentConvo>
          <LastConvo>23분</LastConvo>
        </Conversation>
      </Content>
    </ContentContainer>
  );
};

export default DirectList;
