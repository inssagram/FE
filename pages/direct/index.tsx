import styled from "styled-components";
import { useSelector } from "react-redux";
import { DirectHeader } from "@/components/atoms/Header";
import DmAccountsList from "@/components/list/DmAccountsList";
import { RootState } from "@/src/redux/Posts/store";

const Direct: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.member);

  return (
    <Container>
      <DirectHeader userInfo={userInfo} />
      <PageTitle>메시지</PageTitle>
      <DirectAccount>
        <DmAccountsList />
      </DirectAccount>
    </Container>
  );
};

export default Direct;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const PageTitle = styled.div`
  display: flex;
  padding: 14px 16px 10px;
  font-size: 16px;
`;

const DirectAccount = styled.div``;
