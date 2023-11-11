import Image from "next/image";
import styled from "styled-components";

const ChatList = () => {
  return (
    <ContentContainer>
      <Profile>
        <Image
          src="/images/noProfile.jpg"
          alt="프로필"
          width={56}
          height={56}
        />
      </Profile>
      <Content>
        <Id>울랄라</Id>
        <Recent>
          <RecentConvo>이것은 최근 대화 내용</RecentConvo>
          <RecentTime>| 2일전</RecentTime>
        </Recent>
      </Content>
    </ContentContainer>
  );
};

export default ChatList;

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
