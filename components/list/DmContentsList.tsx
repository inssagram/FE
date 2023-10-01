import styled from "styled-components";

const Content = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 16px;
`;

const RecentTime = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 20px;
  font-size: 12px;
`;

const Message = styled.div`
  max-width: 245px;
  padding: 8px;
  margin: 4px;
  border-radius: 8px;
`;

const MyMessage = styled(Message)`
  color: #fff;
  background-color: #3797f0;
  align-self: flex-end;
`;

const OtherMessage = styled(Message)`
  background-color: #efefef;
  align-self: flex-start;
`;

const DmContentsList = () => {
  return (
    <Content>
      <RecentTime>(일) 오후 12:00</RecentTime>
      <MyMessage>오늘 저녁 마라탕 어때?</MyMessage>
      <OtherMessage>곱창도 먹자!</OtherMessage>
    </Content>
  );
};

export default DmContentsList;
